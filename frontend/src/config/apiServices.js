import api from "./axiosConfig";

export const newReserva = async (dadosReserva) => {
  return await api.post(`/reserva/nova`, dadosReserva);
};

export const getReservas = async () => {
  const respose = await api.get(`/reservas`);
  return respose;
};

export const getQuadras = async () => {
  return await api.get(`/quadras`);
};

export const getHorarios = async (dataInicio, dataFim) => {
  return await api.get(`/reserva/horarios/${dataInicio}/${dataFim}`);
};
