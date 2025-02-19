const { DataTypes} = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../persistence/Conexao.js");
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
    // defaultValue: "ATIVA", // Exemplo: status padrão como "Ativa"
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
Reserva.sync({ force: false })
  .then(() => {
    console.log("Reserva sincronizado com o banco de dados.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo Reserva:", error);
  });

module.exports = Reserva;
