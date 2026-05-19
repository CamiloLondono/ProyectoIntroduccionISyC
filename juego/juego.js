const palabras = ["CAT", "DOG", "LION", "TIGER", "ELEPHANT", "GIRAFFE", "ZEBRA", "MONKEY", "BEAR", "WOLF", "FOX", "DEER", "RABBIT", "SNAKE", "FROG", "BIRD"];
let palabra = "";
let palabraOculta = [];
let intentos = 6;

function iniciarJuego() {
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraOculta = Array(palabra.length).fill("_");
    intentos = 6;

    document.getElementById("mensaje").textContent = "";
    actualizarPantalla();
    generarBotones();
}

function actualizarPantalla() {
    document.getElementById("palabra").textContent = palabraOculta.join(" ");
    document.getElementById("intentos").textContent = intentos;
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
    }

    actualizarPantalla();
    verificarFin();
}

function verificarFin() {
    if (!palabraOculta.includes("_")) {
        document.getElementById("mensaje").textContent = "🎉 ¡Ganaste!";
        desactivarBotones();
    } else if (intentos === 0) {
        document.getElementById("mensaje").textContent = "💀 Perdiste. La palabra era: " + palabra;
        desactivarBotones();
    }
}

function desactivarBotones() {
    const botones = document.querySelectorAll("#letras button");
    botones.forEach(b => b.disabled = true);
}

function reiniciarJuego() {
    iniciarJuego();
}

iniciarJuego();