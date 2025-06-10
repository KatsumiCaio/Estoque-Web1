const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // <-- Verifique se o caminho está certo

router.post('/register', authController.register); // <-- Aqui deve ser uma função

module.exports = router;
