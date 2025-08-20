// utils.js
export function handleResponse(res) {
  if (res.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '../login.html';
    throw new Error('No autorizado. Redirigiendo...');
  }
  if (!res.ok) {
    return res.json().catch(() => ({})).then(data => {
      throw new Error(data.msg || 'Error en la petición');
    });
  }
  return res.json();
}

export function abrirModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'flex';
}

export function cerrarModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

export function bindModalCloseButtons() {
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => cerrarModal(btn.dataset.close));
  });
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return isNaN(d) ? '-' : d.toLocaleDateString();
}
