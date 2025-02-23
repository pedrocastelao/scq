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

const NovaReservaCard = styled(Card)`
  background-color: #f8f9fa;
  border-left: 4px solid #007bff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const AddIcon = styled.div`
  font-size: 40px;
  color: #007bff;
  margin-bottom: 10px;
`;

const AddText = styled.p`
  color: #007bff;
  font-weight: 500;
  margin: 0;
`;

const ReservaCard = ({ reserva, onNovaReserva }) => {
  if (!reserva) {
    return (
      <NovaReservaCard onClick={onNovaReserva}>
        <AddIcon>+</AddIcon>
        <AddText>Nova Reserva</AddText>
      </NovaReservaCard>
      
    );
  }

  const formatarData = (data) => {
    return new Date(data).toLocaleString("pt-BR");
  };

  return (
    <Card status={reserva.status}>
      <Nome>{reserva.nome}</Nome>
      <Info>Início: {formatarData(reserva.dataInicio)}</Info>
      <Info>Fim: {formatarData(reserva.dataFim)}</Info>
      <Info>Local: {reserva.quadra?.localizacao ?? "N/A"}</Info>
      <Status status={reserva.status}>{reserva.status}</Status>
    </Card>
  );
};

export default ReservaCard;
