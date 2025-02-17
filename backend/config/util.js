const parsePhoneNumber = require("libphonenumber-js");

const Util = {
  // Função para formatar o número de celular
  formatarNumeroCelular(celular) {
    const phoneNumber = parsePhoneNumber(celular, "BR");
    if (phoneNumber) {
      return phoneNumber.formatNational();
    } else {
      return celular; // Se a formatação falhar, retorna o número sem formatação
    }
  },
  // Função para formatar o CPF
  formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  },

  formatarValor(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  },

  ajustarParaGMT3(dataEmGMT) {
    const data = new Date(dataEmGMT); // Converte para objeto Date
    data.setDate(data.getDate() + 1); // Adiciona manualmente 1 dia para corrigir
    const formatador = new Intl.DateTimeFormat("pt-BR", {
      // timeZone: "America/Sao_Paulo", // Ajusta para GMT-3
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formatador.format(data);
  },
};
module.exports = { Util };
