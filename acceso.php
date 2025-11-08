<?php
session_start();

// Si ya está autenticado, redirige directamente
if (isset($_SESSION['autenticado']) && $_SESSION['autenticado'] === true) {
    header("Location: index.php");
    exit();
}

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

// Cargar configuración
$config = require __DIR__ . '/includes/db.php';

// 🔹 MODO API: cuando viene por fetch (sin recargar)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ajax'])) {
    $clave = $_POST['clave'] ?? '';
    $ok = false;

    if ($config['mode'] === 'hash') {
        $ok = password_verify($clave, $config['password_hash']);
    } elseif ($config['mode'] === 'sqlite') {
        try {
            $pdo = new PDO($config['dsn']);
            $stmt = $pdo->query("SELECT hash FROM usuarios LIMIT 1");
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row && password_verify($clave, $row['hash'])) {
                $ok = true;
            }
        } catch (Throwable $e) {
            $ok = false;
        }
    }

    if ($ok) {
        session_regenerate_id(true);
        $_SESSION['autenticado'] = true;
    }

    header('Content-Type: application/json');
    echo json_encode(['acceso' => $ok]);
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Acceso - Una Historia Simple?</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      background: #d8c4a3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      text-align: center;
    }
    img {
      width: 200px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,.2);
    }
    input, button {
      margin-top: 15px;
      padding: 10px 15px;
      font-size: 1rem;
      border-radius: 6px;
      border: 1px solid #aaa;
    }
    button {
      background: #8b5e3c;
      color: white;
      cursor: pointer;
      border: none;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background: #6b4628;
    }
    #mensaje {
      margin-top: 15px;
      font-weight: 600;
      transition: opacity .3s ease;
    }
  </style>
</head>

<body>
  <img src="assets/img/caja.webp" alt="Imagen de la caja">

  <div id="form">
    <input type="password" id="clave" placeholder="Introduce la contraseña" onkeydown="if(event.key==='Enter') verificar()" />
    <button id="btnEntrar">Entrar</button>
    <div id="mensaje"></div>
  </div>

  <script>
    async function verificar() {
      const clave = document.getElementById('clave').value.trim();
      const msg = document.getElementById('mensaje');

      if (!clave) {
        msg.textContent = "Introduce la contraseña.";
        msg.style.color = "red";
        return;
      }

      const formData = new FormData();
      formData.append('ajax', '1');
      formData.append('clave', clave);

      try {
        const res = await fetch("acceso.php", {
          method: "POST",
          body: formData
        });
        const data = await res.json();

        if (data.acceso) {
          msg.textContent = "✅ Acceso permitido";
          msg.style.color = "green";
          setTimeout(() => window.location.href = "index.php", 800);
        } else {
          msg.textContent = "❌ Clave incorrecta";
          msg.style.color = "red";
        }
      } catch (err) {
        msg.textContent = "⚠️ Error al conectar con el servidor.";
        msg.style.color = "red";
      }
    }

    document.getElementById('btnEntrar').addEventListener('click', verificar);
  </script>
</body>
</html>
