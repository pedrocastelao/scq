// Filtros.jsx
import React from "react";
import styled from "styled-components";

const FiltrosContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Filtros = ({ filtros, setFiltros }) => {
  return (
    <FiltrosContainer>
      <Input
        type="date"
        value={filtros.data || ""}
        onChange={(e) => setFiltros({ ...filtros, data: e.target.value })}
      />
      <Checkbox>
        <input
          type="checkbox"
          checked={filtros.mostrarVencidas}
          onChange={(e) =>
            setFiltros({ ...filtros, mostrarVencidas: e.target.checked })
          }
        />
        Mostrar Vencidas
      </Checkbox>
      <Checkbox>
        <input
          type="checkbox"
          checked={filtros.mostrarCanceladas}
          onChange={(e) =>
            setFiltros({ ...filtros, mostrarCanceladas: e.target.checked })
          }
        />
        Mostrar Canceladas
      </Checkbox>
    </FiltrosContainer>
  );
};

export default Filtros;
