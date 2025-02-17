// Reserva.js
import React, { useState, useEffect } from "react";
import QuadrasList from "../components/quadraList";
import SelecaoHora from "./SelecaoHora";
import "./Reserva.css";

const Reserva = ({ reserva, setReserva, onSubmit }) => {
  const [data, setData] = useState("");
  const [quadraId, setQuadraId] = useState("");
  const [showTimeSelection, setShowTimeSelection] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simplificado para apenas mostrar/esconder a seleção de horário
  useEffect(() => {
    setShowTimeSelection(Boolean(data && quadraId));
  }, [data, quadraId]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Adicione no formulário
  {
    isLoading && <div className="loading-message">Carregando...</div>;
  }
  {
    error && <div className="error-message">{error}</div>;
  }

  const handleDateChange = (e) => {
    const { value } = e.target;
    const selectedDate = new Date(value);
    const today = new Date();

    if (selectedDate < today) {
      setError("Não é possível selecionar datas passadas");
      return;
    }

    setError(null);
    setData(value);
    setReserva((prev) => ({
      ...prev,
      data: value,
    }));
  };

  return (
    <div className="reserva-container">
      <div className="reserva-card">
        <h1 className="title-reserva">
          <span className="title-main">Reserva</span>
          <span className="title-sub">Detalhes da sua reserva</span>
        </h1>

        {!showTimeSelection && (
          <div className="info-message">
            <i className="fas fa-info-circle"></i>
            Selecione a quadra e a data para visualizar os horários disponíveis
          </div>
        )}

        <form
          className="reserva-form"
          onSubmit={(e) => {
            e.preventDefault();
            setError(null);

            if (!data || !quadraId || !reserva.horaInicio || !reserva.horaFim) {
              setError("Por favor, preencha todos os campos obrigatórios");
              return;
            }

            setIsLoading(true);
            onSubmit(e)
              .catch((err) => setError(err.message))
              .finally(() => setIsLoading(false));
          }}
        >
          <div className="form-group">
            <QuadrasList
              onChange={(e) => {
                const { value } = e.target;
                setQuadraId(value);
                setReserva((prev) => ({
                  ...prev,
                  quadraId: value,
                }));
              }}
              selectedQuadra={quadraId}
            />
          </div>

          <div className="form-group">
            <label>Data da Reserva:</label>
            <input
              type="date"
              name="data"
              className="form-control"
              value={data}
              onChange={(e) => {
                const { value } = e.target;
                setData(value);
                setReserva((prev) => ({
                  ...prev,
                  data: value,
                }));
              }}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          {showTimeSelection && (
            <div className="selecao-hora-container">
              <SelecaoHora
                data={data}
                quadraId={quadraId}
                onSubmit={(horaInicio, horaFim) => {
                  if (horaInicio >= horaFim) {
                    setError("Hora de início deve ser menor que hora de fim");
                    return;
                  }
                  setError(null);
                  setReserva((prev) => ({
                    ...prev,
                    horaInicio,
                    horaFim,
                  }));
                }}
              />
            </div>
          )}

          <div className="form-group">
            <label>Detalhes Adicionais:</label>
            <textarea
              name="detalhes"
              className="form-control textarea-details"
              value={reserva.detalhes}
              onChange={handleChange}
              placeholder="Adicione informações relevantes sobre sua reserva..."
            />
          </div>

          <button
            type="submit"
            className="btn-confirmar"
            disabled={
              !data || !quadraId || !reserva.horaInicio || !reserva.horaFim
            }
          >
            Confirmar Reserva
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reserva;
