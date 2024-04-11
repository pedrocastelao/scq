import React, { useState } from "react";
import "./modalReserva.css";
import QuadrasList from "./quadraList";
import "./quadraLista.css";
import api from "./api";
import authService from "./authService";
import HoraSelecao from "./horaSelecao";

const ModalReserva = ({ showModal, closeModal }) => {
  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [quadraId, setQuadraId] = useState("");
  const [disponibilidade, setDisponibilidade] = useState(false);
  const [mensagemResposta, setMensagemResposta] = useState("");
  const [camposDesabilitados, setCamposDesabilitados] = useState(false); // Estado para controlar a habilitação dos campos

  const handleQuadraChange = (selectedQuadraId) => {
    setQuadraId(selectedQuadraId);
  };

  const handleDateChange = (e) => {
    setData(e.target.value);
  };

  const handleHoraInicioChange = (e) => {
    setHoraInicio(e.target.value);
    // Limpa a hora de fim se for anterior à hora de início selecionada
    if (horaFim < e.target.value) {
      setHoraFim("");
    }
  };

  const handleHoraFimChange = (e) => {
    setHoraFim(e.target.value);
  };

  const handleVerificarDisponibilidade = async (e) => {
    e.preventDefault();
    try {
      const token = authService.getToken();
      const response = await api.post(
        "/reserva/reservadisponivel",
        { data, horaInicio, horaFim, quadraId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMensagemResposta(response.data.message);
      setDisponibilidade(true);
      setCamposDesabilitados(true); // Desabilita os campos após verificar a disponibilidade
    } catch (error) {
      console.error("Erro ao verificar disponibilidade:", error);
      setMensagemResposta("Erro ao verificar disponibilidade");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = authService.getToken();
      const response = await api.post(
        "/reserva/cadastrar",
        { data, horaInicio, horaFim, quadraId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMensagemResposta(response.data.message);
      //setDisponibilidade(true);
      //setCamposDesabilitados(true); // Desabilita os campos após verificar a disponibilidade
    } catch (error) {
      console.error("fazer a reserva", error);
      //setMensagemResposta("Erro ao verificar disponibilidade");
    }
  };

  return (
    showModal && (
      <div className="modal-container">
        <div className="modal-card">
          <div className="card-header">
            <h2 className="card-title">Cadastro de Reserva</h2>
            <button className="close-button" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-octagon"
                viewBox="0 0 16 16"
              >
                <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          </div>
          <div className="card-body">
            <form>
              <QuadrasList
                onChange={handleQuadraChange}
                disabled={camposDesabilitados} // Passa o estado de habilitação
              />
              <div className="form-group">
                <label htmlFor="data">Data:</label>
                <input
                  type="date"
                  id="data"
                  value={data}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleDateChange}
                  required
                />
              </div>

              <div className="form-group">
                <HoraSelecao
                  horaInicio={horaInicio}
                  handleHoraInicioChange={handleHoraInicioChange}
                  horaFim={horaFim}
                  handleHoraFimChange={handleHoraFimChange}
                />
              </div>
              <button
                className="btn btn-secondary mb-4 mr-2"
                onClick={handleVerificarDisponibilidade}
                disabled={camposDesabilitados} // Desabilita se camposDesabilitados for verdadeiro
              >
                Verificar Disponibilidade
              </button>

              <button
                className="btn btn-primary mb-4"
                onClick={handleSubmit}
                disabled={!disponibilidade}
              >
                Reservar
              </button>

              <div className="resposta-message">{mensagemResposta}</div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalReserva;
