// ReservasPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Filtros from "./Filtros";
import Paginacao from "./Paginacao";
import { reservaService } from "../hooks/apiServices";
import ReservationTitle from "./ReservationTitle";
import WeekView from "./WeekView";
import { parseISO, isSameWeek } from "date-fns";
import NovaReservaModal from "./modal/NovaReservaModal";

const ReservasContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ReservasPage = () => {
  const { getReservas, createReserva } = reservaService;
  const [reservas, setReservas] = useState([]); // Inicializa com uma lista vazia
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtros, setFiltros] = useState({
    // data: null,
    mostrarVencidas: false,
    mostrarCanceladas: false,
  });

  const itensPorPagina = 8;

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

  const handleSubmitReserva = async (reservaData) => {
    // console.log(reservaData);

    try {
      await createReserva(reservaData);
      const response = await getReservas();
      setReservas(response.data);
      setIsModalOpen(false);
      // Refresh reservas list
      // await getReservas();
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
