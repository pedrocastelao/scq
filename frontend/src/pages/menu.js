import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/authContext";
import "./menu.css";
import ModalPerfil from "./modalPerfil";
import api from "./api";
import authService from "./authService";
import Loading from "./loading";

function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [clientInfo, setClientInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { handleLogout } = useContext(Context);

  // Use o useEffect para chamar fetchData quando o componente for montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authService.getToken();
        const response = await api.get("/cliente-info", {
          headers: {
            Authorization: `Bearer ${token}`, // Adicione o token JWT no cabeçalho Authorization
            "Content-Type": "application/json", // Especifique o tipo de conteúdo da solicitação
          },
        });
        if (response.status === 200) {
          setClientInfo(response.data);
        } else {
          console.log(
            "Erro ao carregar informações do cliente. Tente novamente mais tarde."
          );
        }
      } catch (error) {
        console.error("Erro ao carregar informações do cliente:", error);
        console.log(
          "Erro ao carregar informações do cliente. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false); // Define loading como false após a conclusão do carregamento
      }
    };

    fetchData();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Seu Logo Aqui</div>
      <div className="navbar-actions">
        {clientInfo && clientInfo.email && <span>{clientInfo.email}</span>}
        <button className="profile-button" onClick={openModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </button>
        <button className="logout-button" onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-box-arrow-in-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
            />
            <path
              fill-rule="evenodd"
              d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
            />
          </svg>
        </button>
        <ModalPerfil
          showModal={showModal}
          closeModal={closeModal}
          clientInfo={clientInfo}
        />
      </div>
      {loading && <Loading />}{" "}
      {/* Renderiza o componente de Loading se loading for true */}
    </nav>
  );
}

export default Menu;
