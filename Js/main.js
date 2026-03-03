document.addEventListener("DOMContentLoaded", () => {

  /* ==================================================
     =============== CARRUSEL ==========================
     ================================================== */

  // Elementos del carrusel
  const track = document.querySelector(".carrusel-track"); // Contenedor de imágenes
  const slider = document.querySelector(".carrusel-speed"); // Barra de velocidad
  const btnDer = document.querySelector(".der"); // Flecha derecha
  const btnIzq = document.querySelector(".izq"); // Flecha izquierda

  // Variables principales
  let vel = +slider.value; // Velocidad inicial (convertida a número)
  let pos = 0;            // Posición actual del carrusel
  let pausa = false;      // Indica si está en pausa o no

  const GAP = 15; // Espacio entre imágenes (igual al CSS)

  /* === Duplicar imágenes para efecto infinito === */

  const imgs = [...track.children]; // Guardamos imágenes originales

  imgs.forEach(img => {
    // Clonamos cada imagen y la añadimos al final
    track.appendChild(img.cloneNode(true));
  });


  /* === Calcular ancho total de las imágenes originales === */

  const ancho = imgs.reduce((total, img) => {

    return total + img.offsetWidth + GAP;

  }, 0);


  /* === Función que mueve el carrusel === */

  function mover() {

    // Solo se mueve si no está pausado
    if (!pausa) {

      // Movemos poco a poco según velocidad
      pos -= vel * 0.5;

      // Cuando llega al final, vuelve al inicio
      if (Math.abs(pos) >= ancho) {
        pos = 0;
      }

      // Aplicamos el movimiento
      track.style.transform = `translateX(${pos}px)`;
    }

    // Repetimos la animación infinitamente
    requestAnimationFrame(mover);
  }

  // Iniciar animación
  mover();


  /* === Botones de velocidad === */

  // Flecha derecha → aumenta velocidad
  btnDer.onclick = () => {

    vel = Math.min(10, vel + 1); // Máximo 10
    slider.value = vel;         // Sincroniza slider
  };


  // Flecha izquierda → reduce velocidad
  btnIzq.onclick = () => {

    vel = Math.max(1, vel - 1); // Mínimo 1
    slider.value = vel;
  };


  // Slider cambia velocidad
  slider.oninput = e => {

    vel = +e.target.value; // Convertir a número
  };


  /* === Pausa al pasar el ratón === */

  track.parentElement.onmouseenter = () => {
    pausa = true;
  };

  track.parentElement.onmouseleave = () => {
    pausa = false;
  };



  /* ==================================================
     =============== FILTRO JUGADORES ==================
     ================================================== */

  // Selector de posiciones
  const select = document.getElementById("posicion");

  // Todas las cards
  const cards = document.querySelectorAll(".card");

  // Títulos (Porteros, Defensas, etc.)
  const titulos = document.querySelectorAll(".equipo h3");


  /* === Cuando cambia el filtro === */

  select.onchange = () => {

    const val = select.value; // Valor seleccionado


    /* ---- Mostrar / ocultar cartas ---- */

    cards.forEach(card => {

      // Si es "todos" o coincide posición → mostrar
      if (val === "todos" || card.dataset.posicion === val) {

        card.style.display = "block";

      } else {

        card.style.display = "none";
      }

    });


    /* ---- Mostrar / ocultar títulos ---- */

    titulos.forEach(titulo => {

      // Contenedor de las cards debajo del título
      const grid = titulo.nextElementSibling;

      // Comprobamos si hay alguna visible
      const hayVisible = [...grid.children].some(card => {

        return card.style.display !== "none";

      });


      // Si es "todos" → mostrar todo
      if (val === "todos") {

        titulo.style.display = "block";

      }
      // Si no hay ninguna visible → ocultar título
      else if (!hayVisible) {

        titulo.style.display = "none";

      }
      // Si hay visibles → mostrar título
      else {

        titulo.style.display = "block";
      }

    });

  };

});