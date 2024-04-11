const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const sequelize = require("../persistence/Conexao.js");

const Cliente = sequelize.define("clientes", {
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
    allowNull: false,
    unique: true,
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tokenConfirmacao: {
    type: DataTypes.STRING,
  },
  isConfirmado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Antes de salvar no banco, gera o hash da senha
Cliente.beforeCreate(async (cliente) => {
  const hashedPassword = await bcrypt.hash(cliente.senha, 10);
  cliente.senha = hashedPassword;
});

Cliente.sync({ force: false })
  .then(() => {
    console.log("{Models} Modelo Cliente sincronizado com o banco de dados.");
  })
  .catch((error) => {
    console.error("{Models} Erro ao sincronizar o modelo Cliente:", error);
  });

module.exports = Cliente;
