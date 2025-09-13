const express = require("express");
const { Login } = require("../controllers/login.js");
const { reservaCtrl } = require("../controllers/reservaCtrl");
const { quadraCtrl } = require("../controllers/quadraCtrl");
const { userCtrl } = require("../controllers/usersCtrl.js");

const Rotas = express.Router();

// Rotas públicas (sem autenticação)
Rotas.post("/login", Login.verificarLogin);
Rotas.post("/user/novo", userCtrl.cadastrarUserController);

// Rotas protegidas por autenticação (Reservas)
// Rotas.use("/reserva", Login.verificaAutenticacao);
Rotas.get("/reservas", reservaCtrl.getAllReservas);
Rotas.post("/reserva/nova", reservaCtrl.newReserva);
Rotas.get(
  "/reserva/horarios/:data/:quadraId",
  reservaCtrl.listarHorariosDisponives
);
Rotas.put("/reserva/:id/cancelar", reservaCtrl.cancelarReserva);

// Rotas de reservas
Rotas.put("/reserva/:id/editar", reservaCtrl.updateReserva);

//Gerenciamento de Quadras
Rotas.get("/quadras", quadraCtrl.getAllQuadras);
Rotas.get("/quadras:id", quadraCtrl.getAllQuadras);
Rotas.post("/quadras/novo", quadraCtrl.newQuadra);
Rotas.put("/quadras/:id/editar", quadraCtrl.updateQuadra);
Rotas.delete("/quadras/:id/excluir", quadraCtrl.delQuadra);

module.exports = Rotas;
