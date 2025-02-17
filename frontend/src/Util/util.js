const STATUS = Object.freeze({
  ocioso: "OCISO",
  sucesso: "SUCESSO",
  erro: "ERRO",
});

const mascaraCpf = (cpf) => {
  return cpf
    .replace(/\D/g, "") // Remove tudo o que não for número
    .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o ponto após os 3 primeiros números
    .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o ponto após os próximos 3 números
    .replace(/(\d{3})(\d)/, "$1-$2") // Adiciona o hífen antes dos 2 últimos números
    .substring(0, 14); // Limita o tamanho do CPF para 14 caracteres
};

const calcularIdade = (dataNascimento) => {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();

  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
};

export { STATUS, mascaraCpf, calcularIdade };
