const Reserva = require("../models/reserva");
const { Util } = require("../config/util");

const reservaCtrl = {
  newReserva: async (req, res) => {
    const clienteId = req.clienteLogado.id;
    const { data, horaInicio, horaFim, quadraId } = req.body;

    try {
      const novaReserva = await Reserva.createReserva(
        data,
        horaInicio,
        horaFim,
        quadraId,
        clienteId
      );
      res.status(201).json(novaReserva);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  verificaDisponibilidade: async (req, res) => {
    try {
      const { data, horaInicio, horaFim, quadraId } = req.body;
      console.log(data, horaInicio, horaFim, quadraId);
      const disponivel = await Reserva.getDisponibilidadeReserva(
        data,
        horaInicio,
        horaFim,
        quadraId
      );

      if (disponivel) {
        res.status(200).json({ message: "*Reserva disponível." });
      } else {
        res
          .status(400)
          .json({ message: "Conflito de horário. Não é possível reservar." });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllReservas: async (req, res) => {
    const cliente = req.clienteLogado;
    // console.log("control", cliente.id);
    try {
      const listReservas = await Reserva.listarReservas(cliente.id);

      const reservaFormatar = listReservas.map((reserva) =>
        //console.log("data antes de formatar", reserva.data),
        ({
          id: reserva.id,
          data: Util.formatardata(reserva.data),
          horaInicio: reserva.horaInicio,
          horaFim: reserva.horaFim,
          quadraId: reserva.quadraId,
          quadra: {
            ...reserva.quadra.toJSON(),
            preco: Util.formatarValor(reserva.quadra.preco),
          },
        })
      );
      res.status(200).json(reservaFormatar);
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
};

module.exports = { reservaCtrl };
