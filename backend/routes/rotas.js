const express = require("express");
const { Login } = require("../controllers/login.js");
const { reservaCtrl } = require("../controllers/reservaCtrl");
const { clienteCtrl } = require("../controllers/clienteCtrl");
const { quadraCtrl } = require("../controllers/quadraCtrl");

const Rotas = express.Router();

//Autenticação
Rotas.post("/login", Login.verificarLogin);
// Middleware de autenticação para todas as rotas
Rotas.use(Login.verificaAutenticacao);

//Metodos GET
Rotas.get("/reserva", reservaCtrl.getAllReservas);
Rotas.get("/cliente-info", clienteCtrl.getAllClientes);
Rotas.get("/quadras-info", quadraCtrl.getAllQuadras);

//Metodos POST
Rotas.post("/reserva/cadastrar", reservaCtrl.newReserva);
Rotas.post("/reserva/reservadisponivel", reservaCtrl.verificaDisponibilidade);

//Metodos PUT
Rotas.put("/reserva/update", reservaCtrl.updateReserva);

module.exports = Rotas;
