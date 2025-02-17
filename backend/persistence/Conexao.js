require("dotenv").config({
  path: ".env.development",
}); // Carregar variáveis do .env.development
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco
  process.env.DB_USER, // Usuário
  process.env.DB_PASSWORD, // Senha
  {
    host: process.env.DB_HOST, // Host
    dialect: "mysql", // Dialeto do banco de dados
    //port: process.env.PORT, // Porta
    logging: false, // log desativado, caso queira usar no ambiente DEV, apenas passe false
  }
);

// Verificar se a conexão foi estabelecida com sucesso
(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Conexão estabelecida com o banco de dados (${process.env.NODE_ENV})!`
    );
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error.message);
  }
})();
module.exports = sequelize;
