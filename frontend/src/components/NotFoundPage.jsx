// src/components/NotFoundPage.jsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.5;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  margin: 1rem 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 500px;
`;

const BackButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleGoHome = () => {
    navigate("/"); // Go to home page
  };

  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>Página Não Encontrada</ErrorTitle>
      <ErrorMessage>
        Desculpe, a página que você está procurando não existe ou foi movida.
      </ErrorMessage>
      <div style={{ display: "flex", gap: "1rem" }}>
        <BackButton onClick={handleGoBack}>Voltar</BackButton>
        <BackButton onClick={handleGoHome}>Ir para Home</BackButton>
      </div>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
