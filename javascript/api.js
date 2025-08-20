// api.js
import { handleResponse } from './utils.js';
import { getToken } from './auth.js';

export const baseURL = 'http://localhost:4000/api';

function authHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
}

// Usuarios
export function getUsuarioById(id) {
  return fetch(`${baseURL}/usuarios/${id}`, { headers: authHeaders() }).then(handleResponse);
}

// Tareas
export function listTareasByUser(userId) {
  return fetch(`${baseURL}/tareas/${userId}`, { headers: authHeaders() }).then(handleResponse);
}

export function createTarea(data) {
  return fetch(`${baseURL}/tareas`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data)
  }).then(handleResponse);
}

// Grupos
export function createGrupo(data) {
  return fetch(`${baseURL}/grupos`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data)
  }).then(handleResponse);
}

// (opcional) obtener tarea por id si backend lo soporta
export function getTareaById(id) {
  return fetch(`${baseURL}/tareas/${id}`, { headers: authHeaders() }).then(handleResponse);
}
