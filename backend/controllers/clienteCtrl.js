const crypto = require("crypto");
const Cliente = require("../models/cliente.js");
const emailController = require("./emailController.js");
const { Util } = require("../config/util");

function generateConfirmationToken() {
  return crypto.randomBytes(16).toString("hex");
}

const clienteCtrl = {
  getAllClientes: async (req, res) => {
    try {
      const clienteSession = req.clienteLogado;
      const clientesFormatados = {
        id: clienteSession.id,
        nome: clienteSession.nome,
        cpf: Util.formatarCPF(clienteSession.cpf),
        celular: Util.formatarNumeroCelular(clienteSession.celular),
        email: clienteSession.email,
      };

      return res.status(200).json(clientesFormatados);
    } catch (error) {
      console.log("Erro ao buscar Clientes", error);
      return res.status(500).json({ error: "Erro interno do servidor!" });
    }
  },

  cadastrarClienteController: async (req, res) => {
    const { nome, cpf, celular, email, senha } = req.body;
    try {
      const token = generateConfirmationToken();
      const novoCliente = await Cliente.create({
        nome: nome,
        cpf: cpf,
        celular: celular,
        email: email,
        senha: senha,
        tokenConfirmacao: token,
      });

      //await emailController.sendConfirmEmail(nome, email, token);
      res.status(201).json(novoCliente.toJSON(), {
        message: "Cliente cadastrado. Enviado email para confirmação",
      });
    } catch (error) {
      console.error("{Controller} Erro ao cadastrar o cliente:", error);
      res.status(500).json({
        error: "{Controller} Erro interno do servidor ao cadastrar o cliente.",
      });
    }
  },

  atualizarCliente: async (req, res) => {
    const { cpf } = req.params;
    const { nome, celular, email, senha } = req.body;
    console.log("Debug postman", cpf, nome, celular, email, senha);
    try {
      // Busca o cliente pelo CPF no banco de dados
      const cliente = await Cliente.findOne({
        where: { cpf: cpf },
      });

      if (!cliente) {
        return res.status(404).send("Cliente com CPF ? não encontrado", cpf);
      }

      await Cliente.update({ nome, celular, email, senha }, { where: { cpf } });

      const clienteAtualizada = await Cliente.findOne({ where: { cpf: cpf } });
      return res.status(200).json(clienteAtualizada);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    }
  },
};
// Função para cadastrar um cliente

module.exports = { clienteCtrl };
