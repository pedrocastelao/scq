import React, { useState, useEffect } from "react";
import "./reserva.css";
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
  useEffect(
    () => {
      // Função para carregar as informações do cliente e suas reservas
      const fetchData = async () => {
        try {
          const token = authService.getToken();
          // Faça uma solicitação para obter as informações do cliente e suas reservas
          const response = await api.get("/reserva", {
            headers: {
              Authorization: `Bearer ${token}`, // Adicione o token JWT no cabeçalho Authorization
              "Content-Type": "application/json", // Especifique o tipo de conteúdo da solicitação
            },
          });
          //console.log("response.data", response);
          setClienteReservas(response.data);
        } catch (error) {
          console.error(
            "Erro ao obter dados do cliente e suas reservas:",
            error
          );
        }
      };

      fetchData();

      //console.log("Valor atualizado de showModal:", showModal);
    },
    [] /*[showModal]*/
  );
  // Função para editar uma reserva
  const editarReserva = (id) => {
    // Lógica para editar a reserva com o ID fornecido
    console.log("Editar reserva com ID:", id);
  };

  // Função para excluir uma reserva
  const excluirReserva = (id) => {
    // Lógica para excluir a reserva com o ID fornecido
    console.log("Excluir reserva com ID:", id);
  };

  // Função para abrir a modal
  const openModal = () => {
    console.log("Antes de setShowModal(true):", showModal);
    setShowModal(true);
  };

  // Função para fechar a modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Reservas</h1>
        <button className="btn btn-primary mb-4" onClick={openModal}>
          Fazer Reserva
        </button>
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
