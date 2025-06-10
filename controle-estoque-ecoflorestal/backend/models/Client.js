const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  phone: String,
  email: String
});

module.exports = mongoose.model('Client', ClientSchema);
