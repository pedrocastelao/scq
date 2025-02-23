// ReservaCard.jsx
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  padding: 12px; // Reduced from 16px
  border-radius: 6px; // Reduced from 8px
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Reduced shadow
  background-color: white;
  border-left: 3px solid // Reduced from 4px
    ${(props) => {
      switch (props.status) {
        case "ATIVA": return "#4CAF50";
        case "FUTURA": return "#2196F3";
        case "VENCIDA": return "#FF9800";
        case "CANCELADA": return "#F44336";
        default: return "#grey";
      }
    }};
`;

const Nome = styled.h3`
  margin: 0 0 4px 0; // Reduced from 8px
  color: #333;
  font-size: 0.9rem; // Added to reduce text size
`;

const Info = styled.p`
  margin: 2px 0; // Reduced from 4px
  color: #666;
  font-size: 0.8rem; // Added to reduce text size
`;

const Status = styled.span`
  padding: 2px 6px; // Reduced from 4px 8px
  border-radius: 3px; // Reduced from 4px
  font-size: 11px; // Reduced from 12px
  font-weight: bold;
  color: white;
  background-color: ${(props) => {
    switch (props.status) {
      case "ATIVA": return "#4CAF50";
      case "FUTURA": return "#2196F3";
      case "VENCIDA": return "#FF9800";
      case "CANCELADA": return "#F44336";
      default: return "grey";
    }
  }};
`;

const NovaReservaCard = styled(Card)`
  background-color: #f8f9fa;
  border-left: 3px solid #007bff; // Reduced from 4px
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px; // Reduced from 200px
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

const AddIcon = styled.div`
  font-size: 32px; // Reduced from 40px
  color: #007bff;
  margin-bottom: 8px; // Reduced from 10px
`;

const AddText = styled.p`
  color: #007bff;
  font-weight: 500;
  margin: 0;
  font-size: 0.9rem; // Added to reduce text size
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
