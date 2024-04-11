import Pagamento from "./model/Pagamento.js";

//classe ira manipular/controlar a entidade Pagamento
class PagamentoCTRL {
  gravar(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const id = dados.id;
      const valor = dados.valor;
      const status = dados.status;

      if ((valor, status)) {
        const pg = new Pagamento(id, valor, status);

        pg.gravar()
          .then(() => {
            res.status(200).json({
              status: true,
              messagem: "Pagamento gravado com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({ status: false, messagem: `CPF ja` });
          });
      } else {
        res.status(400).json({
          status: false,
          messagem: "Informe todos os dados dos Pagamentos!",
        });
      }
    } else {
      res.status(400).json({
        statu: false,
        messagem: "Método não Permitido",
      });
    }
  }

  atualizar(req, res) {
    res.type("application/json");
    if (req.method === "PUT" && req.is("application/json")) {
      const dados = req.body;
      const nome = dados.nome;
      const sobrenome = dados.sobrenome;
      const rg = dados.rg;
      const id = dados.id;
      const telefone = dados.telefone;
      const datanascimento = dados.datanascimento;
      const cep = dados.cep;
      const estado = dados.estado;
      const cidade = dados.cidade;
      const endereco = dados.endereco;
      const checkin = dados.checkin;
      const checkout = dados.checkout;

      if (
        (nome,
        sobrenome,
        rg,
        id,
        telefone,
        datanascimento,
        cep,
        estado,
        cidade,
        endereco,
        checkin,
        checkout)
      ) {
        const pg = new Pagamento(
          nome,
          sobrenome,
          rg,
          id,
          telefone,
          datanascimento,
          cep,
          estado,
          cidade,
          endereco,
          checkin,
          checkout
        );

        pg.atualizar()
          .then(() => {
            res
              .status(200)
              .json({
                status: true,
                messagem: "Pagamento gravado com sucesso!",
              });
          })
          .catch((erro) => {
            res.status(500).json({ status: false, messagem: erro.message });
          });
      } else {
        res.status(400).json({
          status: false,
          messagem: "Informe todos os dados dos Pagamentos!",
        });
      }
    } else {
      res.status(400).json({
        statu: false,
        messagem: "Método não Permitido",
      });
    }
  }

  excluir(req, res) {
    res.type("application/json");

    if (req.method === "DELETE" && req.is("application/json")) {
      const dados = req.body;
      const id = dados.id;

      if (id) {
        const pg = new Pagamento(id);
        pg.id = id;
        pg.removerBD(id)
          .then(() => {
            res.status(200).json({
              status: true,
              messagem: "Pagamento excluído com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({ status: false, messagem: erro.message });
          });
      } else {
        res.status(400).json({
          status: false,
          messagem: "Informe o ID do Pagamentos!",
        });
      }
    } else {
      res.status(400).json({
        statu: false,
        messagem: "Método não Permitido/JSON",
      });
    }
  }

  consultar(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const pg = new Pagamento();

      pg.consultar("")
        .then((pg) => {
          res.status(200).json(pg);
        })
        .catch((erro) => {
          res.status(500).json({ status: false, messagem: erro.message });
        });
    } else {
      res.status(400).json({
        status: false,
        messagem: "Método nao Permitido!",
      });
    }
  }

  consultarID(req, res) {
    res.type("application/json");
    const id = req.params["id"];

    if (req.method === "GET") {
      const pg = new Pagamento();

      pg.consultarID(id)
        .then((pg) => {
          res.status(200).json({ pg });
        })
        .catch((erro) => {
          res.status(500).json({ status: false, messagem: erro.message });
        });
    } else {
      res.status(400).json({
        status: false,
        messagem: "Método nao Permitido!",
      });
    }
  }
}

export default PagamentoCTRL;
