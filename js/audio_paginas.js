// ==============================
// audio_paginas.js — sonidos activables con botones
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  // Si hay sonido ambiental heredado, apágalo
  if (window.sonidoFondoGlobal) {
    try {
      window.sonidoFondoGlobal.stop();
      window.sonidoFondoGlobal.unload();
    } catch (e) {}
    window.sonidoFondoGlobal = null;
  }

  // Configura todos los botones-audio
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

      // Detiene otros audios HTML5 en reproducción
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
