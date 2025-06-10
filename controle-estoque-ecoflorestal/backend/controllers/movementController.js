const Movement = require('../models/movement');
const Product = require('../models/product');

// Criar nova movimentação
exports.createMovement = async (req, res) => {
  try {
    const { productId, type, quantity, notes } = req.body;

    if (!productId || !type || !quantity) {
      return res.status(400).json({ message: 'Dados incompletos.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    if (type === 'entrada') {
      product.quantity += quantity;
    } else if (type === 'saida') {
      if (product.quantity < quantity) {
        return res.status(400).json({ message: 'Estoque insuficiente para saída.' });
      }
      product.quantity -= quantity;
    } else {
      return res.status(400).json({ message: 'Tipo de operação inválido.' });
    }

    await product.save();

    const movement = new Movement({
      product: productId,
      type,
      quantity,
      notes
    });

    await movement.save();
    res.status(201).json(movement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar movimentação.' });
  }
};

// Listar movimentações
exports.getAllMovements = async (req, res) => {
  try {
    const movements = await Movement.find().populate('product', 'name').sort({ date: -1 });
    res.json(movements);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar movimentações.' });
  }
};
