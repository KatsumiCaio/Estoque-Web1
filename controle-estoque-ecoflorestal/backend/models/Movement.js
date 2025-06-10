const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
  produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantidade: Number,
  tipo: { type: String, enum: ['entrada', 'saida'] },
  data: { type: Date, default: Date.now },
  observacoes: String,
});

module.exports = mongoose.models.Movement || mongoose.model('Movement', movementSchema);
