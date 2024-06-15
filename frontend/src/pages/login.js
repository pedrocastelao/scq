import React, { useContext, useState } from "react";
import "./css/login.css";
import { Context } from "../context/authContext";

export default function Login() {
  const { authenticated, handleLogin } = useContext(Context);
  console.debug("Login", authenticated);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    // Chama a função handleLogin do contexto, passando o email e a senha como parâmetros
    const loginSuccessful = await handleLogin(email, senha);
    !loginSuccessful
      ? setError("Email ou senha incorretos!")
      : console.log("Error");
  };

  return (
    <div id="login-container">
      <div id="login-left">
        <div id="logo">brands HUB</div>
      </div>
      <div id="login-right">
        <h2>Bem vindo ao Painel Admin</h2>
        <p>Entre com suas credenciais</p>
        <form id="login-form" onSubmit={handleSubmit}>
          <div id="email-container">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div id="password-container">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <a href="#" id="forgot-password">
            Esqueceu a senha?
          </a>
          <button type="submit" id="login-button">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}
