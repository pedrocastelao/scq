import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context/authContext";
import "./css/menu.css";
import api from "./api";
import authService from "./authService";
import Loading from "./loading";
import imgagemEscolhida from "./img/logo.jpg";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

function Menu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [clientInfo, setClientInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { handleLogout } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authService.getToken();
        const response = await api.get("/clientes", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setClientInfo(response.data);
        } else {
          console.log("Erro ao carregar informações do cliente.");
        }
      } catch (error) {
        console.error("Erro ao carregar informações do cliente:", error);
        console.log("Erro ao carregar informações do cliente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav
      id="menu"
      className=".MuiToolbar-root, .MuiToolbar-gutters, .MuiToolbar-regular, .css-6dg8wp"
    >
      <div>
        <img src={imgagemEscolhida} width="10%" alt="Logo" />
      </div>
      <div id="navbar-actions">
        <button
          id="profile-button"
          onClick={toggleDropdown}
          className=".MuiButton-root, .MuiButton-text, .MuiButton-textInherit, .MuiButton-sizeMedium, .MuiButton-textSizeMedium, .MuiButton-colorInherit, .MuiButtonBase-root, .css-1m4wmwp"
        >
          <Space wrap size={16}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Space>
          <span id="oi">Olá,</span>
          {clientInfo && clientInfo.nome && (
            <span
              id="apresentacao"
              style={{ fontSize: "16px", lineHeight: " 24px" }}
            >
              {clientInfo.nome}
            </span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-arrow-down-short"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <div id="dropdown">
            {clientInfo ? (
              <ul>
                <li>
                  <strong>CPF:</strong> {clientInfo.cpf}
                </li>
                <li>
                  <strong>Celular:</strong> {clientInfo.celular}
                </li>
                <li>
                  <strong>Email:</strong> {clientInfo.email}
                </li>
                <li>
                  <button id="logout-button" onClick={handleLogout}>
                    Sair
                  </button>
                </li>
              </ul>
            ) : (
              <p>Carregando informações do cliente...</p>
            )}
          </div>
        )}
      </div>
      {loading && <Loading />}
    </nav>
  );
}

export default Menu;
