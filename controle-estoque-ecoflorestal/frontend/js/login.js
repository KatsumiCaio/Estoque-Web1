document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  if (!email || !password) {
    errorMsg.textContent = 'Preencha todos os campos.';
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      errorMsg.textContent = data.message || 'Credenciais inválidas';
    } else {
      localStorage.setItem('token', data.token);
      window.location.href = 'index.html'; // redireciona para o menu principal
    }
  } catch (err) {
    errorMsg.textContent = 'Erro ao conectar com o servidor.';
  }
});
