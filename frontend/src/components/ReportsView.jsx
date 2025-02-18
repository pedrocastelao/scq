// src/components/ReportsView.jsx
function ReportsView() {
  const generateReport = (type) => {
    console.log(`Generating ${type} report`);
  };

  return (
    <div id="reports-view">
      <h1 className="text-center mb-4">Relatórios</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Relatório de Agendamentos</h5>
              <p className="card-text">
                Exportar relatório completo de agendamentos.
              </p>
              <div className="mb-3">
                <label className="form-label">Período</label>
                <div className="d-flex gap-2">
                  <input type="date" className="form-control" id="startDate" />
                  <input type="date" className="form-control" id="endDate" />
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => generateReport("appointments")}
              >
                <i className="bi bi-download"></i> Exportar PDF
              </button>
            </div>
          </div>
        </div>
        {/* Add the second card for Performance Report */}
      </div>
    </div>
  );
}

export default ReportsView;
