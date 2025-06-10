const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  nome: String,
  cpf: String,
  telefone: String,
  email: String,
});

module.exports = mongoose.models.Client || mongoose.model('Client', clientSchema);
