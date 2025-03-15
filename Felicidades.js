document.addEventListener("DOMContentLoaded", () => {
    const sound = document.getElementById("victory-sound");
    function playSound() {
        sound.play().catch(() => setTimeout(playSound, 500));
    }
    playSound();
});