import React, { useState } from "react";
import { Pagination, Modal, Button } from "antd";
import "./css/tabelaReserva.css";

const TabelaReservas = ({ reservas, editarReserva, excluirReserva }) => {
  // Estado para controlar a página atual e o número de itens por página
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);

  // Calcula o número total de páginas
  const totalPaginas = Math.ceil(reservas.length / itensPorPagina);

  // Função para controlar a mudança de página
  const handlePaginacaoChange = (pagina) => {
    setPaginaAtual(pagina);
  };

  // Calcula o índice do primeiro e último item a serem exibidos na página atual
  const indicePrimeiroItem = (paginaAtual - 1) * itensPorPagina;
  const indiceUltimoItem = paginaAtual * itensPorPagina;

  // Filtra as reservas a serem exibidas na página atual
  const reservasPaginadas = reservas.slice(
    indicePrimeiroItem,
    indiceUltimoItem
  );

  // Função para abrir a modal com os detalhes da reserva
  const mostrarDetalhes = (reserva) => {
    setReservaSelecionada(reserva);
    setModalVisivel(true);
  };

  // Função para fechar a modal
  const fecharModal = () => {
    setModalVisivel(false);
    setReservaSelecionada(null);
  };

  return (
    <div id="tabela-container" style={{ width: "120%" }}>
      {mostrarFiltros && (
        <div id="filtros-dropdown">
          {/* Conteúdo dos filtros aqui */}
          <h4>Filtros</h4>
          <label>Data:</label>
          <input type="date" className="form-control mb-2" />
          <label>Localização:</label>
          <input type="text" className="form-control mb-2" />
          <button className="btn btn-primary btn-sm">Aplicar</button>
        </div>
      )}

      <table id="tabela-reservas" className="table mx-auto">
        {/* Cabeçalho da tabela */}
        <thead>
          <tr>
            <th scope="col">Quadra</th>
            <th scope="col">Localização</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        {/* Corpo da tabela */}
        <tbody>
          {reservasPaginadas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.quadra.tipo}</td>
              <td>{reserva.quadra.localizacao}</td>
              <td>
                {/* Botões de ação para editar e excluir */}
                <button
                  className="btn btn-sm btn-outline-primary mr-2"
                  onClick={() => mostrarDetalhes(reserva)}
                >
                  Detalhes
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => excluirReserva(reserva.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Controles de paginação */}
      <div className="text-center">
        <Pagination
          current={paginaAtual}
          total={reservas.length}
          pageSize={itensPorPagina}
          onChange={handlePaginacaoChange}
        />
      </div>

      {/* Modal para exibir os detalhes da reserva */}
      <Modal
        style={{
          fontSize: "21px",
          lineHeight: "31.5px",
          color: "#000000",
          letterSpacing: "normal",
          textAlign: "center",
        }}
        title="Detalhes da Reserva"
        visible={modalVisivel}
        onCancel={fecharModal}
        footer={[
          <Button key="fechar" onClick={fecharModal}>
            Fechar
          </Button>,
        ]}
      >
        <hr />
        {reservaSelecionada && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "start",
              fontSize: "16px",
              lineHeight: "28px",
            }}
          >
            <div>
              <p>
                <strong>Data:</strong> {reservaSelecionada.data}
              </p>
              <hr />
              <p>
                <strong>Horário Início:</strong> {reservaSelecionada.horaInicio}
              </p>
              <hr />
              <p>
                <strong>Horário Fim:</strong> {reservaSelecionada.horaFim}
              </p>
            </div>
            <div>
              <p>
                <strong>Quadra:</strong> {reservaSelecionada.quadra.tipo}
              </p>
              <hr />
              <p>
                <strong>Localização:</strong>{" "}
                {reservaSelecionada.quadra.localizacao}
              </p>
              <hr />
              <p>
                <strong>Preço:</strong> {reservaSelecionada.quadra.preco}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TabelaReservas;
