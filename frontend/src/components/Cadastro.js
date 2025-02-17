// Cadastro.js
import React, { useState } from "react";
import "./Cadastro.css";
import { mascaraCpf } from "../Util/util";

const Cadastro = ({ reservante, setReservante, onNext }) => {
  const [showMessage, setShowMessage] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservante((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Validate name
    if (!reservante.nome?.trim()) {
      alert("Por favor, preencha o nome");
      return false;
    }

    // Validate CPF
    if (
      !reservante.cpf?.trim() ||
      !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(reservante.cpf)
    ) {
      alert("Por favor, preencha o CPF corretamente (formato: 000.000.000-00)");
      return false;
    }

    // Validate email
    if (
      !reservante.email?.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reservante.email)
    ) {
      alert("Por favor, preencha um email válido");
      return false;
    }

    // Validate birth date
    if (!reservante.dataNascimento) {
      alert("Por favor, selecione a data de nascimento");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h1 className="title-scq text-center mb-4">
          <span className="title-main">SCQ</span>
          <span className="title-sub">Sistema de Controle de Quadra</span>
        </h1>

        {showMessage && (
          <div className="info-message">
            <i className="fas fa-info-circle"></i>
            Para prosseguir, preencha todos os dados do formulário
            <button
              className="close-message"
              onClick={() => setShowMessage(false)}
            >
              ×
            </button>
          </div>
        )}

        <h2 className="form-subtitle">Dados do Reservante</h2>
        <form className="cadastro-form">
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={reservante.nome}
              onChange={handleChange}
              className="form-control"
              placeholder="Digite seu nome completo"
            />
          </div>

          <div className="form-group">
            <label>CPF:</label>
            <input
              type="text"
              name="cpf"
              value={mascaraCpf(reservante.cpf)}
              onChange={handleChange}
              className="form-control"
              placeholder="000.000.000-00"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={reservante.email}
              onChange={handleChange}
              className="form-control"
              placeholder="seu@email.com"
            />
          </div>

          <div className="form-group">
            <label>Data de Nascimento:</label>
            <input
              type="date"
              name="dataNascimento"
              value={reservante.dataNascimento}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button type="button" onClick={handleNext} className="btn-next">
            Próximo
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
