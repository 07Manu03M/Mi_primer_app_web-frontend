// gestortarea.js
import { requireAuthRedirect, decodeTokenPayload } from './auth.js';
import { listTareasByUser } from './api.js';
import { formatDate } from './utils.js';

function showMessage(msg) {
  const container = document.getElementById('detail') || document.getElementById('task-detail') || document.getElementById('listita') || document.body;
  container.innerHTML = `<p style="padding:12px;background:#fff3cd;border-radius:6px;">${msg}</p>`;
}

function renderTareaDetalle(tarea) {
  const container = document.getElementById('detail') || document.getElementById('task-detail') || document.getElementById('listita') || document.body;
  container.innerHTML = `
    <div class="sumadre">
      <h2 style="margin:0 0 8px">${tarea.titulo}</h2>
      <p><strong>Descripción:</strong> ${tarea.descripcion || '-'}</p>
      <p><strong>Fecha:</strong> ${tarea.fechaLimite ? formatDate(tarea.fechaLimite) : '-'}</p>
      <p><strong>Responsable:</strong> ${tarea.responsable?.nombre ?? tarea.responsable ?? 'N/A'}</p>
      <p><strong>Estado:</strong> ${tarea.estado ?? 'Pendiente'}</p>
    </div>
  `;
}

(async function initDetailPage() {
  // 1) autenticar
  const token = requireAuthRedirect();
  if (!token) return;
  const payload = decodeTokenPayload(token);
  if (!payload?.id) {
    showMessage('Usuario inválido.');
    return;
  }
  const userId = payload.id;

  // 2) leer id del query string o del localStorage como fallback
  const params = new URLSearchParams(window.location.search);
  const taskId = params.get('id') || localStorage.getItem('selectedTaskId');
  if (!taskId) {
    showMessage('No se especificó la tarea (falta id).');
    return;
  }

  // 3) cargar tareas del usuario (si tu backend tuviera endpoint /tareas/id podrías usarlo)
  try {
    // muestra loader simple
    const container = document.getElementById('detail') || document.getElementById('task-detail') || document.getElementById('listita') || document.body;
    const prevHTML = container.innerHTML;
    container.innerHTML = '<p>Cargando tarea...</p>';

    const tareas = await listTareasByUser(userId);
    const tareasArray = Array.isArray(tareas) ? tareas : [];
    // buscar por _id o id
    const tarea = tareasArray.find(t => {
      const idT = String(t._id ?? t.id ?? t._id ?? '');
      return idT === String(taskId);
    });

    if (!tarea) {
      // si no la encontró, restaura y muestra mensaje
      showMessage('No se encontró la tarea o no está asignada a ti.');
      return;
    }

    // renderiza solo esa tarea
    renderTareaDetalle(tarea);

    // opcional: limpiar selectedTaskId si se usó
    if (!params.get('id')) {
      // solo quitamos si vinimos por localStorage
      localStorage.removeItem('selectedTaskId');
    }
  } catch (e) {
    console.error('Error cargando detalle:', e);
    showMessage('Error al cargar la tarea. Revisa la consola.');
  }
})();
