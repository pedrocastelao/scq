import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cadastro from "../components/Cadastro";

const CadastroPage = ({ onCadastroSubmit }) => {
  const navigate = useNavigate();

  const handleCadastroSubmit = (data) => {
    onCadastroSubmit(data);
    navigate("/reserva"); // Redireciona para a página de reserva
  };

  return (
    <div>
      <h1>Cadastro de Reservante</h1>
      <Cadastro onSubmit={handleCadastroSubmit} />
    </div>
  );
};

export default CadastroPage;
