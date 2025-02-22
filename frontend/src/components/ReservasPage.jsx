// ReservasPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import ReservaCard from "./ReservaCard";
import Filtros from "./Filtros";
import Legenda from "./Legenda";
import Paginacao from "./Paginacao";
import { createReserva, getReservas } from "../config/apiServices";
import ReservationTitle from "./ReservationTitle";
import WeekView from "./WeekView";
import { parseISO, isSameWeek } from "date-fns";
import NovaReservaModal from "./modal/NovaReservaModal";

const ReservasContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

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

// const CardsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 20px;
//   margin: 20px 0;
// `;

const ReservasPage = () => {
  const [reservas, setReservas] = useState([]); // Inicializa com uma lista vazia
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtros, setFiltros] = useState({
    // data: null,
    mostrarVencidas: false,
    mostrarCanceladas: false,
  });

  const itensPorPagina = 9;

  const [filtrosAplicados, setFiltrosAplicados] = useState(false);

  useEffect(() => {
    // Função para buscar as reservas do backend
    const fetchReservas = async () => {
      try {
        const response = await getReservas();
        setReservas(response.data); // Atualiza o estado com os dados das reservas
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  // // Para exibir os cards
  // const indiceInicial = (paginaAtual - 1) * 9;
  // const indiceFinal = indiceInicial + 9;
  // const cardsAtuais = reservas.slice(indiceInicial, indiceFinal);

  // Filtra as reservas da semana atual
  const reservasDaSemana = useMemo(() => {
    return reservas.filter((reserva) => {
      // Aplica os filtros existentes
      if (filtros.data && !reserva.dataInicio.includes(filtros.data))
        return false;
      if (!filtros.mostrarVencidas && reserva.status === "VENCIDA")
        return false;
      if (!filtros.mostrarCanceladas && reserva.status === "CANCELADA")
        return false;

      // Filtra por semana
      const dataReserva = parseISO(reserva.dataInicio);
      return isSameWeek(dataReserva, currentDate, { weekStartsOn: 0 });
    });
  }, [reservas, currentDate, filtros]);

  // Calcula as reservas paginadas
  const reservasPaginadas = useMemo(() => {
    const indexUltimoItem = paginaAtual * itensPorPagina;
    const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
    return reservasDaSemana.slice(indexPrimeiroItem, indexUltimoItem);
  }, [reservasDaSemana, paginaAtual]);

  const handleWeekChange = (novaData) => {
    setCurrentDate(novaData);
    setPaginaAtual(1); // Reset da paginação ao mudar de semana
  };

  const handleNovaReserva = () => {
    setIsModalOpen(true);
  };

  const handleSubmitReserva = async (reservaData) => {
    try {
      const response = await createReserva(reservaData);
      // Adiciona a nova reserva ao estado local
      setReservas(prevReservas => [...prevReservas, response.data]);
      setIsModalOpen(false);
      // Refresh reservas list
      getReservas();
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
    }
  };

  useEffect(() => {
    // Função para buscar as reservas do backend
    const fetchReservas = async () => {
      try {
        const response = await getReservas();
        setReservas(response.data); // Atualiza o estado com os dados das reservas
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  return (
    <ReservasContainer>
      <ReservationTitle />
      <Legenda />
      <Filtros filtros={filtros} setFiltros={setFiltros} />
      <WeekView
        currentDate={currentDate}
        onWeekChange={handleWeekChange}
        reservasPaginadas={[null, ...reservasPaginadas]} // Add null as first item
        setIsModalOpen={setIsModalOpen}
      />

      {/* <CardsGrid>
        {reservasPaginadas.map((reserva) => (
          <ReservaCard key={reserva.id} reserva={reserva} />
        ))}
      </CardsGrid> */}

      {/* Add Modal component here */}
      <NovaReservaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReserva}
      />

      <Paginacao
        totalItems={reservasDaSemana.length}
        itensPorPagina={itensPorPagina}
        paginaAtual={paginaAtual}
        setPaginaAtual={setPaginaAtual}
      />
    </ReservasContainer>
  );
};

export default ReservasPage;
