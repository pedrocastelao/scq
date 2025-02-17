import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cadastro from "../components/Cadastro";
import Reserva from "../components/Reserva";
import Footer from "../pages/home";

const AppRoutes = ({
  reservante,
  setReservante,
  reserva,
  setReserva,
  handleSubmit,
}) => {
  const navigate = useNavigate();
  const handleNext = () => {
    console.log("Reservante antes de seguir para a próxima etapa:", reservante);
    navigate("/reserva");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Cadastro
            reservante={reservante}
            setReservante={setReservante}
            onNext={handleNext}
          />
        }
      />
      <Route
        path="/reserva"
        element={
          <Reserva
            reserva={reserva}
            setReserva={setReserva}
            onSubmit={handleSubmit}
          />
        }
      />

      <Route path="/footer" element={<Footer />} />
    </Routes>
  );
};

export default AppRoutes;
