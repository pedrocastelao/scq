import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, Context } from "../context/authContext";

import Login from "../pages/login";
import Home from "../pages/home";
import Reserva from "../pages/reserva";

function PrivateRoute({ isPrivate, children }) {
  const { authenticated } = useContext(Context);
  console.log("privada, autenticado", isPrivate, authenticated);
  if (isPrivate && !authenticated) {
    console.log("entrou aqui tambem ");
    return <Navigate to="/login" />;
  }

  return children;
}

const Rotas = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            isPrivate
            path="/reserva"
            element={
              <PrivateRoute isPrivate>
                <Reserva />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Rotas;
