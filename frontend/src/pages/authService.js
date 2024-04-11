import api from "./api";

const authService = {
  // Função para fazer login
  fazerLogin: async (email, senha) => {
    try {
      const response = await api.post("login", { email, senha });
      const { cliente, token } = response.data;
      console.log(cliente, token);

      // Armazene o token no localStorage ou nos cookies
      localStorage.setItem("token", token);

      // Retorne os dados do cliente
      return cliente;
    } catch (error) {
      //console.error("Erro ao fazer login:", error);
      throw new Error("Credenciais inválidas");
    }
  },

  // Função para fazer logout
  fazerLogout: () => {
    // Remova o token do localStorage ou dos cookies
    localStorage.removeItem("token");
  },

  // Função para verificar se o usuário está autenticado
  isAutenticado: () => {
    // Verifique se o token está presente
    return localStorage.getItem("token") !== null;
  },

  // Função para obter o token de autenticação
  getToken: () => {
    return localStorage.getItem("token");
  },
};

export default authService;
