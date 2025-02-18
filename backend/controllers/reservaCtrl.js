const Reserva = require("../models/reserva");
const { Util } = require("../config/util");

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
      quadraId,
    } = req.body;

    try {
      // const reservaExistente = await Reserva.findOne({
      //   where: { data: data, quadraId: quadraId, horaInicio: horaInicio },
      // });

      // if (reservaExistente) {
      //   return res.status(400).json({ error: "o Horario ja esta Reservado!" });
      // }
      //Se tive horario disponivel
      const novaReserva = await Reserva.createReserva(
        nome,
        // cpf,
        // email,
        // dataNascimento,
        dataInicio,
        dataFim,
        // detalhes,
        quadraId
      );
      res.status(201).json(novaReserva);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllReservas: async (req, res) => {
    try {
      const listReservas = await Reserva.listarReservas();

      // const reservaFormatar = listReservas.map((reserva) =>
      //   //console.log("data antes de formatar", reserva.data),
      //   ({
      //     ...reserva,
      //     cpf: Util.formatarCPF(reserva.cpf),

      //     quadra: {
      //       ...reserva.quadra.toJSON(),
      //       preco: Util.formatarValor(reserva.quadra.preco),
      //     },
      //   })
      // );
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
