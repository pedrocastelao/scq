// ReservasPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import ReservaCard from "./ReservaCard";
import Filtros from "./Filtros";
import Legenda from "./Legenda";
import Paginacao from "./Paginacao";
import { getReservas } from "../config/apiServices";
import ReservationTitle from "./ReservationTitle";
import WeekView from "./WeekView";
import { parseISO, isSameWeek } from "date-fns";

const ReservasContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

const ReservasPage = () => {
  const [reservas, setReservas] = useState([]); // Inicializa com uma lista vazia
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

  return (
    <ReservasContainer>
      <ReservationTitle />
      <Legenda />
      <Filtros filtros={filtros} setFiltros={setFiltros} />
      <WeekView
        currentDate={currentDate}
        onWeekChange={handleWeekChange}
        reservasPaginadas={reservasPaginadas}
      />

      {/* <CardsGrid>
        {reservasPaginadas.map((reserva) => (
          <ReservaCard key={reserva.id} reserva={reserva} />
        ))}
      </CardsGrid> */}
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
