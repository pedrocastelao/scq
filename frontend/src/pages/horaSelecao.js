import React from "react";

const HoraSelecao = ({
  horaInicio,
  handleHoraInicioChange,
  horaFim,
  handleHoraFimChange,
}) => {
  const horas = Array.from({ length: 17 }, (_, i) => i + 6); // Horas disponíveis de 6 a 22

  const handleChangeHoraFim = (e) => {
    const selectedHoraFim = e.target.value;
    if (selectedHoraFim >= horaInicio) {
      handleHoraFimChange(e);
    }
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="horaInicio">Hora Início:</label>
        <select
          id="horaInicio"
          value={horaInicio}
          onChange={handleHoraInicioChange}
          required
        >
          <option value="">Selecione...</option>
          {horas.map((hora) => (
            <option key={hora} value={`${hora.toString().padStart(2, "0")}:00`}>
              {`${hora.toString().padStart(2, "0")}:00`}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="horaFim">Hora Fim:</label>
        <select
          id="horaFim"
          value={horaFim}
          onChange={handleChangeHoraFim}
          required
        >
          <option value="">Selecione...</option>
          {horas.map((hora) => {
            if (hora >= parseInt(horaInicio.split(":")[0])) {
              return (
                <option
                  key={hora}
                  value={`${hora.toString().padStart(2, "0")}:00`}
                >
                  {`${hora.toString().padStart(2, "0")}:00`}
                </option>
              );
            }
            return null;
          })}
        </select>
      </div>
    </>
  );
};

export default HoraSelecao;
