    // ==============================
    // main.js
    // ==============================

    // Espera a que el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {

    // 1 Inicializa AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }

    // 2 Animación de entrada/fundido
    const body = document.querySelector('body.fade-page');
    if (body && typeof gsap !== 'undefined') {
        gsap.to(body, { duration: 1, opacity: 1 });
    } else if (body) {
        // fallback: muestra el contenido si GSAP falla
        body.style.opacity = 1;
    }

    // 3 Animación de salida al hacer click en enlaces internos
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        // Ignorar enlaces externos o anclas
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) return;

        e.preventDefault();

        if (body && typeof gsap !== 'undefined') {
            gsap.to(body, {
            duration: 0.6,
            opacity: 0,
            onComplete: () => {
                window.location.href = href;
            }
            });
        } else {
            window.location.href = href;
        }
        });
    });

    // 4 Integración de Tawk.to
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/6902be5f5287f51956268fc0/1j8pbf94o';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();

    Tawk_API.onLoad = function(){
        Tawk_API.setAttributes({ name : 'Lector anónimo', email : '' }, function(error){});
    };



    });
