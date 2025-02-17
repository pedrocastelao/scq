// QuadrasList.js
import React, { useEffect, useState } from "react";
import "./QuadrasList.css";
import { getQuadras } from "../config/apiServices";

const QuadrasList = ({ onChange }) => {
  const [quadras, setQuadras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuadras = async () => {
      try {
        setIsLoading(true);
        const response = await getQuadras();
        if (response && response.data) {
          setQuadras(response.data);
          setError(null);
        } else {
          setError("Não foi possível carregar as quadras");
        }
      } catch (error) {
        setError("Erro ao carregar as quadras. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuadras();
  }, []);

  const handleQuadraChange = (e) => {
    if (e.target) {
      const selectedQuadraId = e.target.value;
      onChange?.({ target: { name: "quadraId", value: selectedQuadraId } });
    }
  };

  return (
    <div className="quadras-container">
      <div className="quadras-card">
        <h3 className="quadras-title">Selecione uma Quadra</h3>

        {isLoading ? (
          <div className="loading-spinner">Carregando quadras...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="select-container">
            <label htmlFor="court" className="select-label">
              Quadras Disponíveis:
            </label>
            <select
              id="court"
              onChange={handleQuadraChange}
              required
              className="court-select"
            >
              <option value="">Escolha uma quadra</option>
              {quadras.map((quadra) => (
                <option key={quadra.id} value={quadra.id}>
                  {quadra.tipo} - {quadra.localizacao}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuadrasList;
