import React, { useState } from "react";
import QuadrasList from "./quadraList";
import "./css/quadraLista.css";
import api from "./api";
import authService from "./authService";
import HoraSelecao from "./horaSelecao";
import { Alert, message } from "antd";

const ModalReserva = ({ showModal, closeModal }) => {
  const [data, setData] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [quadraId, setQuadraId] = useState("");
  const [disponibilidade, setDisponibilidade] = useState(false);
  const [mensagemResposta, setMensagemResposta] = useState("");
  const [camposDesabilitados, setCamposDesabilitados] = useState(false);

  // Função para limpar os campos de entrada
  const limparCampos = () => {
    setData("");
    setHoraInicio("");
    setHoraFim("");
    setQuadraId("");
    setDisponibilidade(false);
    setMensagemResposta("");
    setCamposDesabilitados(false);
  };

  // Função para fechar a modal e limpar os campos
  const handleCloseModal = () => {
    limparCampos();
    closeModal();
  };

  // Função para verificar disponibilidade da reserva
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
      setMensagemResposta(
        <Alert message={response.data.message} type="success" />
      );
      setDisponibilidade(true);
      setCamposDesabilitados(true);
    } catch (error) {
      console.error(error);
      setMensagemResposta(
        <Alert message="Data e Horario não Disponivel!" type="error" />
      );
    }
  };

  // Função para fazer a reserva
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = authService.getToken();
      const response = await api.post(
        "/reserva/nova",
        { data, horaInicio, horaFim, quadraId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMensagemResposta(response.data.message);

      // Exibe a mensagem de sucesso usando o componente de mensagem do Ant Design
      message.success("Reserva feita com sucesso!");

      // Limpa os campos e fecha a modal
      limparCampos();
      closeModal();

      // Recarrega a página após 5 segundos
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 5000 milissegundos = 5 segundos
    } catch (error) {
      console.error("Erro ao fazer a reserva:", error);
      message.error("Erro ao fazer a reserva. Por favor, tente novamente.");
    }
  };

  return (
    showModal && (
      <div id="modal-container">
        <div id="modal-card">
          <div id="card-header">
            <h2 id="card-title">Cadastro de Reserva</h2>
            <button id="close-button" onClick={handleCloseModal}>
              Fechar
            </button>
          </div>
          <div id="card-body">
            <form>
              <QuadrasList
                onChange={(selectedQuadraId) => setQuadraId(selectedQuadraId)}
                disabled={camposDesabilitados}
              />
              <div id="form-group">
                <label htmlFor="data">Data:</label>
                <input
                  type="date"
                  id="data"
                  value={data}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </div>

              <div id="form-group">
                <HoraSelecao
                  horaInicio={horaInicio}
                  handleHoraInicioChange={(e) => {
                    setHoraInicio(e.target.value);
                    if (horaFim < e.target.value) {
                      setHoraFim("");
                    }
                  }}
                  horaFim={horaFim}
                  handleHoraFimChange={(e) => setHoraFim(e.target.value)}
                />
              </div>
              <button
                className="btn btn-secondary mb-4 mr-2"
                onClick={handleVerificarDisponibilidade}
                disabled={
                  !data || !horaInicio || !horaFim || camposDesabilitados
                }
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
