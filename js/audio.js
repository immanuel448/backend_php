// ==============================
// audio.js — Fondo automático con Howler (volumen 1)
// ==============================

document.addEventListener('DOMContentLoaded', () => {
  const botonAudio = document.getElementById('toggleAudio');

  // === 🎵 SONIDO DE FONDO ===
  const archivoFondo = document.body.dataset.audio || '../assets/audio/lluvia.mp3';
  let reproduciendoFondo = false;

  let sonidoFondo;
  try {
    sonidoFondo = new Howl({
      src: [archivoFondo],
      loop: true,
      volume: 1,
      html5: true,
      autoplay: true
    });

    sonidoFondo.once('play', () => {
      reproduciendoFondo = true;
      if (botonAudio) botonAudio.textContent = '🔊';
    });

    sonidoFondo.once('loaderror', () => {
      console.log('Autoplay bloqueado, se intentará en la primera interacción.');
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
  } catch (e) {
    console.warn('Error al iniciar el audio de fondo:', e);
  }

  // === 🔈 BOTÓN DE FONDO ===
  if (botonAudio) {
    botonAudio.addEventListener('click', () => {
      if (!sonidoFondo) return;
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

  // === 🎶 BOTONES DE CANCIÓN EXTRA ===
  const cancionesExtras = [
    { boton: 'botonCancion1', audio: 'audioCancion1' },
    { boton: 'botonCancion2', audio: 'audioCancion2' }
  ];

  cancionesExtras.forEach(({ boton, audio }) => {
    const btn = document.getElementById(boton);
    const aud = document.getElementById(audio);

    if (!btn || !aud) return;

    let reproduciendo = false;

    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();

      // Si otro audio se está reproduciendo, páralo todo antes
      cancionesExtras.forEach(({ audio: otherId }) => {
        const other = document.getElementById(otherId);
        if (other && !other.paused && other !== aud) {
          other.pause();
          other.currentTime = 0;
        }
      });

      if (!reproduciendo) {
        aud.play().catch(() => {});
      } else {
        aud.pause();
        aud.currentTime = 0;
      }

      reproduciendo = !reproduciendo;
    });
  });
});
