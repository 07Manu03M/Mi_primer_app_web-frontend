// main.js
import { requireAuthRedirect, decodeTokenPayload, logout } from './auth.js';
import { bindUIEvents, renderUsuario, renderTareas } from './ui.js';

(function init() {
  const token = requireAuthRedirect();
  if (!token) return;

  const payload = decodeTokenPayload(token);
  if (!payload?.id) return;

  const userId = payload.id;

  // Bind logout (si tienes elemento logout)
  document.getElementById('logout')?.addEventListener('click', logout);

  // UI events and initial render
  bindUIEvents({ userId });
  renderUsuario({ userId });
  renderTareas({ userId });
})();
