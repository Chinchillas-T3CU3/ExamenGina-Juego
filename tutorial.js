const canvas = document.getElementById("tutorial");
const ctx = canvas.getContext("2d");
const fondo = new Image();
fondo.src = 'images/Tutorial.png'; // Imagen de fondo

fondo.onload = function () {
    ctx.drawImage(fondo, 0, 0, canvas.width, canvas.height);
    dibujarBoton();
};

function dibujarBoton() {
    ctx.fillStyle = "rgba(196, 196, 196, 0.8)";
    ctx.fillRect(380, 560, 200, 80);

    ctx.fillStyle = "white";
    ctx.font = "30px Pixelify Sans";
    ctx.fillText("Regresar", 410, 590);
}

canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Detecta si el clic fue dentro del botón
    if (x >= 390 && x <= 690 && y >= 500 && y <= 580) {
            window.location.href = "index1.html"; 
    }
});