const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middlewares/authMiddleware');

// CREATE
router.post('/', authMiddleware, clientController.createClient);

// READ ALL
router.get('/', authMiddleware, clientController.getClients);

// READ ONE
router.get('/:id', authMiddleware, clientController.getClientById);

// UPDATE
router.put('/:id', authMiddleware, clientController.updateClient);

// DELETE
router.delete('/:id', authMiddleware, clientController.deleteClient);

module.exports = router;
