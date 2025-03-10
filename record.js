function loadScores() {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    let tableBody = document.getElementById("scoreTable");

    // Ordenar de mayor a menor puntaje
    players.sort((a, b) => b.score - a.score);

    // Limpiar la tabla antes de insertar nuevos datos
    tableBody.innerHTML = "";

    players.forEach(player => {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${player.name}</td><td>${player.score}</td>`;
        tableBody.appendChild(row);
    });
}

// Cargar puntajes al cargar la página
loadScores();