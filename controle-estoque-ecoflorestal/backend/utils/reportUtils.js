const { jsPDF } = require('jspdf');
const ExcelJS = require('exceljs');

// Função simplificada para gerar PDF de uma lista de objetos
async function generatePDF(title, data) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title, 10, 10);

  const keys = Object.keys(data[0] || {});
  doc.setFontSize(12);

  let y = 20;
  // Cabeçalho
  keys.forEach((key, i) => {
    doc.text(key.toUpperCase(), 10 + i * 40, y);
  });
  y += 10;

  // Dados
  data.forEach(item => {
    keys.forEach((key, i) => {
      let text = item[key];
      if (typeof text === 'object') text = JSON.stringify(text);
      doc.text(String(text), 10 + i * 40, y);
    });
    y += 10;
    if (y > 280) {
      doc.addPage();
      y = 10;
    }
  });

  return doc.output('arraybuffer');
}

// Função para gerar Excel a partir de uma lista de objetos
async function generateExcel(title, data) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(title);

  if (data.length === 0) return workbook.xlsx.writeBuffer();

  const keys = Object.keys(data[0]);

  sheet.addRow(keys);

  data.forEach(item => {
    const row = keys.map(key => {
      let val = item[key];
      if (val && typeof val === 'object') val = JSON.stringify(val);
      return val;
    });
    sheet.addRow(row);
  });

  return workbook.xlsx.writeBuffer();
}

module.exports = { generatePDF, generateExcel };
