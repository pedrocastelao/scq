// src/components/Sidebar/SidebarMenu.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Calendar, FileText, Users, Settings } from "lucide-react";
import useSidebarStore from "../../stores/sidebarStore";

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ isCollapsed }) =>
    isCollapsed ? "center" : "flex-start"};
  padding: 0.75rem ${({ isCollapsed }) => (isCollapsed ? "0.5rem" : "1rem")};
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  background: ${({ active, theme }) =>
    active ? theme.sidebar.activeBackground : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.sidebar.activeText : theme.sidebar.text};

  &:hover {
    background: ${({ theme }) => theme.sidebar.hoverBackground};
  }
`;

const MenuText = styled.span`
  margin-left: 0.75rem;
  display: ${({ isCollapsed }) => (isCollapsed ? "none" : "block")};
  white-space: nowrap;
`;

const IconWrapper = styled.div`
  min-width: ${({ isCollapsed }) => (isCollapsed ? "auto" : "20px")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const menuItems = [
  {
    id: "reservas", // Alterado para match com as rotas
    path: "/reservas", // Adicionado path
    icon: <Calendar size={20} />,
    label: "Agendamentos",
  },
  {
    id: "relatorios", // Alterado para match com as rotas
    path: "/relatorios", // Adicionado path
    icon: <FileText size={20} />,
    label: "Relatórios",
  },
  {
    id: "users",
    icon: <Users size={20} />,
    label: "Usuários",
  },
  {
    id: "settings",
    icon: <Settings size={20} />,
    label: "Configurações",
  },
];

const SidebarMenu = ({ isCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentView, setCurrentView } = useSidebarStore();

  const handleMenuClick = (path, id) => {
    setCurrentView(id);
    navigate(path);
  };

  return (
    <div>
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          active={location.pathname === item.path}
          onClick={() => handleMenuClick(item.path, item.id)}
          isCollapsed={isCollapsed}
        >
          <IconWrapper isCollapsed={isCollapsed}>{item.icon}</IconWrapper>
          <MenuText isCollapsed={isCollapsed}>{item.label}</MenuText>
        </MenuItem>
      ))}
    </div>
  );
};

export default SidebarMenu;
