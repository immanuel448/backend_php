// ==============================
// audio_fondo.js — sonido ambiental (lluvia, etc.)
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  const botonAudio = document.getElementById('toggleAudio');
  const archivoFondo = document.body.dataset.audio || '../assets/audio/lluvia.mp3';

  // Evitar duplicados
  if (window.sonidoFondoGlobal && window.sonidoFondoGlobal.playing()) {
    console.log('Ya hay un sonido de fondo activo.');
    return;
  }

  let reproduciendoFondo = false;

  const sonidoFondo = new Howl({
    src: [archivoFondo],
    loop: true,
    volume: 1,
    html5: true,
    autoplay: true
  });

  window.sonidoFondoGlobal = sonidoFondo;

  sonidoFondo.once('play', () => {
    reproduciendoFondo = true;
    if (botonAudio) botonAudio.textContent = '🔊';
  });

  sonidoFondo.once('loaderror', () => {
    console.log('Autoplay bloqueado, esperando interacción.');
    const desbloquear = () => {
      if (!reproduciendoFondo) {
        sonidoFondo.play();
        reproduciendoFondo = true;
        if (botonAudio) botonAudio.textContent = '🔊';
      }
      window.removeEventListener('pointerdown', desbloquear);
      window.removeEventListener('keydown', desbloquear);
    };
    window.addEventListener('pointerdown', desbloquear, { once: true });
    window.addEventListener('keydown', desbloquear, { once: true });
  });

  // Botón de mute/unmute
  if (botonAudio) {
    botonAudio.addEventListener('click', () => {
      if (reproduciendoFondo) {
        sonidoFondo.pause();
        botonAudio.textContent = '🔈';
      } else {
        sonidoFondo.play();
        botonAudio.textContent = '🔊';
      }
      reproduciendoFondo = !reproduciendoFondo;
    });
  }

  // Apagar fondo al salir de página o si no hay botón
  window.addEventListener('beforeunload', () => {
    if (!document.getElementById('toggleAudio') && window.sonidoFondoGlobal) {
      window.sonidoFondoGlobal.stop();
      window.sonidoFondoGlobal = null;
    }
  });
});
