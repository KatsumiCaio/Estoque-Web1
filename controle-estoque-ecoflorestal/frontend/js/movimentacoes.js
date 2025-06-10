const token = localStorage.getItem('token');
const MOV_API = 'http://localhost:5000/api/movements';
const PROD_API = 'http://localhost:5000/api/products';

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  loadMovements();

  const form = document.getElementById('movForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      productId: document.getElementById('produto').value,
      type: document.getElementById('tipo').value,
      quantity: parseInt(document.getElementById('quantidade').value),
      notes: document.getElementById('observacoes').value
    };

    try {
      const res = await fetch(MOV_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        form.reset();
        loadMovements();
        loadProducts(); // Atualiza a lista de produtos se necessário
      } else {
        const err = await res.json();
        alert(err.message || 'Erro ao registrar movimentação');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor');
    }
  });
});

async function loadProducts() {
  try {
    const res = await fetch(PROD_API, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const produtos = await res.json();
    const select = document.getElementById('produto');
    select.innerHTML = '<option value="">Selecione</option>';
    produtos.forEach(p => {
      const option = document.createElement('option');
      option.value = p._id;
      option.textContent = `${p.name} (Estoque: ${p.quantity})`;
      select.appendChild(option);
    });
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar produtos');
  }
}

async function loadMovements() {
  try {
    const res = await fetch(MOV_API, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const movs = await res.json();
    const tbody = document.getElementById('movTableBody');
    tbody.innerHTML = '';

    movs.forEach(m => {
      const tr = document.createElement('tr');
      const data = new Date(m.date).toLocaleString();
      tr.innerHTML = `
        <td>${data}</td>
        <td>${m.product?.name || '[apagado]'}</td>
        <td>${m.type}</td>
        <td>${m.quantity}</td>
        <td>${m.notes || ''}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar movimentações');
  }
}
