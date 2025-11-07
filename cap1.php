<?php
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
  <title>Capítulo 1</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="assets/css/estilos.css">
</head>
<body>
  <header class="topbar">
    <h1>Capítulo 1</h1>
    <nav><a href="index.php">Volver</a> | <a href="salir.php">Cerrar sesión</a></nav>
  </header>

  <main class="contenedor">
    <p>Aquí va tu contenido protegido (imágenes, texto, etc.).</p>
  </main>
</body>
</html>
