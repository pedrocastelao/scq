import React, { useState, useEffect } from "react";
import { Pagination, Form } from "react-bootstrap";
import styled from "styled-components";

const PaginacaoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;

  .pagination {
    margin: 0;
    .page-item {
      .page-link {
        color: #0d6efd;
        border: 1px solid #dee2e6;
        padding: 0.5rem 0.75rem;
        transition: all 0.3s ease;

        &:hover {
          background-color: #e9ecef;
          border-color: #dee2e6;
          color: #0d6efd;
        }
      }

      &.active .page-link {
        background-color: #0d6efd;
        border-color: #0d6efd;
        color: white;

        &:hover {
          background-color: #0b5ed7;
          border-color: #0a58ca;
          color: white;
        }
      }

      &.disabled .page-link {
        color: #6c757d;
        pointer-events: none;
        background-color: #fff;
        border-color: #dee2e6;
      }
    }
  }
`;

const PageSelect = styled(Form.Select)`
  width: 80px;
  display: inline-block;
  margin-left: 0.5rem;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
  font-size: 0.875rem;
`;

const AnimatedContent = styled.div`
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.animating ? 0.5 : 1)};
`;

const Paginacao = ({
  totalItems,
  itensPorPagina = 8,
  paginaAtual,
  setPaginaAtual,
  onFiltroAplicado,
}) => {
  const [animating, setAnimating] = useState(false);
  const totalPaginas = Math.ceil(totalItems / itensPorPagina);

  useEffect(() => {
    if (onFiltroAplicado) {
      setPaginaAtual(1);
    }
  }, [onFiltroAplicado, setPaginaAtual]);

  const handlePageChange = (novaPagina) => {
    setAnimating(true);
    setPaginaAtual(novaPagina);
    setTimeout(() => setAnimating(false), 300);
  };

  const getPaginasVisiveis = () => {
    const paginas = [];
    const maxPaginas = 5;

    let inicio = Math.max(1, paginaAtual - Math.floor(maxPaginas / 2));
    let fim = Math.min(totalPaginas, inicio + maxPaginas - 1);

    if (fim - inicio + 1 < maxPaginas) {
      inicio = Math.max(1, fim - maxPaginas + 1);
    }

    for (let i = inicio; i <= fim; i++) {
      paginas.push(i);
    }

    return paginas;
  };

  return (
    <PaginacaoContainer>
      <AnimatedContent animating={animating}>
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          />

          {getPaginasVisiveis().map((pagina) => (
            <Pagination.Item
              key={pagina}
              active={pagina === paginaAtual}
              onClick={() => handlePageChange(pagina)}
            >
              {pagina}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => handlePageChange(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          />
        </Pagination>
      </AnimatedContent>

      {/* <SelectContainer>
        <span>Ir para página:</span>
        <PageSelect
          value={paginaAtual}
          onChange={(e) => handlePageChange(Number(e.target.value))}
        >
          {[...Array(totalPaginas)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </PageSelect>
      </SelectContainer> */}
    </PaginacaoContainer>
  );
};

export default Paginacao;
