// src/components/Sidebar/UserProfile.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { User, Key, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.sidebar.avatarBackground};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const UserDetails = styled.div`
  margin-left: 0.75rem;
  overflow: hidden;
`;

const UserName = styled.div`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserRole = styled.small`
  color: ${({ theme }) => theme.sidebar.textSecondary};
  display: block;
`;

const UserProfile = ({ isCollapsed }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout(); // Call the logout function from AuthContext
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleChangePassword = () => {
    // Implementar lógica de alteração de senha
    navigate("/change-password");
  };

  return (
    <ProfileContainer>
      <UserInfo isCollapsed={isCollapsed}>
        <UserAvatar>
          {user?.avatar ? (
            <img src={user.avatar} alt={user.nome} />
          ) : (
            <User size={24} />
          )}
        </UserAvatar>
        <UserDetails>
          <UserName>{user?.nome || "Usuário"}</UserName>
          <UserRole>{user?.role || "Sem cargo"}</UserRole>
        </UserDetails>
      </UserInfo>

      <UserActions isCollapsed={isCollapsed}>
        <ActionButton
          onClick={handleChangePassword}
          disabled={isLoggingOut}
          title="Alterar senha"
        >
          <Key size={16} />
          {!isCollapsed && <span style={{ marginLeft: "0.5rem" }}>Senha</span>}
        </ActionButton>
        <ActionButton
          onClick={handleLogout}
          disabled={isLoggingOut}
          title="Sair"
        >
          <LogOut size={16} />
          {!isCollapsed && (
            <span style={{ marginLeft: "0.5rem" }}>
              {isLoggingOut ? "Saindo..." : "Sair"}
            </span>
          )}
        </ActionButton>
      </UserActions>
    </ProfileContainer>
  );
};

export default UserProfile;
