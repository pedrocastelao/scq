import api from "./axiosConfig";

export const reservaService = {
  createReserva: (dadosReserva) => api.post(`/reserva/nova`, dadosReserva),
  getReservas: () => api.get(`/reservas`),
  getHorariosDisponiveis: (data, quadraId) => api.get(`/reserva/horarios/${data}/${quadraId}`),
  cancelarReserva: (id) => api.put(`/reserva/${id}/cancelar`), // <-- ADICIONE ESTA LINHA
};

export const quadrasService = {
  getQuadras: () => api.get(`/quadras`),
};

export const authService = {
  authenticateUser: (email, password) =>
    api.post(`/login`, { email, password }),
  register: (dadosUser) => api.post(`/user/novo`, dadosUser),
};
