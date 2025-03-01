import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // URL da sua API
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador para adicionar o token de autenticação
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Adicione interceptador de resposta
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Tratamento para token expirado
      localStorage.removeItem("token");
      // Redirecionar para login se necessário
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
