const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nome: String,
  codigo: String,
  descricao: String,
  quantidade: Number,
  valorUnitario: Number,
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
