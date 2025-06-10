const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  phone: String,
  email: String
});

module.exports = mongoose.model('Supplier', SupplierSchema);
