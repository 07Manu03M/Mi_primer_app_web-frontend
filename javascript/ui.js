// ui.js
import { abrirModal, cerrarModal, bindModalCloseButtons, formatDate } from './utils.js';
import { listTareasByUser, createTarea, createGrupo, getUsuarioById } from './api.js';

export function bindUIEvents({ userId }) {
  // Abrir modales
  document.getElementById('crearTareaBtn')?.addEventListener('click', () => abrirModal('modalTarea'));
  document.getElementById('crearGrupoBtn')?.addEventListener('click', () => abrirModal('modalGrupo'));

  bindModalCloseButtons();

  // Guardar Tarea
  document.getElementById('guardarTareaBtn')?.addEventListener('click', async () => {
    const data = {
      titulo: document.getElementById('titulo')?.value?.trim(),
      descripcion: document.getElementById('descripcion')?.value?.trim(),
      fechaLimite: document.getElementById('fechaLimite')?.value,
      responsable: userId
    };
    if (!data.titulo || !data.descripcion || !data.fechaLimite) {
      alert('Completa todos los campos');
      return;
    }
    try {
      await createTarea(data);
      cerrarModal('modalTarea');
      await renderTareas({ userId });
    } catch (e) {
      console.error(e);
      alert(e.message || 'Error creando tarea');
    }
  });

  // Guardar Grupo
  document.getElementById('guardarGrupoBtn')?.addEventListener('click', async () => {
    const data = {
      nombre: document.getElementById('nombreGrupo')?.value?.trim(),
      descripcion: document.getElementById('descripcionGrupo')?.value?.trim()
    };
    if (!data.nombre || !data.descripcion) {
      alert('Completa todos los campos');
      return;
    }
    try {
      await createGrupo(data);
      cerrarModal('modalGrupo');
      alert('Grupo creado ✅');
      // si quieres refrescar algo, puedes llamar una función aquí
    } catch (e) {
      console.error(e);
      alert(e.message || 'Error creando grupo');
    }
  });
}

export async function renderUsuario({ userId }) {
  try {
    const usuario = await getUsuarioById(userId);
    const cont = document.getElementById('caja_aside');
    const cont2 = document.getElementById('caja_usuario');
    if (cont) {
      cont.innerHTML = `
        <div class="infor_user">
          <h5>${usuario.nombre}</h5>
          <p>Sin Grupo</p>
          <div class="status">
            <img src="../storage/img/online.png" alt="">
            <span>En linea</span>
          </div>
        </div>
      `;
    }
    if (cont2) {
      cont2.innerHTML = `
        <div class="caja_usuario">
          <img src="../storage/img/unkwon.jpg" alt="">
          <span>${usuario.nombre}</span>
        </div>
      `;
    }
  } catch (e) {
    console.error(e);
  }
}

export async function renderTareas({ userId }) {
  try {
    const tareas = await listTareasByUser(userId);
    console.log('tareas recibidas del backend:', tareas, 'usuario:', userId);

    const tareasArray = Array.isArray(tareas) ? tareas : [];

    // Filtrar tareas por responsable (soporta responsable como objeto o string)
    const tareasFiltradas = tareasArray.filter(t => {
      if (!t.responsable) return false;
      if (typeof t.responsable === 'object') {
        const rid = String(t.responsable._id ?? t.responsable.id ?? t.responsable);
        return rid === String(userId);
      }
      return String(t.responsable) === String(userId);
    });

    const lista = document.getElementById('tareas-list');
    const listita = document.getElementById('listita');

    // Render tarjetas (si existe contenedor)
    if (lista) {
      lista.innerHTML = '';
      tareasFiltradas.forEach(t => {
        const taskId = t._id ?? t.id ?? (t._doc && (t._doc._id ?? t._doc.id)) ?? '';
        lista.insertAdjacentHTML('beforeend', `
          <a class="actividad1" href="../paginas/gestortarea.html?id=${taskId}">
            <img src="../storage/img/pngtree-to-do-vector-element-png-image_7143502.png" alt="">
            <div class="text">
              <span>${t.titulo}</span>
              <p>Pendiente</p>
            </div>
          </a>
        `);
      });
    }

    // Render detalle en #listita (si existe)
    if (listita) {
      listita.innerHTML = '';
      tareasFiltradas.forEach(t => {
        const responsable = typeof t.responsable === 'object'
          ? (t.responsable.nombre || (t.responsable._id ?? t.responsable.id ?? 'N/A'))
          : (t.responsable ?? 'N/A');
        listita.insertAdjacentHTML('beforeend', `
          <div class="text" style="margin-bottom:12px;padding:8px;background:#eee;border-radius:8px;">
            <div><strong>TÍTULO:</strong> ${t.titulo}</div>
            <div><strong>DESCRIPCIÓN:</strong> ${t.descripcion}</div>
            <div><strong>FECHA:</strong> ${t.fechaLimite ? new Date(t.fechaLimite).toLocaleDateString() : '-'}</div>
            <div><strong>RESPONSABLE:</strong> ${responsable}</div>
            <div><strong>ESTADO:</strong> ${t.estado ?? 'Pendiente'}</div>
          </div>
        `);
      });
    }

    // Mensajes si no hay tareas
    if ((lista && lista.childElementCount === 0) && (listita && listita.childElementCount === 0)) {
      if (lista) lista.innerHTML = '<p>No hay tareas asignadas.</p>';
      if (listita) listita.innerHTML = '<p>No hay tareas asignadas.</p>';
    } else {
      if (lista && lista.childElementCount === 0 && listita && listita.childElementCount > 0) {
        lista.innerHTML = '<p>No hay tarjetas principales.</p>';
      }
    }
  } catch (e) {
    console.error('Error en renderTareas:', e);
  }
}


