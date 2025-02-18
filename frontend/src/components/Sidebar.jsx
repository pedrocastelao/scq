// src/components/Sidebar.jsx
function Sidebar({ currentView, onViewChange }) {
  const handleLogout = () => {
    // Implement logout logic
  };

  const handleChangePassword = () => {
    // Implement change password logic
  };

  return (
    <div className="col-md-2 sidebar">
      <h4 className="mb-4">Menu</h4>

      <div
        className={`menu-item ${
          currentView === "appointments" ? "active-menu" : ""
        }`}
        onClick={() => onViewChange("appointments")}
      >
        <i className="bi bi-calendar-check"></i> Agendamentos
      </div>

      <div
        className={`menu-item ${
          currentView === "reports" ? "active-menu" : ""
        }`}
        onClick={() => onViewChange("reports")}
      >
        <i className="bi bi-file-earmark-text"></i> Relatórios
      </div>

      <div className="user-profile mt-auto">
        <hr className="my-3" />
        <div className="d-flex align-items-center mb-2">
          <i className="bi bi-person-circle fs-4 me-2"></i>
          <div>
            <div className="fw-bold">João Silva</div>
            <small className="text-muted">Administrador</small>
          </div>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={handleChangePassword}
          >
            <i className="bi bi-key"></i> Senha
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i> Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
