import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4">
            <h5>Sobre Nós</h5>
            <p>Informações sobre a empresa e sua missão.</p>
          </div>
          <div className="col-md-4">
            <h5>Links Úteis</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Redes Sociais</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center py-3">
          <small>&copy; 2025 Grupo Size. Todos os direitos reservados.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
