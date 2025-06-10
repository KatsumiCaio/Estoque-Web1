const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: String,
  quantity: { type: Number, default: 0 },  // Estoque atual
  unitPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);
