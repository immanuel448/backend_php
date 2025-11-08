// =====================================================
// acceso.js
// Controla el acceso al sitio conectado al backend C#
// =====================================================

document.addEventListener("DOMContentLoaded", async () => {
  const overlay = document.createElement("div");
  overlay.id = "overlay-acceso";
  overlay.innerHTML = `
    <div class="acceso-contenedor">
      <h2>Acceso privado</h2>
      <p>Introduce la contraseña para continuar</p>
      <input type="password" id="claveAcceso" placeholder="Contraseña" />
      <button id="btnAcceder">Entrar</button>
      <div id="msgAcceso"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Estilos rápidos (puedes moverlos a tu CSS)
  const style = document.createElement("style");
  style.textContent = `
    #overlay-acceso {
      position: fixed;
      inset: 0;
      background: rgba(255,255,255,0.97);
      backdrop-filter: blur(4px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.5s ease;
    }
    .acceso-contenedor {
      background: white;
      padding: 2rem 3rem;
      border-radius: 12px;
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
      text-align: center;
      font-family: system-ui, sans-serif;
    }
    .acceso-contenedor input {
      padding: 10px;
      font-size: 1rem;
      border-radius: 6px;
      border: 1px solid #bbb;
      width: 100%;
      margin-top: 10px;
    }
    .acceso-contenedor button {
      margin-top: 15px;
      padding: 10px 20px;
      font-size: 1rem;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    .acceso-contenedor button:hover {
      background: #1e4ed8;
    }
    #msgAcceso {
      margin-top: 10px;
      font-weight: 600;
    }
  `;
  document.head.appendChild(style);

  // -------------------------------------------------
  // 1️⃣ Verifica si hay sesión activa
  // -------------------------------------------------
  // Dirección base del backend (C#)
    const API_URL = "http://localhost:5062";

  // Verificar sesión
  try {
    const res = await fetch(`${API_URL}/api/auth/verificarSesion`);
    const data = await res.json();
    if (data.autenticado) {
      overlay.style.display = "none";
      return;
    } else {
      const btnLogout = document.querySelector("#cerrar-sesion");
      if (btnLogout) btnLogout.style.display = "none";
    }
  } catch (err) {
    console.error("Error al verificar sesión:", err);
    overlay.style.display = "flex"; // 🔹 fuerza que se muestre el formulario si hay error
  }
  
  // -------------------------------------------------
  // 2️⃣ Escucha el botón de acceso
  // -------------------------------------------------
  document.getElementById("btnAcceder").addEventListener("click", async () => {
    const clave = document.getElementById("claveAcceso").value.trim();
    const msg = document.getElementById("msgAcceso");

    if (!clave) {
      msg.textContent = "Introduce la contraseña.";
      msg.style.color = "red";
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/verificar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clave })
      });
      const data = await res.json();

      if (data.acceso) {
        msg.textContent = "✅ Acceso permitido";
        msg.style.color = "green";
        overlay.style.opacity = 0;
        setTimeout(() => (overlay.style.display = "none"), 500);
      } else {
        msg.textContent = "❌ Contraseña incorrecta";
        msg.style.color = "red";
      }
    } catch (err) {
      console.error("Error al verificar clave:", err);
      msg.textContent = "⚠️ Error de conexión con el servidor.";
      msg.style.color = "red";
    }
  }); // ← 🔹 Esta llave cerraba el evento del botón

  // -------------------------------------------------
  // 3️⃣ Cerrar sesión manualmente (si existe el botón)
  // -------------------------------------------------
  const btnLogout = document.querySelector("#cerrar-sesion");
  if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/salir`, { method: "POST" });
        const data = await res.json();
        console.log(data.mensaje);

        alert("Sesión cerrada correctamente.");
        location.reload();
      } catch (err) {
        console.error("Error al cerrar sesión:", err);
      }
    });
  }

}); // ← 🔹 Esta cierra el `DOMContentLoaded`
