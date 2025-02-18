// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">
              © 2024 - PC Desenvolvimentos. Todos os direitos reservados.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0">
              <a
                href="https://wa.me/5518988220819"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <i className="bi bi-whatsapp"></i> (18) 98822-0819
              </a>
              <span className="mx-2">|</span>
              <a
                href="mailto:pedro.castelao@outlook.com.br"
                className="text-decoration-none"
              >
                <i className="bi bi-envelope"></i> pedro.castelao@outlook.com.br
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
