import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import "./SelecaoHora.css";
import { getHorarios } from "../config/apiServices";

const SelecaoHora = ({ data, quadraId, onSubmit }) => {
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHorarios = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getHorarios(data, quadraId);
        setHorariosDisponiveis(response.data.horariosIndividuais || []);
      } catch (error) {
        setError("Erro ao carregar horários disponíveis");
        console.error("Erro ao buscar horários:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (data && quadraId) {
      fetchHorarios();
    }
  }, [data, quadraId]);

  const getHoursDiff = (time1, time2) => {
    const [h1] = time1.split(":").map(Number);
    const [h2] = time2.split(":").map(Number);
    return h2 - h1;
  };

  const horariosFinais = useMemo(() => {
    if (!horaInicio) return [];

    const indexInicio = horariosDisponiveis.indexOf(horaInicio);
    const consecutivos = [];

    for (let i = indexInicio + 1; i < horariosDisponiveis.length; i++) {
      const horaAtual = horariosDisponiveis[i];
      const horaAnterior = horariosDisponiveis[i - 1];

      if (getHoursDiff(horaAnterior, horaAtual) === 1) {
        consecutivos.push(horaAtual);
      } else {
        break;
      }
    }

    return consecutivos;
  }, [horaInicio, horariosDisponiveis]);

  const handleHoraChange = () => {
    if (!horaInicio || !horaFim) return;

    const inicio = parseInt(horaInicio.split(":")[0]);
    const fim = parseInt(horaFim.split(":")[0]);

    if (inicio >= fim) {
      setError("Hora de início deve ser menor que hora de fim");
      return;
    }

    setError(null);
    onSubmit(horaInicio, horaFim);
  };

  return (
    <div className="selecao-hora-container">
      <div className="selecao-hora-card">
        <h2 className="selecao-title">Selecione o Horário</h2>

        {isLoading && (
          <div className="loading-message">Carregando horários...</div>
        )}

        {error && <div className="error-message">{error}</div>}

        {!isLoading && !error && (
          <>
            {horariosDisponiveis.length === 0 ? (
              <div className="no-times-message">
                Não há horários disponíveis para esta data
              </div>
            ) : (
              <div className="time-selection-grid">
                <div className="form-group">
                  <label className="time-label">Hora de Início:</label>
                  <select
                    className="time-select"
                    value={horaInicio}
                    onChange={(e) => {
                      setHoraInicio(e.target.value);
                      setHoraFim(""); // Reset hora fim quando mudar hora início
                      setError(null);
                    }}
                  >
                    <option value="">Selecione</option>
                    {horariosDisponiveis.map((horario, index) => (
                      <option key={index} value={horario}>
                        {horario}
                      </option>
                    ))}
                  </select>
                </div>

                {horaInicio && (
                  <div className="form-group">
                    <label className="time-label">Hora de Fim:</label>
                    <select
                      className="time-select"
                      value={horaFim}
                      onChange={(e) => {
                        setHoraFim(e.target.value);
                        handleHoraChange();
                      }}
                    >
                      <option value="">Selecione</option>
                      {horariosFinais.map((horario, index) => (
                        <option key={index} value={horario}>
                          {horario}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

SelecaoHora.propTypes = {
  data: PropTypes.string.isRequired,
  quadraId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SelecaoHora;
