import React, { useEffect, useState } from "react";
import api from "./api";
import authService from "./authService";


const QuadrasList = ({ onChange, disabled }) => {
  const [quadras, setQuadras] = useState([]);

  useEffect(() => {
    const fetchQuadras = async () => {
      try {
        const token = authService.getToken();
        const response = await api.get("/quadras-info", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setQuadras(response.data);
      } catch (error) {
        console.error("Erro ao obter dados das quadras:", error);
      }
    };

    fetchQuadras();
  }, []);

  const handleQuadraChange = (e) => {
    const selectedQuadraId = e.target.value;
    onChange(selectedQuadraId);
  };

  return (
    <div id="quadras-list-container">
      <label htmlFor="court" className="quadras-list-label">
        Lista de Quadras Disponíveis
      </label>
      <select
        id="court"
        onChange={handleQuadraChange}
        required
        disabled={disabled}
        className="quadras-list-select"
      >
        <option value="">Selecione...</option>
        {quadras.map((quadra) => (
          <option key={quadra.id} value={quadra.id}>
            {quadra.tipo} - {quadra.localizacao}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuadrasList;
