const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  nome: String,
  cnpj: String,
  telefone: String,
  email: String,
});

module.exports = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);
