const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const authMiddleware = require('../middlewares/authMiddleware');

// CREATE
router.post('/', authMiddleware, supplierController.createSupplier);

// READ ALL
router.get('/', authMiddleware, supplierController.getSuppliers);

// READ ONE
router.get('/:id', authMiddleware, supplierController.getSupplierById);

// UPDATE
router.put('/:id', authMiddleware, supplierController.updateSupplier);

// DELETE
router.delete('/:id', authMiddleware, supplierController.deleteSupplier);

module.exports = router;
