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

  formatardata(date) {
    const meses = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    let data = new Date(date);
    let dataFormatada =
      data.getDate() + " " + meses[data.getMonth()] + " " + data.getFullYear();
    console.log("Formatada", dataFormatada);
    return dataFormatada;
    //saída: 31 Dez 2019},
  },
};
module.exports = { Util };
