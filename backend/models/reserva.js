const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../persistence/Conexao.js");
const { Op } = require("sequelize");
const Quadra = require("./quadra.js");
const Cliente = require("./cliente.js");

const Reserva = sequelize.define("reserva", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(), // Gera um UUID padrão ao criar um novo registro
    primaryKey: true,
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  horaInicio: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  horaFim: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

// Relacionamentos
Reserva.belongsTo(Quadra);
Reserva.belongsTo(Cliente);

// Método para inserir uma nova reserva no banco de dados
Reserva.createReserva = async function (
  data,
  horaInicio,
  horaFim,
  quadraId,
  clienteId
) {
  try {
    const reserva = await Reserva.create({
      data,
      horaInicio,
      horaFim,
      quadraId,
      clienteId,
    });
    return reserva;
  } catch (error) {
    throw new Error("Erro ao criar uma nova reserva: " + error.message);
  }
};

// Método para excluir uma reserva do banco de dados
Reserva.deleteReserva = async function (id) {
  try {
    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
      throw new Error("Reserva não encontrada.");
    }
    await reserva.destroy();
    return true; // Indica que a exclusão foi bem-sucedida
  } catch (error) {
    throw new Error("Erro ao excluir a reserva: " + error.message);
  }
};

// Método para listar todas as reservas
Reserva.listarReservas = async function (cliente) {
  try {
    //console.log("model  clienteId", cliente);
    const reservas = await Reserva.findAll({
      order: [["createdAt", "DESC"]],
      where: {
        clienteId: cliente,
      },
      include: [
        {
          model: Quadra, // Incluir os dados da quadra associada
          attributes: ["tipo", "localizacao", "preco"], // Selecionar os atributos desejados da quadra
        },
      ],
    });
    return reservas;
  } catch (error) {
    throw new Error("Erro ao listar as reservas: " + error.message);
  }
};

// Adicione o método à definição da sua model de Reserva
Reserva.getDisponibilidadeReserva = async function (
  data,
  horaInicio,
  horaFim,
  quadraId
) {
  try {
    // Consulta para verificar se existe alguma reserva que entra em conflito com a nova reserva
    const conflitos = await Reserva.findAll({
      where: {
        quadraId: quadraId,
        data: data,
        [Op.or]: [
          {
            [Op.and]: [
              { horaInicio: { [Op.lt]: horaFim } },
              { horaFim: { [Op.gt]: horaInicio } },
            ],
          },
          {
            [Op.and]: [
              { horaInicio: { [Op.lte]: horaInicio } },
              { horaFim: { [Op.gte]: horaInicio } },
            ],
          },
          {
            [Op.and]: [
              { horaInicio: { [Op.lte]: horaFim } },
              { horaFim: { [Op.gte]: horaFim } },
            ],
          },
        ],
      },
    });

    // Se existirem conflitos, a reserva não está disponível
    if (conflitos.length > 0) {
      return false;
    } else {
      // Se não existirem conflitos, a reserva está disponível
      return true;
    }
  } catch (error) {
    throw new Error(
      "Erro ao verificar a disponibilidade da reserva: " + error.message
    );
  }
};

Reserva.sync({ force: false })
  .then(() => {
    console.log("{Models} Modelo Reserva sincronizado com o banco de dados.");
  })
  .catch((error) => {
    console.error("{Models} Erro ao sincronizar o modelo Reserva:", error);
  });

module.exports = Reserva;
