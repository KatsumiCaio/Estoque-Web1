const token = localStorage.getItem('token');
const API_URL = 'http://localhost:5000/api/suppliers';

let editingId = null;

document.addEventListener('DOMContentLoaded', () => {
  loadSuppliers();

  const form = document.getElementById('supplierForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const supplier = {
      name: document.getElementById('nome').value,
      cnpj: document.getElementById('cnpj').value,
      phone: document.getElementById('telefone').value,
      email: document.getElementById('email').value,
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
        body: JSON.stringify(supplier),
      });

      if (res.ok) {
        form.reset();
        editingId = null;
        document.querySelector('#supplierForm button').textContent = 'Cadastrar';
        loadSuppliers();
      } else {
        alert('Erro ao salvar fornecedor');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor');
    }
  });
});

async function loadSuppliers() {
  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const suppliers = await res.json();
    const tbody = document.getElementById('supplierTableBody');
    tbody.innerHTML = '';

    suppliers.forEach((s) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${s.name}</td>
        <td>${s.cnpj}</td>
        <td>${s.phone || ''}</td>
        <td>${s.email || ''}</td>
        <td>
          <button class="edit-btn" onclick="editSupplier('${s._id}')">Editar</button>
          <button class="delete-btn" onclick="deleteSupplier('${s._id}')">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar fornecedores');
  }
}

async function deleteSupplier(id) {
  if (!confirm('Tem certeza que deseja excluir este fornecedor?')) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) loadSuppliers();
    else alert('Erro ao excluir fornecedor');
  } catch (err) {
    console.error(err);
    alert('Erro ao conectar com o servidor');
  }
}

async function editSupplier(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const s = await res.json();
    document.getElementById('nome').value = s.name;
    document.getElementById('cnpj').value = s.cnpj;
    document.getElementById('telefone').value = s.phone || '';
    document.getElementById('email').value = s.email || '';

    editingId = id;
    document.querySelector('#supplierForm button').textContent = 'Atualizar';
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar fornecedor para edição');
  }
}
