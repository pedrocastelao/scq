// src/App.jsx
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import AppointmentsView from "./components/AppointmentsView";
import ReportsView from "./components/ReportsView";
import Footer from "./components/Footer";
import NewAppointmentModal from "./components/NewAppointmentModal";

function App() {
  const [currentView, setCurrentView] = useState("appointments");

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />

        <div className="col-md-10 py-5">
          {currentView === "appointments" && <AppointmentsView />}
          {currentView === "reports" && <ReportsView />}
        </div>
      </div>

      <Footer />
      <NewAppointmentModal />
    </div>
  );
}

export default App;
