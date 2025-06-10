const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, movementController.createMovement);
router.get('/', authMiddleware, movementController.getAllMovements);

module.exports = router;
