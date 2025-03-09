class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    create() {
        this.add.text(100, 100, "Juego iniciado", { fontSize: '24px', fill: '#fff' });

        let backButton = this.add.text(100, 400, "Volver al Menú", { fontSize: '24px', fill: '#fff' }).setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.stop(); // Detiene esta escena
            returnToMenu();    // Vuelve al menú
        });

        // Crear un campo de texto en Phaser usando DOM
        /*this.inputField = this.add.dom(250, 100, 'input', {
            type: 'text',
            fontSize: '24px',
            width: '200px',
            height: '30px',
            padding: '5px',
            color: '#000',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxSizing: 'border-box' // Asegura que el padding no afecte el tamaño
        }).setOrigin(0.5);*/

        // Agregar el botón para guardar el nombre
       /* let saveButton = this.add.text(100, 150, "Guardar", { fontSize: '24px', fill: '#fff' }).setInteractive();
        let message = this.add.text(100, 200, "", { fontSize: '20px', fill: 'red' });

        saveButton.on('pointerdown', () => {
            let playerName = this.inputField.getChildByName('value').value.trim();

            if (!this.validateName(playerName)) {
                message.setText("Nombre inválido (4-8 caracteres, solo letras, números y _)");
                return;
            }

            if (localStorage.getItem(playerName)) {
                message.setText("¡Este nombre ya existe!");
                return;
            }

            localStorage.setItem(playerName, "Jugador registrado");
            message.setText("Nombre guardado exitosamente ✔");

            setTimeout(() => { message.setText(""); }, 2000);
        });*/

        
        
    }

    validateName(name) {
        const regex = /^[a-zA-Z0-9_]{4,8}$/;
        return regex.test(name);
    }
}
class RecordsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RecordsScene' });
    }

    create() {
        this.add.text(100, 100, "Records:", { fontSize: '24px', fill: '#fff' });

        let backButton = this.add.text(100, 400, "Volver al Menú", { fontSize: '24px', fill: '#fff' }).setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.stop();
            returnToMenu();
        });
    }
}

class InstructionsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InstructionsScene' });
    }

    create() {
        this.add.text(100, 100, "Cómo Jugar:", { fontSize: '24px', fill: '#fff' });

        let backButton = this.add.text(100, 400, "Volver al Menú", { fontSize: '24px', fill: '#fff' }).setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.stop();
            returnToMenu();
        });
    }
}

class CreditsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CreditsScene' });
    }

    create() {
        this.add.text(100, 100, "Créditos:", { fontSize: '24px', fill: '#fff' });

        let backButton = this.add.text(100, 400, "Volver al Menú", { fontSize: '24px', fill: '#fff' }).setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.stop();
            returnToMenu();
        });
    }
}

// Función para regresar al menú y detener la escena actual
function returnToMenu() {
    document.getElementById("gameContainer").style.display = "none";
    document.getElementById("menu").style.display = "grid";
    game.scene.stop();  // Detiene cualquier escena activa
}

// Configuración de Phaser
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [PlayScene, RecordsScene, InstructionsScene, CreditsScene],
    parent: "gameContainer"
};

const game = new Phaser.Game(config);

document.getElementById("playButton").addEventListener("click", () => startScene('PlayScene'));
document.getElementById("recordsButton").addEventListener("click", () => startScene('RecordsScene'));
document.getElementById("instructionsButton").addEventListener("click", () => startScene('InstructionsScene'));
document.getElementById("creditsButton").addEventListener("click", () => startScene('CreditsScene'));

// Función para iniciar una escena en Phaser y detener la anterior
function startScene(sceneKey) {
    document.getElementById("menu").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    
    game.scene.stop(); // Asegura que no haya escenas acumuladas
    game.scene.start(sceneKey);
}
// Función para iniciar una escena en Phaser y detener la anterior
function startScene(sceneKey) {
    document.getElementById("menu").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    
    game.scene.stop(); // Asegura que no haya escenas acumuladas
    game.scene.start(sceneKey);
}
