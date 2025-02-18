// src/components/AppointmentsView.jsx
import { useState } from "react";
import WeekNavigator from "./WeekNavigator";
import AppointmentsList from "./AppointmentsList";

function AppointmentsView() {
  const [showExpired, setShowExpired] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  const handleWeekChange = (newWeekStart) => {
    setCurrentWeekStart(newWeekStart);
  };

  return (
    <div id="appointments-view">
      <h1 className="text-center mb-4">Meus Agendamentos</h1>

      <div className="mb-4 text-center">
        <div className="legend-item">
          <span className="status-indicator status-current"></span>
          <span>Semana Atual</span>
        </div>
        <div className="legend-item">
          <span className="status-indicator status-future"></span>
          <span>Semana Futura</span>
        </div>
        <div className="legend-item">
          <span className="status-indicator status-expired"></span>
          <span>Vencido</span>
        </div>
      </div>

      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#newAppointmentModal"
        >
          <i className="bi bi-plus-circle"></i> Novo Agendamento
        </button>
      </div>

      <div className="mb-4">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="showExpired"
            checked={showExpired}
            onChange={(e) => setShowExpired(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="showExpired">
            Mostrar agendamentos vencidos
          </label>
        </div>
      </div>

      <WeekNavigator
        currentWeekStart={currentWeekStart}
        onWeekChange={handleWeekChange}
      />

      <AppointmentsList
        showExpired={showExpired}
        currentWeekStart={currentWeekStart}
      />
    </div>
  );
}

export default AppointmentsView;
