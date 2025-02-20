const User = require("../models/users.js");

// Função para cadastrar um usuário
const userCtrl = {
  cadastrarUserController: async (req, res) => {
    const { nome, email, password } = req.body;

    try {
      const novoUser = await User.create({
        nome,
        email,
        password,
      });

      res.status(201).json(novoUser.toJSON());
    } catch (error) {
      console.error("{Controller} Erro ao cadastrar o usuário:", error);
      res.status(500).json({
        error: "{Controller} Erro interno do servidor ao cadastrar o usuário.",
      });
    }
  },
};
module.exports = { userCtrl };
