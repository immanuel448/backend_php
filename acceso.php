<?php
session_start();

// Si ya está autenticado, sácalo a index
if (isset($_SESSION['autenticado']) && $_SESSION['autenticado'] === true) {
    header("Location: index.php");
    exit();
}

// No cachear (para evitar volver al contenido tras cerrar sesión)
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

$config = require __DIR__ . '/includes/db.php';

$mensaje = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $clave = $_POST['clave'] ?? '';

    if ($config['mode'] === 'hash') {
        // MODO A: comparar contra hash fijo
        if (password_verify($clave, $config['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['autenticado'] = true;
            header("Location: index.php");
            exit();
        } else {
            $mensaje = 'Clave incorrecta';
        }
    } else {
        // MODO B (SQLite): lo implementamos en el paso 7
        $mensaje = 'Modo SQLite no configurado aún.';
    }
}
?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Acceso</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="assets/css/estilos.css">
</head>
<body class="login">
  <main class="login-box">
    <h1>Acceso</h1>
    <?php if ($mensaje): ?>
      <p class="alerta"><?php echo htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8'); ?></p>
    <?php endif; ?>

    <form method="post" autocomplete="off">
      <label for="clave">Contraseña</label>
      <input type="password" id="clave" name="clave" required>
      <button type="submit">Entrar</button>
    </form>
  </main>
</body>
</html>
