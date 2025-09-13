// WeekView.jsx
import styled from "styled-components";
import {
  format,
  addWeeks,
  subWeeks,
  startOfWeek,
  addDays,
  isToday,
} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import ReservaCard from "./ReservaCard";

const WeekViewContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const NavigationButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #357abd;
  }
`;

const WeekInfo = styled.h3`
  margin: 0;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const Th = styled.th`
  padding: 12px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #dee2e6;
  text-align: center;
  ${({ isCurrentDay }) =>
    isCurrentDay &&
    `
    background-color: #e8f4ff;
    font-weight: bold;
  `}
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const WeekView = ({
  currentDate,
  onWeekChange,
  reservasPaginadas,
  setIsModalOpen,
  onCancelarReserva 
}) => {
  const handlePreviousWeek = () => {
    onWeekChange(subWeeks(currentDate, 1));
  };

  const handleNextWeek = () => {
    onWeekChange(addWeeks(currentDate, 1));
  };

  // Gera array com os dias da semana
  const getWeekDays = () => {
    const startDay = startOfWeek(currentDate, { weekStartsOn: 0 });
    return Array.from({ length: 7 }).map((_, index) =>
      addDays(startDay, index)
    );
  };

  // Formata o intervalo da semana
  const formatWeekInterval = (days) => {
    const firstDay = format(days[0], "d 'de' MMMM", { locale: ptBR });
    const lastDay = format(days[6], "d 'de' MMMM", { locale: ptBR });
    return `${firstDay} - ${lastDay}`;
  };

  const weekDays = getWeekDays();

  return (
    <>
      <WeekViewContainer>
        <Header>
          <NavigationButton onClick={handlePreviousWeek}>
            Semana Anterior
          </NavigationButton>
          <WeekInfo>{formatWeekInterval(weekDays)}</WeekInfo>
          <NavigationButton onClick={handleNextWeek}>
            Próxima Semana
          </NavigationButton>
        </Header>

        <Table>
          <thead>
            <tr>
              {weekDays.map((day) => (
                <Th key={day.toString()}>
                  {format(day, "EEEE", { locale: ptBR })}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {weekDays.map((day) => (
                <Td key={day.toString()} isCurrentDay={isToday(day)}>
                  {format(day, "d")}
                </Td>
              ))}
            </tr>
          </tbody>
        </Table>
      </WeekViewContainer>

      <CardsGrid>
        {reservasPaginadas.map((reserva, index) => (
          <ReservaCard
            key={reserva ? reserva.id : `new-reservation-${index}`}
            reserva={reserva}
            onNovaReserva={() => setIsModalOpen(true)}
             onCancelar={onCancelarReserva} 
          />
        ))}
      </CardsGrid>
    </>
  );
};

export default WeekView;
