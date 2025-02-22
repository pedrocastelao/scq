// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginScreen from "./components/LoginScreen";
import NotFoundPage from "./components/NotFoundPage";
import { routes } from "./routes/routeConfig";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginScreen />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AuthenticatedLayout />
              </ProtectedRoute>
            }
          >
            {/* Default redirect */}
            <Route index element={<Navigate to="/login" replace />} />

            {/* Dynamic routes from configuration */}
            {routes.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}

            {/* 404 page */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
