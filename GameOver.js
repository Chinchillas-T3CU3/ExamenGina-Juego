document.addEventListener("DOMContentLoaded", () => {
    const sound = document.getElementById("gunshot-sound");

    function tryPlaySound() {
        const playPromise = sound.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Si falla, intentamos de nuevo después de un pequeño retraso
                setTimeout(tryPlaySound, 500);
            });
        }
    }

    tryPlaySound(); // Intentar reproducirlo al cargar la página
});

function restartGame() {
    location.reload();
}
