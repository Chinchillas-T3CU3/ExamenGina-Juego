let players = JSON.parse(localStorage.getItem('players')) || [];
function guardarNombre() {
   let name= sessionStorage.getItem('tempname');
   let score=parseInt(sessionStorage.getItem('Score'));
    //aqui debemos de establecer de nuevo el nombre y mandar el score
    // let score = Math.floor(Math.random() * 100) + 1; 
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
    window.location.href="Record.html"
    //mandamos a la de records

}