const token = localStorage.getItem('token');
const API_URL = 'http://localhost:5000/api/products';

let editingId = null;

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  const form = document.getElementById('productForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const product = {
      name: document.getElementById('nome').value,
      code: document.getElementById('codigo').value,
      description: document.getElementById('descricao').value,
      quantity: parseInt(document.getElementById('quantidade').value),
      unitValue: parseFloat(document.getElementById('valor').value),
    };

    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        form.reset();
        editingId = null;
        document.querySelector('#productForm button').textContent = 'Cadastrar';
        loadProducts();
      } else {
        alert('Erro ao salvar o produto');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor');
    }
  });
});

async function loadProducts() {
  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const products = await res.json();
    const tbody = document.getElementById('productTableBody');
    tbody.innerHTML = '';

    products.forEach((p) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.name}</td>
        <td>${p.code}</td>
        <td>${p.description || ''}</td>
        <td>${p.quantity}</td>
        <td>R$ ${p.unitValue.toFixed(2)}</td>
        <td>
          <button class="edit-btn" onclick="editProduct('${p._id}')">Editar</button>
          <button class="delete-btn" onclick="deleteProduct('${p._id}')">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar produtos');
  }
}

async function deleteProduct(id) {
  if (!confirm('Tem certeza que deseja excluir este produto?')) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) loadProducts();
    else alert('Erro ao excluir produto');
  } catch (err) {
    console.error(err);
    alert('Erro ao conectar com o servidor');
  }
}

async function editProduct(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const p = await res.json();
    document.getElementById('nome').value = p.name;
    document.getElementById('codigo').value = p.code;
    document.getElementById('descricao').value = p.description || '';
    document.getElementById('quantidade').value = p.quantity;
    document.getElementById('valor').value = p.unitValue;

    editingId = id;
    document.querySelector('#productForm button').textContent = 'Atualizar';
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar produto para edição');
  }
}
