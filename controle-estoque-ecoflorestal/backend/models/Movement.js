const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  type: { type: String, enum: ['entrada', 'saida'], required: true },
  quantity: { type: Number, required: true },
  notes: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movement', movementSchema);
