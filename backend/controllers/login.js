const jwt = require("jsonwebtoken");
const Cliente = require("../models/cliente");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");

const Login = {
  verificarLogin: async (req, res) => {
    const { email, senha } = req.body;

    try {
      // Busque o usuário no banco de dados pelo email
      const cliente = await Cliente.findOne({ where: { email: email } });

      if (!cliente) {
        // Se o usuário não foi encontrado, envie uma resposta de erro genérica
        return res.status(401).send("Credenciais inválidas");
      }

      // Verifique se a senha fornecida corresponde à senha armazenada no banco de dados
      const senhaCorreta = await bcrypt.compare(senha, cliente.senha);

      if (!senhaCorreta) {
        // Se a senha estiver incorreta, envie uma resposta de erro genérica
        return res.status(401).send("Credenciais inválidas");
      }

      // Gerar token de autenticação
      const token = jwt.sign({ cliente }, "chave_secreta_do_token", {
        expiresIn: "1h",
        subject: "1",
      });

      // Defina as informações do usuário e o token na resposta
      res.json({
        cliente: {
          id: cliente.id,
          nome: cliente.nome,
        },
        token: token,
      });
    } catch (error) {
      // Capture e registre qualquer erro ocorrido durante o processo
      console.error("Erro ao fazer login:", error);
      // Envie uma resposta de erro genérica
      res.status(500).send("Não Autorizado!");
    }
  },

  verificaAutenticacao(req, res, next) {
    // Verifique se existe um token no cabeçalho da solicitação
    const token = req.headers.authorization?.split(" ") || [" ", " "];

    //console.log(token);

    if (!token[1]) {
      // Se não houver token, redirecione para a tela de login
      return res.status(401).send("Token de autenticação nao fornecido");
    }

    try {
      // Verifique se o token é válido
      const decoded = jwt.verify(token[1], "chave_secreta_do_token");

      req.clienteLogado = decoded.cliente;
      // Se o token for válido, continue para a próxima rota
      next();
    } catch (error) {
      // Se o token for inválido, retorne uma resposta de erro
      return res.status(401).send("Token de autenticação inválido");
    }
  },
};

module.exports = { Login };
