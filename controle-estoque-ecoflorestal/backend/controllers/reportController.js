const Product = require('../models/Product');
const Movement = require('../models/Movement');
const Supplier = require('../models/Supplier');
const Client = require('../models/Client');
const { generatePDF, generateExcel } = require('../utils/reportUtils');

// Relatório de Produtos em Estoque
exports.productsReport = async (req, res) => {
  const products = await Product.find();

  const { format } = req.query; // pdf ou excel

  if (format === 'pdf') {
    const pdfBuffer = await generatePDF('Produtos em Estoque', products);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } else if (format === 'excel') {
    const excelBuffer = await generateExcel('Produtos em Estoque', products);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(excelBuffer);
  } else {
    res.json(products);
  }
};

// Relatório de Movimentações (com filtros)
exports.movementsReport = async (req, res) => {
  const { startDate, endDate, product, type, format } = req.query;

  let filter = {};

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }
  if (product) filter.product = product;
  if (type) filter.type = type;

  const movements = await Movement.find(filter).populate('product');

  if (format === 'pdf') {
    const pdfBuffer = await generatePDF('Movimentações', movements);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } else if (format === 'excel') {
    const excelBuffer = await generateExcel('Movimentações', movements);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(excelBuffer);
  } else {
    res.json(movements);
  }
};

// Relatório de Fornecedores
exports.suppliersReport = async (req, res) => {
  const suppliers = await Supplier.find();
  const { format } = req.query;

  if (format === 'pdf') {
    const pdfBuffer = await generatePDF('Fornecedores', suppliers);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } else if (format === 'excel') {
    const excelBuffer = await generateExcel('Fornecedores', suppliers);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(excelBuffer);
  } else {
    res.json(suppliers);
  }
};

// Relatório de Clientes
exports.clientsReport = async (req, res) => {
  const clients = await Client.find();
  const { format } = req.query;

  if (format === 'pdf') {
    const pdfBuffer = await generatePDF('Clientes', clients);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } else if (format === 'excel') {
    const excelBuffer = await generateExcel('Clientes', clients);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(excelBuffer);
  } else {
    res.json(clients);
  }
};
