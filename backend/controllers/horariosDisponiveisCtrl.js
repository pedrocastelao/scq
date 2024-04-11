// controllers/horariosDisponiveisController.js
const Reserva = require("../models/reserva");
const { Op } = require("sequelize");
const Quadra = require("../models/quadra");

const horariosDisponiveisCtrl = {
  mostrarHorariosDisponiveis: async (req, res) => {
    try {
      // Recupere o ID da quadra da URL
      const quadraId = req.params.quadraId;

      // Adicione lógica para obter horários disponíveis para a quadra com o ID fornecido
      const { horariosDisponiveis, tipoQuadra, localizacaoQuadra } =
        await horariosDisponiveisCtrl.obterHorariosDisponiveis(quadraId);
      // Adicione lógica para obter horários disponíveis para a quadra com o ID fornecido

      // Renderize a tela de horários disponíveis com os horários obtidos
      res.render("horariosDisponiveis", {
        horariosDisponiveis,
        quadraId,
        tipoQuadra,
        localizacaoQuadra,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    }
  },

  // Função para obter horários disponíveis para a quadra com o ID fornecido
  obterHorariosDisponiveis: async (quadraId) => {
    try {
      // Aqui, você pode implementar a lógica específica para obter os horários disponíveis
      // Exemplo: recuperar horários disponíveis a partir de reservas existentes
      const reservas = await Reserva.findAll({
        where: { quadraId, data: { [Op.gte]: new Date() } }, // Considerando apenas reservas futuras
        attributes: ["hora"],
        raw: true,
      });

      const horariosReservados = reservas.map((reserva) => reserva.hora);

      // Aqui você pode ajustar a lógica conforme necessário para definir os horários disponíveis
      const todosHorarios = [
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
      ];

      const horariosDisponiveis = todosHorarios.filter(
        (horario) => !horariosReservados.includes(horario)
      );

      const quadra = await Quadra.findByPk(quadraId);
      const tipoQuadra = quadra.tipo; // Substitua "tipo" pelo nome do atributo que armazena o tipo da quadra
      const localizacaoQuadra = quadra.localizacao; // Substitua "localizacao" pelo nome do atributo que armazena a localização da quadra

      return { horariosDisponiveis, tipoQuadra, localizacaoQuadra };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  reservarHorario: async (req, res) => {
    try {
      const { quadraId, horario } = req.body;

      // Verifique se o horário está disponível
      const horarioDisponivel =
        await horariosDisponiveisCtrl.verificarDisponibilidade(
          quadraId,
          horario
        );

      if (horarioDisponivel) {
        // Crie uma nova reserva
        const reserva = await Reserva.create({
          quadraId,
          horario,
          clienteId: req.user.id, // Substitua por alguma lógica para obter o ID do cliente logado
          // Adicione outros campos necessários à sua lógica
        });

        // Atualize a disponibilidade do horário na quadra
        await horariosDisponiveisCtrl.marcarHorarioComoReservado(
          quadraId,
          horario
        );

        // Redirecione o usuário para uma página de confirmação ou outra rota
        res.redirect("/confirmacao-reserva");
      } else {
        // Horário não disponível, redirecione o usuário ou forneça uma mensagem de erro
        res.redirect("/erro-reserva");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    }
  },

  verificarDisponibilidade: async (quadraId, horario, data) => {
    // Consulte as reservas existentes para a quadra, horário e data específicos
    const reservas = await Reserva.findAll({
      where: {
        quadraId,
        horario,
        data,
      },
    });

    // Se não houver reservas para o horário e data, está disponível
    return reservas.length === 0;
  },

  marcarHorarioComoReservado: async (quadraId, horario, data) => {
    try {
      // Consulte a quadra pelo ID
      const quadra = await Quadra.findByPk(quadraId);

      if (quadra) {
        // Verifique se a propriedade horarioReservado já está marcada como reservada para o dia específico
        if (!quadra.horarioReservado[data]) {
          // Atualize a propriedade horarioReservado para indicar que o horário está reservado no dia específico
          await quadra.update({
            [`horarioReservado.${data}`]: horario,
          });

          console.log(
            `Horário ${horario} marcado como reservado na quadra ${quadraId} para o dia ${data}`
          );
        } else {
          console.log(
            `Horário ${horario} já está reservado na quadra ${quadraId} para o dia ${data}`
          );
        }
      } else {
        console.log(`Quadra com ID ${quadraId} não encontrada`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

module.exports = {horariosDisponiveisCtrl};
