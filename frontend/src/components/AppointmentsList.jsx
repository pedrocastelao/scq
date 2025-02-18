// src/components/AppointmentsList.jsx
import { useState, useEffect } from "react";
import { getReservas } from "../config/apiServices";

function AppointmentsList({ showExpired, AtivaWeekStart }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReservas();
        // console.log(response.data); // Verifique a estrutura do retorno
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para verificar se a data está na semana selecionada
  const isDateInSelectedWeek = (dateStr) => {
    // console.log(dateStr);
    const appointmentDate = new Date(dateStr);
    const weekStart = new Date(AtivaWeekStart);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    console.log("weekStart", weekStart);
    console.log("weekEnd", weekEnd);

    return appointmentDate >= weekStart && appointmentDate <= weekEnd;
  };

  console.log("isDateInSelectedWeek", isDateInSelectedWeek());
  // console.log("Appointments:", appointments);
  // console.log("Show Expired:", showExpired);

  // Filtra as reservas para a semana selecionada
  const filteredAppointments = appointments.filter(
    (apt) =>
      isDateInSelectedWeek(apt.data) &&
      (showExpired || apt.status !== "expired")
  );

  console.log("filteredAppointments", filteredAppointments);

  // Ordena as reservas por data e horário
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateA = new Date(`${a.data} ${a.horaInicio}`);
    const dateB = new Date(`${b.data} ${b.horaInicio}`);

    return dateA - dateB;
  });

  // Função para formatar a data
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Função para obter a cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case "Ativa":
        return "border-success";
      case "future":
        return "border-primary";
      case "expired":
        return "border-danger";
      default:
        return "";
    }
  };

  if (loading) {
    return <div>Carregando...</div>; // Exibe mensagem de carregamento enquanto os dados estão sendo buscados
  }

  return (
    <div className="row" id="appointments-container">
      {sortedAppointments.length > 0 ? (
        sortedAppointments.map((appointment) => (
          <div key={appointment.id} className="col-md-4 mb-4">
            <div
              className={`card h-100 border-3 ${getStatusColor(
                appointment.status
              )}`}
            >
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{appointment.nome}</h5>
                <div className="dropdown">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-three-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => console.log("Edit", appointment.id)}
                      >
                        <i className="bi bi-pencil me-2"></i>Editar
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => console.log("Cancel", appointment.id)}
                      >
                        <i className="bi bi-x-circle me-2"></i>Cancelar
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-2">
                  <i className="bi bi-scissors me-2"></i>
                  <strong>Serviço:</strong> {appointment.cpf}
                </div>
                <div className="mb-2">
                  <i className="bi bi-person me-2"></i>
                  <strong>Profissional:</strong> {appointment.email}
                </div>
                <div className="mb-2">
                  <i className="bi bi-calendar me-2"></i>
                  <strong>Data:</strong> {formatDate(appointment.data)}
                </div>
                <div className="mb-2">
                  <i className="bi bi-clock me-2"></i>
                  <strong>Horário:</strong> {appointment.horaInicio} -{" "}
                  {appointment.horaFim}
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <span
                  className={`badge ${
                    appointment.status === "Ativa"
                      ? "bg-success"
                      : appointment.status === "future"
                      ? "bg-primary"
                      : "bg-danger"
                  }`}
                >
                  {appointment.status === "Ativa"
                    ? "Semana Atual"
                    : appointment.status === "future"
                    ? "Semana Futura"
                    : "Vencido"}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12">Nenhuma reserva encontrada.</div>
      )}

      {/* Paginação */}
      <nav aria-label="Navegação de páginas" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex="-1">
              Anterior
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Próxima
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AppointmentsList;
