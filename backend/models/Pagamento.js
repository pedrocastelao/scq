import PagamentoBD from "./persistence/PagamentoBD.js";

class Pagamento {
  #id;
  #valor;
  #status;

  constructor(id, valor, status) {
    this.#id = id;
    this.#valor = valor;
    this.#status = status;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = novoId;
  }

  get valor() {
    return this.#valor;
  }

  set valor(novoValor) {
    this.#valor = novoValor;
  }

  get status() {
    return this.#status;
  }

  set status(novoStatus) {
    this.#status = novoStatus;
  }

  //Json
  toJSON() {
    return {
      pagamento_id: this.#id,
      pagamento_valor: this.#valor,
      pagamento_status: this.#status,
    };
  }

  async gravar() {
    const pagamentoBD = new PagamentoBD();

    await pagamentoBD.incluir(this);
  }

  async atualizar() {
    const pagamentoBD = new PagamentoBD();

    await pagamentoBD.alterar(this);
  }

  async removerBD() {
    const pagamentoBD = new PagamentoBD();

    await pagamentoBD.excluir(this);
  }

  async consultar() {
    const pagamentoBD = new PagamentoBD();

    const pagamentos = await pagamentoBD.consultar();
    return pagamentos;
  }

  async consultarID(id) {
    const pagamentoBD = new PagamentoBD();

    const pagamentos = await pagamentoBD.consultarID(id);
    return pagamentos;
  }
}

export default Pagamento;
