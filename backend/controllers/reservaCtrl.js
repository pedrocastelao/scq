const Quadra = require("../models/quadra");
const Reserva = require("../models/reserva");
const moment = require("moment");
const cron = require("node-cron");

// Função para atualizar o status das reservas
const atualizarStatusReservas = async () => {
  try {
    // Obter todas as reservas
    const reservas = await Reserva.findAll();

    // Data e hora atuais
    const dataAtual = moment(); // Inclui a data e hora atuais

    // Iterar sobre todas as reservas
    for (let reserva of reservas) {
      const dataReserva = moment(reserva.dataFim); // A data do evento, incluindo hora

      // Verificar se a data e hora da reserva já passaram
      if (dataReserva.isBefore(dataAtual)) {
        // Atualizar status para "VENCIDA"
        await reserva.update({
          status: "VENCIDA",
        });

        console.log(`Reserva com ID ${reserva.id} atualizada para VENCIDA.`);
      }
    }
  } catch (error) {
    console.error("Erro ao atualizar status das reservas:", error);
  }
};

// Agendar a tarefa para ser executada a cada hora
cron.schedule("0 * * * *", () => {
  console.log("Executando verificação de status das reservas...");
  atualizarStatusReservas();
});

// Definir fuso horário para garantir consistência
const TIMEZONE = "America/Sao_Paulo";

// Horários permitidos para reservas (configuráveis)
let HORARIO_INICIO = moment.tz("08:00", "HH:mm", TIMEZONE);
let HORARIO_FIM = moment.tz("20:00", "HH:mm", TIMEZONE);

// Função para validar a reserva
const validarReserva = (dataInicio, dataFim) => {
  // Garantir que as datas sejam interpretadas corretamente com o fuso horário
  const inicioReserva = moment.tz(dataInicio, TIMEZONE);
  const fimReserva = moment.tz(dataFim, TIMEZONE);
  const hoje = moment.tz(TIMEZONE).startOf("day"); // A data de hoje, sem hora

  // 1. Verifica se a data de início e fim são a mesma
  if (!inicioReserva.isSame(fimReserva, "day")) {
    return {
      valido: false,
      mensagem: "A data de início e fim da reserva devem ser as mesmas.",
    };
  }

  // 2. Verifica se a reserva não é para o passado
  if (inicioReserva.isBefore(hoje, "day")) {
    return {
      valido: false,
      mensagem: "Não é permitido fazer reservas para datas passadas.",
    };
  }

  // 3. Verifica se o horário de início e fim estão dentro do intervalo permitido
  const horaInicio = inicioReserva.format("HH:mm");
  const horaFim = fimReserva.format("HH:mm");

  const horaInicioMoment = moment.tz(horaInicio, "HH:mm", TIMEZONE);
  const horaFimMoment = moment.tz(horaFim, "HH:mm", TIMEZONE);

  // Verifica se o horário de início e fim estão dentro do horário permitido
  if (
    !horaInicioMoment.isBetween(HORARIO_INICIO, HORARIO_FIM, null, "[)") ||
    !horaFimMoment.isBetween(HORARIO_INICIO, HORARIO_FIM, null, "[)")
  ) {
    return {
      valido: false,
      mensagem: `O horário permitido para reservas é entre ${HORARIO_INICIO.format(
        "HH:mm"
      )} e ${HORARIO_FIM.format("HH:mm")}.`,
    };
  }

  return { valido: true };
};

// Função para calcular o status da reserva
const calcularStatusReserva = (dataEvento, statusAlterado) => {
  // Data atual no fuso horário configurado
  const dataAtual = moment.tz(TIMEZONE);

  // Primeira e última data da semana atual (considerando a segunda-feira como primeiro dia da semana)
  const inicioSemana = dataAtual.clone().startOf("week"); // Segunda-feira
  const fimSemana = dataAtual.clone().endOf("week"); // Domingo

  // Converter a data do evento para o fuso horário configurado
  const dataEventoMoment = moment.tz(dataEvento, TIMEZONE);

  // Caso o status tenha sido alterado manualmente para "CANCELADA"
  if (statusAlterado === "CANCELADA") {
    return "CANCELADA";
  }

  // Verifica se a data do evento é mais de 7 dias à frente ou não está dentro da semana atual
  if (
    dataEventoMoment.isAfter(dataAtual.add(7, "days")) ||
    !dataEventoMoment.isBetween(inicioSemana, fimSemana, null, "[]")
  ) {
    return "FUTURA";
  }

  // Verifica se a data do evento é dentro da semana atual
  if (dataEventoMoment.isBetween(inicioSemana, fimSemana, null, "[]")) {
    return "ATIVA";
  }

  // Se o evento já passou, mas não está na semana atual
  if (
    dataEventoMoment.isBefore(dataAtual) &&
    !dataEventoMoment.isBetween(inicioSemana, fimSemana, null, "[]")
  ) {
    return "VENCIDA";
  }

  return "STATUS INDEFINIDO";
};

const reservaCtrl = {
  newReserva: async (req, res) => {
    const {
      nome,
      // cpf,
      // email,
      // dataNascimento,
      dataInicio,
      dataFim,
      // detalhes,
      status,
      quadraId,
    } = req.body;

    // Validação antes de criar a reserva
    const validacao = validarReserva(dataInicio, dataFim);
    if (!validacao.valido) {
      return res.status(400).json({ error: validacao.mensagem });
    }

    const statusReserva = calcularStatusReserva(dataInicio, status);

    console.log(statusReserva);

    try {
      const novaReserva = await Reserva.create({
        nome,
        // cpf,
        // email,
        // dataNascimento,
        dataInicio,
        dataFim,
        // detalhes,
        status: statusReserva,
        quadraId,
      });
      res.status(201).json(novaReserva);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllReservas: async (req, res) => {
    try {
      const listReservas = await Reserva.findAll({
        include: [
          {
            model: Quadra, // Incluir os dados da quadra associada
            attributes: ["tipo", "localizacao", "preco"], // Selecionar os atributos desejados da quadra
          },
        ],
      });
      res.status(200).json(listReservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateReserva: async (req, res) => {
    try {
      const { id, data, horaInicio, horaFim, quadraId } = req.body;
      const reserva = await Reserva.findByPk(id);
      if (!reserva) {
        throw new Error("Reserva não encontrada.");
      }
      await reserva.update({ data, horaInicio, horaFim, quadraId });
      res.status(200).json({ message: "Reserva Alterada!" });
    } catch (error) {
      throw new Error("Erro ao atualizar a reserva: " + error.message);
    }
  },

  listarHorariosDisponives: async (req, res) => {
    const { data, quadraId } = req.params;

    try {
      // Get all reservations for the specified date and court
      const reservas = await Reserva.findAll({
        where: { data, quadraId },
        attributes: ["horaInicio", "horaFim"],
      });

      // Define available time slots (24h format)
      const horariosTotais = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
      ];

      // Convert time string to minutes for easier comparison
      const timeToMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 60 + minutes;
      };

      // Convert minutes back to time string
      const minutesToTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, "0")}:${mins
          .toString()
          .padStart(2, "0")}`;
      };

      // Create array of occupied time slots
      const horariosOcupados = new Set();
      reservas.forEach((reserva) => {
        const inicio = timeToMinutes(reserva.horaInicio.slice(0, 5));
        const fim = timeToMinutes(reserva.horaFim.slice(0, 5));

        // Mark all hour slots between inicio and fim as occupied
        for (let time = inicio; time < fim; time += 60) {
          horariosOcupados.add(minutesToTime(time));
        }
      });

      // Check if current date and filter past hours
      const agora = new Date();
      const dataReserva = new Date(data);
      const isToday = dataReserva.toDateString() === agora.toDateString();
      const horaAtual = agora.getHours();

      // Filter available times
      const horariosDisponiveis = horariosTotais.filter((horario) => {
        const horaSlot = parseInt(horario.split(":")[0]);

        // If it's today, filter out past hours
        if (isToday && horaSlot <= horaAtual) {
          return false;
        }

        // Check if the time slot is not occupied
        return !horariosOcupados.has(horario);
      });

      // Group consecutive available times
      const periodosDisponiveis = [];
      let periodoAtual = {
        inicio: null,
        fim: null,
      };

      horariosDisponiveis.forEach((horario, index) => {
        if (!periodoAtual.inicio) {
          periodoAtual.inicio = horario;
        }

        const proximoHorario = horariosDisponiveis[index + 1];
        const horaAtual = timeToMinutes(horario);
        const horaProxima = proximoHorario
          ? timeToMinutes(proximoHorario)
          : null;

        if (!proximoHorario || horaProxima - horaAtual > 60) {
          periodoAtual.fim = minutesToTime(timeToMinutes(horario) + 60);
          periodosDisponiveis.push({ ...periodoAtual });
          periodoAtual = { inicio: null, fim: null };
        }
      });

      res.status(200).json({
        horariosIndividuais: horariosDisponiveis,
        periodosDisponiveis: periodosDisponiveis,
      });
    } catch (error) {
      console.error("Erro ao listar horários:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { reservaCtrl };
