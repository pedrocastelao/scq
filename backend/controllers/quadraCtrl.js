const Quadra = require("../models/quadra");
const { Util } = require("../config/util");

// Função para cadastrar uma quadra
const quadraCtrl = {
  newQuadra: async (req, res) => {
    const { tipo, localizacao, preco } = req.body;
    try {
      const novaQuadra = await Quadra.createQuadra(tipo, localizacao, preco);
      res.status(201).json(novaQuadra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateQuadra: async (req, res) => {
    const { id } = req.params;
    const { tipo, localizacao, preco } = req.body;

    try {
      const quadraAtualizada = await Quadra.updateQuadra(
        id,
        tipo,
        localizacao,
        preco
      );
      res.json(quadraAtualizada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delQuadra: async (req, res) => {
    const { id } = req.params;
    try {
      await Quadra.deleteQuadra(id);
      res.sendStatus(204); // Indica que a exclusão foi bem-sucedida
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllQuadras: async (req, res) => {
    try {
      const listQuadras = await Quadra.listarQuadras();
      const quadraFormatar = listQuadras.map((quadra) => ({
        ...quadra.toJSON(),
        preco: Util.formatarValor(quadra.preco),
      }));
      res.status(200).json(quadraFormatar);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { quadraCtrl };
