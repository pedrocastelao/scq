const { DataTypes, Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../persistence/Conexao.js");
const { Op } = require("sequelize");
const Quadra = require("./quadra.js");

const Reserva = sequelize.define("reserva", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(), // Gera um UUID padrão ao criar um novo registro
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true, // Validação para garantir que o valor seja um e-mail válido
    },
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  dataInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dataFim: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "Ativa", // Exemplo: status padrão como "Ativa"
    validate: {
      isIn: [["ATIVA", "VENCIDA", "CANCELADA", "FUTURA"]], // Validação para garantir valores válidos
    },
  },
  detalhes: {
    type: DataTypes.TEXT, // Texto longo para mais flexibilidade
    allowNull: true, // Pode ser opcional
  },
});

// Relacionamentos
Reserva.belongsTo(Quadra);

// Método para inserir uma nova reserva no banco de dados
Reserva.createReserva = async function (
  nome,
  // cpf,
  // email,
  // dataNascimento,
  dataInicio,
  dataFim,
  // detalhes,
  quadraId
) {
  try {
    const reserva = await Reserva.create({
      nome,
      // cpf,
      // email,
      // dataNascimento,
      dataInicio,
      dataFim,
      // detalhes,
      quadraId,
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

Reserva.sync({ force: false })
  .then(() => {
    console.log("Reserva sincronizado com o banco de dados.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo Reserva:", error);
  });

module.exports = Reserva;
