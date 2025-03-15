document.addEventListener("DOMContentLoaded", () => {
    const anthem = document.getElementById("anthem");
    function playSound() {
        anthem.play().catch(() => setTimeout(playSound, 500));
    }
    playSound();
});

function nextLevel() {
    window.location.href = 'nevel2.html';
}