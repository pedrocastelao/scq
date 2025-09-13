// ReservaCard.jsx
import { useState } from "react";
import { FaInfoCircle, FaTimesCircle, FaPlus } from "react-icons/fa"; // Importar ícones
import styled from "styled-components";

const Card = styled.div`
  position: relative;
  padding: 20px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  border-left: 4px solid
    ${(props) =>
      props.status === "ATIVA"
        ? "#4CAF50"
        : props.status === "VENCIDA"
        ? "#FFC107"
        : props.status === "CANCELADA"
        ? "#F44336"
        : "#999"};
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

const ButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;


const ReservaCard = ({ reserva, onNovaReserva, onCancelar }) => {
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [showCancelarModal, setShowCancelarModal] = useState(false);

  const handleCancelar = () => {
    onCancelar(reserva);
    setShowCancelarModal(false);
  };

  if (!reserva) {
    return (
      <NovaReservaCard onClick={onNovaReserva}>
        <FaPlus size={17} />
        <AddText>Nova Reserva</AddText>
      </NovaReservaCard>
    );
  }

  const formatarData = (data) => {
    return new Date(data).toLocaleString("pt-BR");
  };

  return (
    <>
      <Card status={reserva.status}>
        <Nome>{reserva.nome}</Nome>
        <Info>Início: {formatarData(reserva.dataInicio)}</Info>
        <Info>Fim: {formatarData(reserva.dataFim)}</Info>
        <Info>Local: {reserva.quadra?.localizacao ?? "N/A"}</Info>
        <Status status={reserva.status}>{reserva.status}</Status>

        <ButtonContainer>
          <IconButton onClick={() => setShowDetalhesModal(true)}>
            <FaInfoCircle size={20} color="#4A90E2" />
          </IconButton>
          <IconButton onClick={() => setShowCancelarModal(true)}>
            <FaTimesCircle size={20} color="#E25C5C" />
          </IconButton>
        </ButtonContainer>
      </Card>

      {/* Modal de Detalhes */}
      {showDetalhesModal && (
        <ModalOverlay>
          <DetalhesModal>
            <ModalHeader>
              <h3>Detalhes da Reserva</h3>
              <CloseButton onClick={() => setShowDetalhesModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <DetalhesItem>
                <Label>Reserva #:</Label>
                <Value>{reserva.id}</Value>
              </DetalhesItem>
              <DetalhesItem>
                <Label>Nome:</Label>
                <Value>{reserva.nome}</Value>
              </DetalhesItem>
              <DetalhesItem>
                <Label>Data Início:</Label>
                <Value>{new Date(reserva.dataInicio).toLocaleString()}</Value>
              </DetalhesItem>
              <DetalhesItem>
                <Label>Data Fim:</Label>
                <Value>{new Date(reserva.dataFim).toLocaleString()}</Value>
              </DetalhesItem>
              <DetalhesItem>
                <Label>Local:</Label>
                <Value>{reserva.quadra?.localizacao}</Value>
              </DetalhesItem>
              <DetalhesItem>
                <Label>Status:</Label>
                <StatusBadge status={reserva.status}>
                  {reserva.status}
                </StatusBadge>
              </DetalhesItem>
            </ModalContent>
          </DetalhesModal>
        </ModalOverlay>
      )}

      {/* Modal de Cancelamento */}
      {showCancelarModal && (
        <ModalOverlay>
          <CancelarModal>
            <ModalHeader>
              <h3>Cancelar Reserva</h3>
              <CloseButton onClick={() => setShowCancelarModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <p>Tem certeza que deseja cancelar esta reserva?</p>
              <p>
                <strong>Data:</strong>{" "}
                {new Date(reserva.dataInicio).toLocaleString()}
              </p>
              <p>
                <strong>Local:</strong> {reserva.quadra?.localizacao}
              </p>

              <ButtonGroup>
                <CancelButton onClick={() => setShowCancelarModal(false)}>
                  Voltar
                </CancelButton>
                <ConfirmButton onClick={handleCancelar}>
                  Confirmar Cancelamento
                </ConfirmButton>
              </ButtonGroup>
            </ModalContent>
          </CancelarModal>
        </ModalOverlay>
      )}
    </>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const BaseModal = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  min-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const DetalhesModal = styled(BaseModal)`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    height: 2px;
    background: repeating-linear-gradient(
      90deg,
      #ddd 0,
      #ddd 6px,
      transparent 6px,
      transparent 12px
    );
  }
`;

const CancelarModal = styled(BaseModal)`
  max-width: 500px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
    color: #333;
  }
`;

const ModalContent = styled.div`
  padding: 20px 0;
`;

const DetalhesItem = styled.div`
  display: flex;
  margin-bottom: 15px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

const Label = styled.span`
  font-weight: bold;
  width: 120px;
  color: #666;
`;

const Value = styled.span`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
`;

const CancelButton = styled(Button)`
  background: #f0f0f0;
  color: #666;

  &:hover {
    background: #e0e0e0;
  }
`;

const ConfirmButton = styled(Button)`
  background: #dc3545;
  color: white;

  &:hover {
    background: #c82333;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
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

export default ReservaCard;
