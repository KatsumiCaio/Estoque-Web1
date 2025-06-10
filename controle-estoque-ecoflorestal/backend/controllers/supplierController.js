const Supplier = require('../models/Supplier');

// CREATE
exports.createSupplier = async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar fornecedor', error });
  }
};

// READ ALL
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar fornecedores', error });
  }
};

// READ ONE
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Fornecedor não encontrado' });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar fornecedor', error });
  }
};

// UPDATE
exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!supplier) return res.status(404).json({ message: 'Fornecedor não encontrado' });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar fornecedor', error });
  }
};

// DELETE
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Fornecedor não encontrado' });
    res.json({ message: 'Fornecedor removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover fornecedor', error });
  }
};
