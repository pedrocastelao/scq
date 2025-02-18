// src/App.jsx
import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./themes";
import Sidebar from "./components/sidebar/Sidebar";
import useSidebarStore from "./stores/sidebarStore";
import Footer from "./components/Footer";
import ReservasPage from "./components/ReservasPage";

const App = () => {
  const { isDarkMode } = useSidebarStore();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "2rem" }}>
          <ReservasPage />
        </main>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
