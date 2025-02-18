// ReservaCard.jsx
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-left: 4px solid
    ${(props) => {
      switch (props.status) {
        case "ATIVA":
          return "#4CAF50";
        case "FUTURA":
          return "#2196F3";
        case "VENCIDA":
          return "#FF9800";
        case "CANCELADA":
          return "#F44336";
        default:
          return "#grey";
      }
    }};
`;

const Nome = styled.h3`
  margin: 0 0 8px 0;
  color: #333;
`;

const Info = styled.p`
  margin: 4px 0;
  color: #666;
`;

const Status = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background-color: ${(props) => {
    switch (props.status) {
      case "ATIVA":
        return "#4CAF50";
      case "FUTURA":
        return "#2196F3";
      case "VENCIDA":
        return "#FF9800";
      case "CANCELADA":
        return "#F44336";
      default:
        return "grey";
    }
  }};
`;

const ReservaCard = ({ reserva }) => {
  const formatarData = (data) => {
    return new Date(data).toLocaleString("pt-BR");
  };

  return (
    <Card status={reserva.status}>
      <Nome>{reserva.nome}</Nome>
      <Info>Início: {formatarData(reserva.dataInicio)}</Info>
      <Info>Fim: {formatarData(reserva.dataFim)}</Info>
      <Info>Local: {reserva.quadra.tipo}</Info>
      <Status status={reserva.status}>{reserva.status}</Status>
    </Card>
  );
};

export default ReservaCard;
