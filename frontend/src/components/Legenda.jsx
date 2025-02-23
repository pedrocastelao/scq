// Legenda.jsx
import React from "react";
import styled from "styled-components";

const LegendaContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const LegendaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem; // Optional: make legend text slightly smaller
`;

const StatusDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const Legenda = () => {
  return (
    <LegendaContainer>
      <LegendaItem>
        <StatusDot color="#4CAF50" />
        Ativa
      </LegendaItem>
      <LegendaItem>
        <StatusDot color="#2196F3" />
        Futura
      </LegendaItem>
      <LegendaItem>
        <StatusDot color="#FF9800" />
        Vencida
      </LegendaItem>
      <LegendaItem>
        <StatusDot color="#F44336" />
        Cancelada
      </LegendaItem>
    </LegendaContainer>
  );
};

export default Legenda;
