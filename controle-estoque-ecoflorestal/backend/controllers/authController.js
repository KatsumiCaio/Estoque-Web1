const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'seusegredo123'; // Use .env em produção!

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  // Lógica de criação do usuário
  res.status(201).json({ message: 'Usuário registrado com sucesso!' });
};

