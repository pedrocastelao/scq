import styled from "styled-components";
import NovaReservaForm from "./NovaReservaForm";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
`;

const NovaReservaModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <h2>Nova Reserva</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <NovaReservaForm onClose={onClose} onSubmit={onSubmit} />
      </ModalContent>
    </Modal>
  );
};

export default NovaReservaModal;
