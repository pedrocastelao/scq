import React, { useState, useEffect } from "react";
import "./css/reserva.css";
import Menu from "./menu";
import ModalReserva from "./modalReserva";
import api from "./api";
import authService from "./authService";
import TabelaReservas from "./tabelaReserva";

function Reserva() {
  // Estado para controlar a exibição da modal
  const [showModal, setShowModal] = useState(false);
  // Estado para armazenar as informações do cliente e suas reservas
  const [clienteReservas, setClienteReservas] = useState([]);

  // Use o useEffect para chamar fetchData quando o componente for montado
  useEffect(() => {
    // Função para carregar as informações do cliente e suas reservas
    const fetchData = async () => {
      try {
        const token = authService.getToken();
        // Faça uma solicitação para obter as informações do cliente e suas reservas
        const response = await api.get("/reservas", {
          headers: {
            Authorization: `Bearer ${token}`, // Adicione o token JWT no cabeçalho Authorization
            "Content-Type": "application/json", // Especifique o tipo de conteúdo da solicitação
          },
        });
        setClienteReservas(response.data);
      } catch (error) {
        console.error("Erro ao obter dados do cliente e suas reservas:", error);
      }
    };

    fetchData();
  }, []); /* [] para executar apenas uma vez ao montar o componente */

  // Função para editar uma reserva
  const editarReserva = (id) => {
    console.log("Editar reserva com ID:", id);
  };

  // Função para excluir uma reserva
  const excluirReserva = (id) => {
    console.log("Excluir reserva com ID:", id);
  };

  // Função para abrir a modal
  const openModal = () => {
    setShowModal(true);
  };

  // Função para fechar a modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div id="reserva">
      <Menu />
      <div className="container mt-2 content-container">
        <h1 id="titulo">Reservas</h1>
        <div className="button-container">
          <button id="botao-fazer-reserva" onClick={openModal}>
            Fazer Reserva
          </button>
        </div>
        {/* Tabela de reservas */}
        <TabelaReservas
          reservas={clienteReservas}
          editarReserva={editarReserva}
          excluirReserva={excluirReserva}
        />
        <ModalReserva showModal={showModal} closeModal={closeModal} />
      </div>
    </div>
  );
}

export default Reserva;
