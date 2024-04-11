const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../persistence/Conexao");

const Quadra = sequelize.define("quadras", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(), // Gera um UUID padrão ao criar um novo registro
    primaryKey: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  localizacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Método para inserir uma nova quadra no banco de dados
Quadra.createQuadra = async function (tipo, localizacao, preco) {
  try {
    const quadra = await Quadra.create({ tipo, localizacao, preco });
    return quadra;
  } catch (error) {
    throw new Error("Erro ao criar uma nova quadra: " + error.message);
  }
};

// Método para atualizar uma quadra existente no banco de dados
Quadra.updateQuadra = async function (id, tipo, localizacao, preco) {
  try {
    const quadra = await Quadra.findByPk(id);
    if (!quadra) {
      throw new Error("Quadra não encontrada.");
    }
    await quadra.update({ tipo, localizacao, preco });
    return quadra;
  } catch (error) {
    throw new Error("Erro ao atualizar a quadra: " + error.message);
  }
};

// Método para excluir uma quadra do banco de dados
Quadra.deleteQuadra = async function (id) {
  try {
    const quadra = await Quadra.findByPk(id);
    if (!quadra) {
      throw new Error("Quadra não encontrada.");
    }
    await quadra.destroy();
    return true; // Indica que a exclusão foi bem-sucedida
  } catch (error) {
    throw new Error("Erro ao excluir a quadra: " + error.message);
  }
};

// Método para listar todas as quadras
Quadra.listarQuadras = async function () {
  try {
    const quadras = await Quadra.findAll();
    //console.log("entrou aqui");
    return quadras;
  } catch (error) {
    throw new Error("Erro ao listar as quadras: " + error.message);
  }
};

Quadra.sync({ force: false })
  .then(() => {
    console.log("Modelo Quadra sincronizado com o banco de dados.");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o modelo Quadra:", error);
  });

module.exports = Quadra;
