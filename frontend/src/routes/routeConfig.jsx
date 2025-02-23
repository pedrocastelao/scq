// src/routes/routeConfig.js
import ReportsView from "../components/ReportsView";
import ReservasPage from "../components/ReservasPage";
// import ProfilePage from "../components/ProfilePage";
// import SettingsPage from "../components/SettingsPage";

export const routes = [
  {
    path: "reservas",
    element: ReservasPage,
    title: "Reservas",
    icon: "calendar", // if you want to use icons in the sidebar
  },

  {
    path: "relatorios",
    element: ReportsView,
    title: "Relatórios",
    icon: "filetext", // if you want to use icons in the sidebar
  },
  // Add more routes as needed
];
