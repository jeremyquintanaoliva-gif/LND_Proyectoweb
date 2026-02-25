document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.carrusel-track');
  const btnDer = document.querySelector('.flecha.der');
  const btnIzq = document.querySelector('.flecha.izq');
  const slider = document.querySelector('.carrusel-speed');

  let velocidad = parseInt(slider.value); // velocidad inicial
  let posicion = 0;
  let pausado = false;

  // Clonar imágenes para loop infinito
  const imgs = Array.from(track.children);
  imgs.forEach(img => track.appendChild(img.cloneNode(true)));

  const anchoOriginal = imgs.reduce((sum, img) => sum + img.offsetWidth + 15, 0); // gap 15px

  function mover() {
    if (!pausado) {
      posicion -= velocidad * 0.5; // multiplicador suave para que no se vea borroso
      if (Math.abs(posicion) >= anchoOriginal) posicion = 0;
      track.style.transform = `translateX(${posicion}px)`;
    }
    requestAnimationFrame(mover);
  }

  mover();

  // Flechas
  btnDer.addEventListener('click', () => {
    velocidad += 1;
    if (velocidad > 10) velocidad = 10;
    slider.value = velocidad;
  });

  btnIzq.addEventListener('click', () => {
    velocidad -= 1;
    if (velocidad < 1) velocidad = 1;
    slider.value = velocidad;
  });

  // Slider para velocidad
  slider.addEventListener('input', (e) => {
    velocidad = parseInt(e.target.value);
  });

  // Pausa al pasar el ratón
  track.parentElement.addEventListener('mouseenter', () => pausado = true);
  track.parentElement.addEventListener('mouseleave', () => pausado = false);
});

// FILTRO DE JUGADORES
document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("posicion");
  const cards = document.querySelectorAll("#equipo .card");

  select.addEventListener("change", function () {
    const valor = this.value;

    cards.forEach(card => {
      if (valor === "todos" || card.dataset.posicion === valor) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
