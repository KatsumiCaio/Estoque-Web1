const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/products', reportController.productsReport);
router.get('/movements', reportController.movementsReport);
router.get('/suppliers', reportController.suppliersReport);
router.get('/clients', reportController.clientsReport);

module.exports = router;
