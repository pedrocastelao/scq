const Quadra = require("../models/quadra");
const Reserva = require("../models/reserva");
const moment = require("moment");
const cron = require("node-cron");
const { Op } = require("sequelize");

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
let HORARIO_FIM = moment.tz("22:00", "HH:mm", TIMEZONE);

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

    try {

      // ***** INÍCIO DA NOVA VALIDAÇÃO *****
      // Verifica se já existe uma reserva para a mesma quadra no mesmo intervalo de tempo.
      // Não consideramos reservas canceladas na verificação.
      const reservaExistente = await Reserva.findOne({
        where: {
          quadraId: quadraId,
          status: { [Op.ne]: 'CANCELADA' }, // Ignora reservas canceladas
          [Op.or]: [ // Verifica sobreposição de horários
            {
              dataInicio: {
                [Op.lt]: dataFim, // A reserva existente começa antes da nova terminar
              },
              dataFim: {
                [Op.gt]: dataInicio, // E termina depois da nova começar
              },
            },
          ],
        },
      });

      // Se encontrar uma reserva conflitante, retorna um erro.
      if (reservaExistente) {
        return res.status(409).json({ // 409 Conflict é um status HTTP mais apropriado aqui
          error: "Este horário já está reservado para a quadra selecionada.",
        });
      }
      // ***** FIM DA NOVA VALIDAÇÃO *****

      const statusReserva = calcularStatusReserva(dataInicio, status);

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

      const reservaCompleta = await Reserva.findByPk(novaReserva.id, {
        include: [
          {
            model: Quadra,
            attributes: ["tipo", "localizacao", "preco"],
          },
        ],
      });

      res.status(201).json(reservaCompleta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllReservas: async (req, res) => {
    try {
      const listReservas = await Reserva.findAll({
        order: [["dataInicio", "ASC"]],
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
        const diaInicio = moment.tz(data, "YYYY-MM-DD", "America/Sao_Paulo").startOf('day');
        const diaFim = moment.tz(data, "YYYY-MM-DD", "America/Sao_Paulo").endOf('day');

        // 1. CORREÇÃO: Busca reservas onde a data de início está dentro do dia solicitado
        const reservas = await Reserva.findAll({
            where: {
                quadraId,
                status: { [Op.ne]: 'CANCELADA' }, // Ignora reservas canceladas
                dataInicio: {
                    [Op.between]: [diaInicio.toDate(), diaFim.toDate()],
                },
            },
            attributes: ["dataInicio", "dataFim"], // Atributos corretos
        });

        // Horários de funcionamento (8h às 21h para início de reserva de 1h)
        const horariosTotais = Array.from({ length: 14 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);

        const horariosOcupados = new Set();
        reservas.forEach((reserva) => {
            // 2. CORREÇÃO: Extrai a hora de 'dataInicio' e 'dataFim'
            const inicioReserva = moment(reserva.dataInicio);
            const fimReserva = moment(reserva.dataFim);
            
            // Marca todos os slots de 1 hora que a reserva ocupa
            for (let hora = inicioReserva.clone(); hora.isBefore(fimReserva); hora.add(1, 'hour')) {
                horariosOcupados.add(hora.format("HH:mm"));
            }
        });

        // Filtra para remover horários passados (se a data for hoje)
        const agora = moment.tz("America/Sao_Paulo");
        
        const horariosDisponiveis = horariosTotais.filter((horario) => {
            if (diaInicio.isSame(agora, 'day')) {
                const horaSlot = parseInt(horario.split(":")[0]);
                if (horaSlot <= agora.hour()) {
                    return false; // Remove horários que já passaram hoje
                }
            }
            return !horariosOcupados.has(horario);
        });

        res.status(200).json({
            horariosIndividuais: horariosDisponiveis,
        });

    } catch (error) {
        console.error("Erro ao listar horários:", error);
        res.status(500).json({ error: error.message });
    }
},

   cancelarReserva: async (req, res) => {
    // Pega o ID da reserva a partir dos parâmetros da URL
    const { id } = req.params;

    try {
      // 1. Encontra a reserva pelo ID
      const reserva = await Reserva.findByPk(id);

      // 2. Verifica se a reserva existe
      if (!reserva) {
        return res.status(404).json({ error: "Reserva não encontrada." });
      }

      // 3. (Opcional) Adiciona uma regra de negócio: não permitir cancelar reservas que já venceram.
      if (reserva.status === "VENCIDA") {
        return res.status(400).json({ error: "Não é possível cancelar uma reserva que já venceu." });
      }

      // 4. (Opcional) Evita trabalho desnecessário se a reserva já estiver cancelada.
       if (reserva.status === "CANCELADA") {
        return res.status(200).json({ message: "Esta reserva já estava cancelada." });
      }

      // 5. Atualiza o status da reserva para "CANCELADA"
      await reserva.update({ status: "CANCELADA" });

      // 6. Retorna uma resposta de sucesso
      res.status(200).json({ message: "Reserva cancelada com sucesso!" });

    } catch (error) {
      // Em caso de erro no servidor, retorna uma mensagem genérica
      console.error("Erro ao cancelar reserva:", error);
      res.status(500).json({ error: "Ocorreu um erro ao processar sua solicitação." });
    }
  },
};

module.exports = { reservaCtrl };
