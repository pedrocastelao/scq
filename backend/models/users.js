const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../persistence/Conexao.js');
const bcrypt = require("bcryptjs");

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(), // Gera um UUID padrão ao criar um novo registro
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Antes de salvar no banco, gera o hash da senha
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});


User.sync({ force: false }).then(() => {
  console.log('{Models} Modelo User sincronizado com o banco de dados.');
}).catch((error) => {
  console.error('{Models} Erro ao sincronizar o modelo User:', error);
});

module.exports = User;