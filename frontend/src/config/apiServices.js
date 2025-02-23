import api from "./axiosConfig";

export const createReserva = async (dadosReserva) => {
  return await api.post(`/reserva/nova`, dadosReserva);
};

export const getReservas = async () => {
  return await api.get(`/reservas`);
};

export const getQuadras = async () => {
  return await api.get(`/quadras`);
};

export const newUsers = async (dadosUser) => {
  return await api.post(`/user/novo`, dadosUser);
};

export const authenticateUser = async (email, password) => {
  return await api.post(`/login`, { email, password });
};
