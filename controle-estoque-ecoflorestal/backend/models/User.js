const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// 1. Cria o schema primeiro
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// 2. Aplica o "pre save" depois de declarar o schema
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// 3. Exporta o modelo com verificação contra redefinição
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
