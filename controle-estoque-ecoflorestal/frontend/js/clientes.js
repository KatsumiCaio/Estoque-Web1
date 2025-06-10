const token = localStorage.getItem('token');
const API_URL = 'http://localhost:5000/api/clients';

let editingId = null;

document.addEventListener('DOMContentLoaded', () => {
  loadClients();

  const form = document.getElementById('clientForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const client = {
      name: document.getElementById('nome').value,
      cpf: document.getElementById('cpf').value,
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
        body: JSON.stringify(client),
      });

      if (res.ok) {
        form.reset();
        editingId = null;
        document.querySelector('#clientForm button').textContent = 'Cadastrar';
        loadClients();
      } else {
        alert('Erro ao salvar cliente');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor');
    }
  });
});

async function loadClients() {
  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const clients = await res.json();
    const tbody = document.getElementById('clientTableBody');
    tbody.innerHTML = '';

    clients.forEach((c) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${c.name}</td>
        <td>${c.cpf}</td>
        <td>${c.phone || ''}</td>
        <td>${c.email || ''}</td>
        <td>
          <button class="edit-btn" onclick="editClient('${c._id}')">Editar</button>
          <button class="delete-btn" onclick="deleteClient('${c._id}')">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar clientes');
  }
}

async function deleteClient(id) {
  if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) loadClients();
    else alert('Erro ao excluir cliente');
  } catch (err) {
    console.error(err);
    alert('Erro ao conectar com o servidor');
  }
}

async function editClient(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const c = await res.json();
    document.getElementById('nome').value = c.name;
    document.getElementById('cpf').value = c.cpf;
    document.getElementById('telefone').value = c.phone || '';
    document.getElementById('email').value = c.email || '';

    editingId = id;
    document.querySelector('#clientForm button').textContent = 'Atualizar';
  } catch (err) {
    console.error(err);
    alert('Erro ao carregar cliente para edição');
  }
}
