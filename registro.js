let players = JSON.parse(localStorage.getItem('players')) || [];
let draggedItem = null;
let selectedImage = null;

document.querySelectorAll("img").forEach(img => {
    img.addEventListener("dragstart", (event) => {
            draggedItem = event.target;
        });
    });
 let dropZone = document.getElementById("div3");

dropZone.addEventListener("dragover", (event) => {
     event.preventDefault();
});

dropZone.addEventListener("drop", (event) => {
    console.log("se activo el drop");
    event.preventDefault();
    if (!dropZone.hasChildNodes()) {
            dropZone.appendChild(draggedItem);
    }
    selectedImage = draggedItem.src;
    console.log(selectedImage);
});
function validateName(name) {
    const regex = /^[a-zA-Z0-9_]{4,8}$/;
    return regex.test(name);
}

function guardarNombre() {
    let name = document.getElementById("nombreplayer").value.trim();

    if (!validateName(name)) {
        showAlert("Nombre inválido (debe ser de 4-8 caracteres y solo letras, números o _)");
        return;
    }

    let score = Math.floor(Math.random() * 100) + 1; 
    let playerIndex = players.findIndex(player => player.name === name);

    if (playerIndex !== -1) {
        // Si el jugador ya existe, actualizar solo si el nuevo score es mayor
        if (score > players[playerIndex].score) {
            players[playerIndex].score = score;
            console.log(`Nuevo puntaje más alto para ${name}: ${score}`);
        } else {
            console.log(`El puntaje ${score} no es mayor al actual (${players[playerIndex].score}). No se actualiza.`);
            return;
        }
    } else {
        // Si no existe, agregar nuevo jugador
        players.push({ name, score });
        console.log(`Nuevo jugador agregado: ${name}, Puntaje: ${score}`);
    }

    localStorage.setItem('players', JSON.stringify(players));
}

function showAlert(message, type = "danger") {
    let alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

