// ReservasPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReservaCard from "./ReservaCard";
import Filtros from "./Filtros";
import Legenda from "./Legenda";
import Paginacao from "./Paginacao";
import { getReservas } from "../config/apiServices";

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
  const [filtros, setFiltros] = useState({
    data: null,
    mostrarVencidas: false,
    mostrarCanceladas: false,
  });
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 9;
  const [filtrosAplicados, setFiltrosAplicados] = useState(false);

  const [reservas, setReservas] = useState([]); // Inicializa com uma lista vazia

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

  // Lógica de filtragem
  const reservasFiltradas = reservas.filter((reserva) => {
    if (filtros.data && !reserva.dataInicio.includes(filtros.data))
      return false;
    if (!filtros.mostrarVencidas && reserva.status === "VENCIDA") return false;
    if (!filtros.mostrarCanceladas && reserva.status === "CANCELADA")
      return false;
    return true;
  });

  // Lógica de paginação
  const indexUltimoItem = paginaAtual * itensPorPagina;
  const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
  const reservasPaginadas = reservasFiltradas.slice(
    indexPrimeiroItem,
    indexUltimoItem
  );

  return (
    <ReservasContainer>
      <Filtros filtros={filtros} setFiltros={setFiltros} />
      <Legenda />
      <CardsGrid>
        {reservasPaginadas.map((reserva) => (
          <ReservaCard key={reserva.id} reserva={reserva} />
        ))}
      </CardsGrid>
      <Paginacao
        totalItems={reservas.length}
        itensPorPagina={9}
        paginaAtual={paginaAtual}
        setPaginaAtual={setPaginaAtual}
        onFiltroAplicado={filtrosAplicados}
      />
    </ReservasContainer>
  );
};

export default ReservasPage;
