const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser"); // Importe o body-parser

//banco de dados
const sequelize = require("./persistence/Conexao.js");
const Rotas = require("./routes/rotas.js");
sequelize
  .sync({ force: false })
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });

const app = express();
app.use(cors({ credentials: true }));
app.use(
  session({
    secret: "abc123cde789",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Rotas);
