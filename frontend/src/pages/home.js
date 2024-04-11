import React from "react";
import { Link } from "react-router-dom";
import "./home.css"; // Importe o arquivo CSS para aplicar estilos

function Home() {
  return (
    <div className="home-container">
      <h1>Bem-vindo à Página Inicial</h1>
      <nav className="menu">
        <div className="menu-item">
          <Link to="/localizacao">Localização</Link>
        </div>
        <div className="menu-item">
          <Link to="/contato">Contato</Link>
        </div>
        <div className="menu-item">
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <p>Esta é a página inicial do nosso aplicativo.</p>
    </div>
  );
}

export default Home;
