const express = require("express");
const { Login } = require("../controllers/login.js");
const { reservaCtrl } = require("../controllers/reservaCtrl");
const { clienteCtrl } = require("../controllers/clienteCtrl");
const { quadraCtrl } = require("../controllers/quadraCtrl");

const Rotas = express.Router();

// Rotas públicas (sem autenticação)
Rotas.post("/cliente/cadastrar", clienteCtrl.cadastrarClienteController);
Rotas.post("/login", Login.verificarLogin);

// Rotas protegidas por autenticação (Reservas)
Rotas.use("/reserva", Login.verificaAutenticacao);
Rotas.get("/clientes", Login.verificaAutenticacao, clienteCtrl.getAllClientes);
Rotas.post("/reserva/nova", Login.verificaAutenticacao, reservaCtrl.newReserva);
Rotas.get("/reservas", Login.verificaAutenticacao, reservaCtrl.getAllReservas);

// Rotas de reservas


Rotas.post("/reserva/reservadisponivel", reservaCtrl.verificaDisponibilidade);
Rotas.put("/reserva/:id/editar", reservaCtrl.updateReserva);

// Rotas públicas (informações)
//Gerenciamento de Clientes

//Rotas.get("clientes/:id")
Rotas.post("/clientes/novo", clienteCtrl.cadastrarClienteController);
Rotas.put("/clientes/:id/editar", clienteCtrl.atualizarCliente);
//Rotas.delete("/clientes/:id/excluir")

//Gerenciamento de Quadras
Rotas.get("/quadras", quadraCtrl.getAllQuadras);
Rotas.get("/quadras:id", quadraCtrl.getAllQuadras);
Rotas.post("/quadras/novo", quadraCtrl.newQuadra);
Rotas.put("/quadras/:id/editar", quadraCtrl.updateQuadra);
Rotas.delete("/quadras/:id/excluir", quadraCtrl.delQuadra);

module.exports = Rotas;
