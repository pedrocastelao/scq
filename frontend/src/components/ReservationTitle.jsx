// ReservationTitle.js
import styled from "styled-components";

const TitleContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 600;
  text-align: left;
  padding: 8px 0;
  margin: 0;
  border-bottom: 2px solid #e0e0e0;
`;

const ReservationTitle = () => {
  return (
    <TitleContainer>
      <Title>Reservas</Title>
    </TitleContainer>
  );
};

export default ReservationTitle;
