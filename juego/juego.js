const categorias = {
  animales: ["CAT", "DOG", "LION", "TIGER"],
  frutas: ["APPLE", "BANANA", "ORANGE"],
};

const pistas = {
  CAT: "Animal doméstico pequeño",
  DOG: "Mejor amigo del hombre",
  LION: "Rey de la selva",
  TIGER: "Felino con rayas",
  APPLE: "Fruta roja o verde",
  BANANA: "Fruta amarilla",
  ORANGE: "Fruta cítrica",
};

let palabra = "";
let palabraOculta = [];
let intentos = 6;
let categoriaActual = "";

function iniciarJuego() {
  const categoriasKeys = Object.keys(categorias);
  categoriaActual =
    categoriasKeys[Math.floor(Math.random() * categoriasKeys.length)];

  const lista = categorias[categoriaActual];
  palabra = lista[Math.floor(Math.random() * lista.length)];

  palabraOculta = Array(palabra.length).fill("_");
  intentos = 6;

  document.getElementById("mensaje").textContent = "";
  document.getElementById("categoria").textContent =
    "Categoría: " + categoriaActual;
  document.getElementById("pista").textContent = "Pista: " + pistas[palabra];

  actualizarPantalla();
  generarBotones();
}

function actualizarPantalla() {
  document.getElementById("palabra").textContent = palabraOculta.join(" ");
  document.getElementById("intentos").textContent = intentos;
  document.getElementById("vidas").textContent = "❤️".repeat(intentos);
}

function generarBotones() {
  const letrasDiv = document.getElementById("letras");
  letrasDiv.innerHTML = "";

  for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i);
    const boton = document.createElement("button");

    boton.textContent = letra;

    boton.onclick = function () {
      comprobarLetra(letra);
      boton.disabled = true;
      boton.classList.add("usada");
    };

    letrasDiv.appendChild(boton);
  }
}

function comprobarLetra(letra) {
  let acierto = false;

  for (let i = 0; i < palabra.length; i++) {
    if (palabra[i] === letra) {
      palabraOculta[i] = letra;
      acierto = true;
    }
  }

  if (!acierto) {
    intentos--;
    actualizarAhorcado(); // 🔥 aquí cambia la imagen
  }

  actualizarPantalla();
  verificarFin();

  return acierto;
}

function verificarFin() {
  if (!palabraOculta.includes("_")) {
    document.getElementById("mensaje").textContent = "🎉 ¡Ganaste!";
    mostrarTraduccion();
    desactivarBotones();
  } else if (intentos === 0) {
    document.getElementById("mensaje").textContent =
      "💀 Perdiste, era: " + palabra;
    desactivarBotones();
  }
}
function actualizarAhorcado() {
  const errores = 6 - intentos;
  document.getElementById("ahorcado-img").src =
    "img/ahorcado" + errores + ".jpg";
}

function desactivarBotones() {
  const botones = document.querySelectorAll("#letras button");
  botones.forEach((b) => (b.disabled = true));
}

function reiniciarJuego() {
  iniciarJuego();
}

iniciarJuego(
  (document.getElementById("ahorcado-img").src =
    "img/ahorcado" + errores + ".jpg"),
);
