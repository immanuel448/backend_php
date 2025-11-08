<?php
// Protección
session_start();
if (!isset($_SESSION['autenticado']) || $_SESSION['autenticado'] !== true) {
    header("Location: acceso.php");
    exit();
}
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
?>
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Portada – Una Historia Simple?</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="assets/css/estilos.css">
</head>
<body>
  <header class="topbar">
    <h1>Una Historia Simple?</h1>
    <nav><a href="salir.php">Cerrar sesión</a></nav>
  </header>
  <main class="contenedor">
    <h2>Capítulos</h2>
    <ul>
      <li><a href="cap1.php">Capítulo 1</a></li>
      <!-- Agrega más capítulos aquí -->
    </ul>
  </main>
</body>
</html>