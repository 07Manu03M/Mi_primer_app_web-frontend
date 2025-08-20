// javascript/login.js
document.addEventListener("DOMContentLoaded", () => {
  // si existe el form de login lo atamos
  const loginForm = document.getElementById("login-container");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await login();
    });
  }

  // si existe el form de registro, atamos el botón
  const crearBtn = document.getElementById("crearCuentaBtn");
  if (crearBtn) {
    crearBtn.addEventListener("click", async () => {
      await registrar();
    });
  }
});

// -------- LOGIN --------
async function login() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const errorMsg = document.getElementById("login-error");

  errorMsg.textContent = "";

  if (!email || !password) {
    errorMsg.textContent = "Por favor completa todos los campos";
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      errorMsg.textContent = data.msg || (data.errores ? data.errores[0].msg : "Error al iniciar sesión");
      return;
    }

    localStorage.setItem("token", data.token);
    alert("Login exitoso ✅");
    // redirige a la página principal después del login (ajusta si tu ruta es otra)
    window.location.href = "paginas/inicioLogin.html";
  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Error de conexión con el servidor";
  }
}

// -------- REGISTRO --------
async function registrar() {
  const nombre = document.getElementById("registro-nombre").value.trim();
  const email = document.getElementById("registro-email").value.trim();
  const password = document.getElementById("registro-password").value.trim();
  const errorMsg = document.getElementById("registro-error");

  errorMsg.textContent = "";

  if (!nombre || !email || !password) {
    errorMsg.textContent = "Por favor completa todos los campos";
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/api/usuarios/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      errorMsg.textContent = data.msg || (data.errores ? data.errores[0].msg : "Error en el registro");
      return;
    }

    alert("Registro exitoso ✅ Ahora puedes iniciar sesión");
    // volvemos al login
    window.location.href = "../index.html";
  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Error de conexión con el servidor";
  }
}
