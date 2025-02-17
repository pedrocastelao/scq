import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes/Rotas";
import { newReserva } from "./config/apiServices";
import Sidebar from "./components/Sidebar"; // New component
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [reservante, setReservante] = useState({
    nome: "",
    cpf: "",
    email: "",
    dataNascimento: "",
  });

  const [reserva, setReserva] = useState({
    data: "",
    horaInicio: "",
    horaFim: "",
    detalhes: "",
    quadraId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dadosCompletos = { ...reservante, ...reserva };
    try {
      await newReserva(dadosCompletos);
      alert("Reserva realizada com sucesso!");
      // Navegue para a página desejada após o sucesso
      window.location.href = "/footer";
    } catch (error) {
      console.error("Erro ao fazer reserva:", error);
      alert("Erro ao realizar a reserva. Tente novamente.");
    }
  };

  return (
    <Router>
      <div className="d-flex">
        <Sidebar /> {/* New sidebar component */}
        <div className="main-content">
          <AppRoutes
            reservante={reservante}
            setReservante={setReservante}
            reserva={reserva}
            setReserva={setReserva}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </Router>
  );
};

export default App;
