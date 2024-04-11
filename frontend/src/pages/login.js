import React, { useContext, useState } from "react";
import "./login.css";
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
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}
