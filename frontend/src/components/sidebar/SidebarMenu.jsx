// src/components/Sidebar/SidebarMenu.jsx
import React from "react";
import styled from "styled-components";
import { Calendar, FileText, Users, Settings } from "lucide-react";
import useSidebarStore from "../../stores/sidebarStore";

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
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
`;

const menuItems = [
  {
    id: "appointments",
    icon: <Calendar size={20} />,
    label: "Agendamentos",
  },
  {
    id: "reports",
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
  const { currentView, setCurrentView } = useSidebarStore();

  return (
    <div>
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          active={currentView === item.id}
          onClick={() => setCurrentView(item.id)}
        >
          {item.icon}
          <MenuText isCollapsed={isCollapsed}>{item.label}</MenuText>
        </MenuItem>
      ))}
    </div>
  );
};

export default SidebarMenu;
