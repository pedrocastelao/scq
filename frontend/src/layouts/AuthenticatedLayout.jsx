// src/layouts/AuthenticatedLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/Footer";
import useSidebarStore from "../stores/sidebarStore";
import { lightTheme, darkTheme } from "../themes";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const PageContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const AuthenticatedLayout = () => {
  const { isDarkMode } = useSidebarStore();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : darkTheme}>
      <LayoutContainer>
        <MainContent>
          <Sidebar />
          <PageContent>
            <Outlet />
          </PageContent>
        </MainContent>
        <Footer />
      </LayoutContainer>
    </ThemeProvider>
  );
};

export default AuthenticatedLayout;
