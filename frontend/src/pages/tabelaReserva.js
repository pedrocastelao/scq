import React, { useState } from "react";
import "./tabelaReserva.css";

const TabelaReservas = ({ reservas, editarReserva, excluirReserva }) => {
  // Estado para controlar a página atual e o número de itens por página
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  // Calcula o número total de páginas
  const totalPaginas = Math.ceil(reservas.length / itensPorPagina);

  // Calcula o índice do primeiro e último item a serem exibidos na página atual
  const indicePrimeiroItem = (paginaAtual - 1) * itensPorPagina;
  const indiceUltimoItem = paginaAtual * itensPorPagina;

  // Filtra as reservas a serem exibidas na página atual
  const reservasPaginadas = reservas.slice(
    indicePrimeiroItem,
    indiceUltimoItem
  );

  // Função para mudar para a próxima página
  const proximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  // Função para mudar para a página anterior
  const paginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  return (
    <>
      <table className="table mx-auto">
        {/* Cabeçalho da tabela */}
        <thead>
          <tr>
            <th scope="col" className="text-center">
              Data
            </th>
            <th scope="col" className="text-center">
              Horário Início
            </th>
            <th scope="col" className="text-center">
              Horário Fim
            </th>
            <th scope="col" className="text-center">
              Quadra
            </th>
            <th scope="col" className="text-center">
              Localização
            </th>
            <th scope="col" className="text-center">
              Preço
            </th>
            <th scope="col" className="text-center">
              Ações
            </th>
          </tr>
        </thead>
        {/* Corpo da tabela */}
        <tbody>
          {reservasPaginadas.map((reserva) => (
            <tr key={reserva.id}>
              <td className="text-center">{reserva.data}</td>
              <td className="text-center">{reserva.horaInicio}</td>
              <td className="text-center">{reserva.horaFim}</td>
              <td className="text-center">{reserva.quadra.tipo}</td>
              <td className="text-center">{reserva.quadra.localizacao}</td>
              <td className="text-center">{reserva.quadra.preco}</td>
              <td className="text-center">
                {/* Botões de ação para editar e excluir */}
                <button
                  className="btn"
                  onClick={() => editarReserva(reserva.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => excluirReserva(reserva.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Controles de paginação e quantidade de páginas */}
      <div className="text-center">
        <button className="btn-custom" onClick={paginaAnterior}>
          Anterior
        </button>{" "}
        {paginaAtual} de {totalPaginas}{" "}
        <button className="btn-custom" onClick={proximaPagina}>
          Proxima
        </button>
      </div>
    </>
  );
};

export default TabelaReservas;
