const User = require("../models/users.js");


// Função para cadastrar um usuário
async function cadastrarUserController(req, res) {
  const { username, password, role } = req.body;

  try {
    const novoUser = await User.create({
      username: username,
      password: password ,
      role: role,
    });

    res.status(201).json(novoUser.toJSON());
  } catch (error) {
    console.error("{Controller} Erro ao cadastrar o usuário:", error);
    res.status(500).json({
      error: "{Controller} Erro interno do servidor ao cadastrar o usuário.",
    });
  }
}

module.exports = { cadastrarUserController };
