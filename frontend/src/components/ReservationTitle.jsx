import styled from "styled-components";
import Legenda from "./Legenda";

const TitleContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 8px;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
`;

const ReservationTitle = () => {
  return (
    <TitleContainer>
      <Title>Reservas</Title>
      <Legenda />
    </TitleContainer>
  );
};

export default ReservationTitle;
