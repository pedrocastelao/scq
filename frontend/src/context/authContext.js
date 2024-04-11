import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../pages/authService";
import Loading from "../pages/loading";

const Context = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate(); // Obtém a função de navegação
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin(email, senha) {
    try {
      const cliente = await authService.fazerLogin(email, senha);
      //console.log("Login bem-sucedido. Cliente:", cliente);
      setAuthenticated(true); // Define o estado de autenticação como verdadeiro
      navigate("/reserva"); // Navega para a rota "/home"
      // Retorne os dados do cliente
      return cliente;
    } catch (error) {
      //console.error("Erro ao fazer login:", error);
      // Aqui você pode tratar o erro de acordo com sua lógica de frontend
    }
  }

  function handleLogout() {
    try {
      setAuthenticated(false);
      authService.fazerLogout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Context.Provider value={{ authenticated, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
