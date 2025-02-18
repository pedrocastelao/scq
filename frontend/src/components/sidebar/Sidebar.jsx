// src/components/Sidebar/Sidebar.jsx
import React from "react";
import styled from "styled-components";
import { Menu, ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";
import useSidebarStore from "../../stores/sidebarStore";
import SidebarMenu from "./SidebarMenu";
import UserProfile from "./UserProfile";

const SidebarContainer = styled.div`
  width: ${({ isCollapsed }) => (isCollapsed ? "64px" : "240px")};
  height: 100vh;
  background: ${({ theme }) => theme.sidebar.background};
  color: ${({ theme }) => theme.sidebar.text};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ isCollapsed }) =>
    isCollapsed ? "center" : "space-between"};
  margin-bottom: 2rem;
`;

const Logo = styled.h4`
  margin: 0;
  display: ${({ isCollapsed }) => (isCollapsed ? "none" : "block")};
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.sidebar.text};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.sidebar.hoverBackground};
    border-radius: 4px;
  }
`;

const Sidebar = () => {
  const { isCollapsed, isDarkMode, toggleCollapse, toggleDarkMode } =
    useSidebarStore();

  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <TopSection isCollapsed={isCollapsed}>
        <Logo isCollapsed={isCollapsed}>Menu</Logo>
        <ControlButton onClick={toggleCollapse}>
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </ControlButton>
      </TopSection>

      <SidebarMenu isCollapsed={isCollapsed} />

      <div style={{ marginTop: "auto" }}>
        <ControlButton onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </ControlButton>
        <UserProfile isCollapsed={isCollapsed} />
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
