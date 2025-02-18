// src/components/Sidebar/UserProfile.jsx
import React from "react";
import styled from "styled-components";
import { User, Key, LogOut } from "lucide-react";

const ProfileContainer = styled.div`
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.sidebar.border};
  margin-top: 1rem;
`;

const UserInfo = styled.div`
  display: ${({ isCollapsed }) => (isCollapsed ? "none" : "flex")};
  align-items: center;
  margin-bottom: 1rem;
`;

const UserActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: ${({ isCollapsed }) =>
    isCollapsed ? "center" : "flex-start"};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.sidebar.border};
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.sidebar.text};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.sidebar.hoverBackground};
  }
`;

const UserProfile = ({ isCollapsed }) => {
  const handleLogout = () => {
    // Implementar lógica de logout
  };

  const handleChangePassword = () => {
    // Implementar lógica de alteração de senha
  };

  return (
    <ProfileContainer>
      <UserInfo isCollapsed={isCollapsed}>
        <User size={24} />
        <div style={{ marginLeft: "0.75rem" }}>
          <div style={{ fontWeight: "bold" }}>João Silva</div>
          <small>Administrador</small>
        </div>
      </UserInfo>

      <UserActions isCollapsed={isCollapsed}>
        <ActionButton onClick={handleChangePassword}>
          <Key size={16} />
          {!isCollapsed && <span style={{ marginLeft: "0.5rem" }}>Senha</span>}
        </ActionButton>
        <ActionButton onClick={handleLogout}>
          <LogOut size={16} />
          {!isCollapsed && <span style={{ marginLeft: "0.5rem" }}>Sair</span>}
        </ActionButton>
      </UserActions>
    </ProfileContainer>
  );
};

export default UserProfile;
