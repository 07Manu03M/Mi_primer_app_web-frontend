// auth.js
export function getToken() {
  return localStorage.getItem('token');
}

export function requireAuthRedirect() {
  const token = getToken();
  if (!token) {
    window.location.href = '../index.html';
    return null;
  }
  return token;
}

export function decodeTokenPayload(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
    return null;
  }
}

export function logout() {
  localStorage.removeItem('token');
  window.location.href = '../index.html';
}
