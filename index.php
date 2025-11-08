<?php
// ------------------------------------------------------------
// Protección de sesión (bloquea acceso directo sin login)
// ------------------------------------------------------------
session_start();
if (!isset($_SESSION['autenticado']) || $_SESSION['autenticado'] !== true) {
    header("Location: acceso.php");
    exit();
}

// Evita caché del navegador (para impedir volver atrás tras cerrar sesión)
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Una Historia Simple?</title>

  <!-- Estilos -->
  <link rel="stylesheet" href="css/estilos.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css">
</head>

<body class="fade-page">
  <main class="contenedor" id="contenido-principal">
    <div class="titulo-principal">
      <h1>Una Historia Simple?</h1>
      <p>Una narración breve sobre el miedo, la motivación y los deseos de cambiar.</p>
    </div>

    <section class="capitulos-lista">
      <article class="capitulo-item">
        <a href="capitulos/PrimerDia.html">
          <img src="assets/img/cap1/dia1.webp" alt="Chica chibi con reflectores.">
          <h2>Primer encuentro | Dopamina</h2>
        </a>
      </article>

      <article class="capitulo-item" data-aos="fade-up">
        <a href="capitulos/SegundoDia.html">
          <img src="assets/img/cap2/dia2.webp" alt="Chica chibi hablándole fuerte al chico chibi">
          <h2>Segundo encuentro | Presencia - Seguridad</h2>
        </a>
      </article>

      <article class="capitulo-item" data-aos="fade-up">
        <a href="capitulos/TercerDia.html">
          <img src="assets/img/cap3/trabajo.webp" alt="Chica chibi trabajando.">
          <h2>Tercer encuentro | Esfuerzo - Fortaleza</h2>
        </a>
      </article>

      <article class="capitulo-item" data-aos="fade-up">
        <a href="capitulos/CuartoDia.html">
          <img src="assets/img/cap4/chibiGafete.webp" alt="Chica chibi con gafete">
          <h2>Cuarto encuentro | Reflexión y ¿Nombre?</h2>
        </a>
      </article>

      <article class="capitulo-item" data-aos="fade-up">
        <a href="capitulos/QuintoDia.html">
          <img src="assets/img/cap5/laptopChibi.webp" alt="Chico chibi en el piso con su laptop.">
          <h2>Quinto <s>encuentro</s> | ChatGPT - Cambio</h2>
        </a>
      </article>

      <article class="capitulo-item" data-aos="fade-up">
        <a href="capitulos/SextoDia.html">
          <img src="assets/img/cap6/chibiError.webp" alt="Chico chibi en el piso con su laptop.">
          <h2>Sexto <s>encuentro</s> | Pregunta - Error</h2>
        </a>
      </article>

      <article class="capitulo-item" data-aos="fade-up">
        <a href="capitulos/SeptimoDia.html">
          <img src="assets/img/cap7/chibiTirada.webp" alt="Chica chibi tirada en el piso sonriendo.">
          <h2>Séptimo encuentro | Solo un hola</h2>
        </a>
      </article>
    </section>
  </main>

  <footer>
    <p>© 2025 Una Historia Simple? | Diseñado por EML</p>
    <button id="cerrar-sesion" class="btn-cerrar" onclick="window.location.href='salir.php'">Cerrar sesión</button>
  </footer>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
  <script>
    // Inicializar AOS
    if (window.AOS) AOS.init({ duration: 800, once: true });
  </script>

  <!-- Si tienes JS propio para animaciones del index -->
  <script src="js/mainSimple.js"></script>
</body>
</html>
