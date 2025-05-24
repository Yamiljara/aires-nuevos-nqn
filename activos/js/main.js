// Función para actualizar la fecha y hora en vivo
function actualizarFechaHora() {
    console.log("DEBUG: Intentando actualizar fecha y hora..."); // Depuración: Se llama la función
    const ahora = new Date();

    const opcionesFecha = {
        weekday: 'long', // Nombre completo del día de la semana (ej. 'jueves')
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Argentina/Buenos_Aires'
    };
    const opcionesHora = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Formato 24 horas
        timeZone: 'America/Argentina/Buenos_Aires'
    };

    const fechaDiaSemana = new Intl.DateTimeFormat('es-AR', { weekday: 'long', timeZone: 'America/Argentina/Buenos_Aires' }).format(ahora);
    const diaDelMes = ahora.getDate();
    const nombreMes = new Intl.DateTimeFormat('es-AR', { month: 'long', timeZone: 'America/Argentina/Buenos_Aires' }).format(ahora);
    const anio = ahora.getFullYear();
    const horaFormateada = new Intl.DateTimeFormat('es-AR', opcionesHora).format(ahora);

    // Capitalizar la primera letra del día de la semana (ej. 'viernes' -> 'Viernes')
    const diaCapitalizado = fechaDiaSemana.charAt(0).toUpperCase() + fechaDiaSemana.slice(1);

    // Formato exacto solicitado: "Edición: viernes 23 de mayo del año 2025 Hora 16:50:00"
    const textoFechaHora = `Edición: ${diaCapitalizado} ${diaDelMes} de ${nombreMes} del año ${anio} Hora ${horaFormateada}`;

    const datetimeElement = document.getElementById('live-datetime');
    if (datetimeElement) {
        datetimeElement.textContent = textoFechaHora;
        console.log("DEBUG: Fecha y hora actualizadas con éxito:", textoFechaHora); // Depuración: Éxito
    } else {
        console.error("ERROR: Elemento con ID 'live-datetime' NO ENCONTRADO en el DOM. La fecha y hora no se mostrarán."); // Depuración: Error grave
    }
}

// Inicia la actualización de la fecha/hora cada segundo
setInterval(actualizarFechaHora, 1000);
// Llama una vez al inicio para que no haya un segundo de retraso
actualizarFechaHora();


document.addEventListener('DOMContentLoaded', function() {
    console.log("DEBUG: DOMContentLoaded disparado. Iniciando scripts principales..."); // Depuración: DOM cargado

    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        console.log("DEBUG: Elementos .menu-toggle y .main-nav encontrados. Configurando eventos."); // Depuración: Elementos del menú encontrados

        menuToggle.addEventListener('click', function() {
            console.log("DEBUG: Botón de menú hamburguesa clickeado."); // Depuración: Clic en hamburguesa
            mainNav.classList.toggle('active');
            menuToggle.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
            // Alternar la clase 'no-scroll' en el body para evitar el scroll del contenido
            document.body.classList.toggle('no-scroll');
            console.log("DEBUG: main-nav 'active' class estado:", mainNav.classList.contains('active')); // Depuración: Estado de clase active
        });

        // Cierra el menú cuando se hace clic en un enlace de navegación
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log("DEBUG: Enlace de navegación clickeado:", link.href); // Depuración: Clic en enlace
                // Solo cerramos si el menú está activo y estamos en una pantalla pequeña (móvil)
                if (mainNav.classList.contains('active') && window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    menuToggle.textContent = '☰'; // Vuelve al ícono de hamburguesa
                    document.body.classList.remove('no-scroll'); // Restaurar el scroll del body
                    console.log("DEBUG: Menú cerrado después de clic en enlace (si es móvil)."); // Depuración: Menú cerrado
                }
            });
        });

        // Cierra el menú si se redimensiona la pantalla a desktop mientras está abierto
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.textContent = '☰';
                document.body.classList.remove('no-scroll'); // Restaurar el scroll del body
                console.log("DEBUG: Menú cerrado por redimensionamiento a desktop."); // Depuración: Menú cerrado por resize
            }
        });

    } else {
        console.error("ERROR: Elemento .menu-toggle o .main-nav NO ENCONTRADO. El menú móvil no funcionará."); // Depuración: Error grave
    }

    // Lógica para el efecto de máquina de escribir en los anuncios
    const adSlots = document.querySelectorAll('.ad-slot p');
    // Aseguramos que el texto esté tal cual lo quieres
    const adText = "PUBLICITATE AQUÍ 2996371067 - EMAIL airesnuevosnqn@hotmail.com";
    const typingSpeed = 70; // Velocidad de escritura en ms
    const pauseBeforeRepeat = 3000; // Pausa más larga antes de repetir en ms

    function typeWriterEffect(element, text, i, callback) {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(function() {
                typeWriterEffect(element, text, i + 1, callback);
            }, typingSpeed);
        } else if (callback) {
            setTimeout(callback, pauseBeforeRepeat);
        }
    }

    function startTypingAnimation(element) {
        element.textContent = ''; // Limpia el texto antes de empezar cada animación
        typeWriterEffect(element, adText, 0, function() {
            // Cuando termina de escribir, reinicia la animación
            startTypingAnimation(element);
        });
    }

    // Iniciar el efecto para cada bloque de publicidad
    if (adSlots.length > 0) {
        console.log("DEBUG: Iniciando animación de máquina de escribir para", adSlots.length, "anuncios."); // Depuración: Número de anuncios encontrados
        adSlots.forEach(adElement => {
            adElement.textContent = ''; // Asegurarse de que esté vacío al inicio
            startTypingAnimation(adElement);
        });
    } else {
        console.warn("ADVERTENCIA: No se encontraron elementos .ad-slot p para aplicar el efecto de máquina de escribir."); // Depuración: Advertencia si no se encuentran
    }
});