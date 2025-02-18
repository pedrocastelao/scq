// Legenda.jsx
import React from "react";
import styled from "styled-components";

const LegendaContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

const LegendaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusDot = styled.span`
  width: 12px;
  height: 12px;
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
