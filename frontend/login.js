import React, { useState } from "react";
import api from "./src/pages/api";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (optional, enhance as needed)
    if (!email || !password) {
      setErrorMessage("Por favor, preencha o email e senha.");
      return;
    }

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Handle successful login
        setSuccessMessage("Login efetuado com sucesso!");
        // Implement logic to store token, redirect, etc.
      } else {
        setErrorMessage("Erro ao realizar login. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Erro de rede. Tente novamente mais tarde.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
