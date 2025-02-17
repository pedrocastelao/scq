import React, { useState } from "react";
import Reserva from "../components/Reserva";

const ReservaPage = ({ reservante }) => {
  return (
    <div>
      <h1>Detalhes da Reserva</h1>
      <Reserva reservante={reservante} />
    </div>
  );
};

export default ReservaPage;
