var config={
    type:Phaser.AUTO,
    width:1800,
    height:840,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{y:300},
            debug:false
        }
    },
    scene:{
        preload:preload,
        create: create,
        update:update
    }
};
var player;
var stars;
var platforms;
var cursors;
var score=0;
var scoreText;
var gameOver=false;
var vidas=3;
var corazones;
var corazon1,corazon2,corazon3;
var morena1;
var morenaGenerada= false;
var numAleatorio=Math.floor(Math.random()*200);
let tempname=sessionStorage.getItem('tempname');
let mono=sessionStorage.getItem('id');
var pausado;
let pausas = false;
let sonido=document.getElementById("audioPlayer");
let pausadoMusic;



var game=new Phaser.Game(config);

function preload(){
    this.load.image('sky','images/trenmaya.jpeg');
    this.load.image('ground','images/bandera.png');
    this.load.image('star','images/dinero.png');
    this.load.image('bomb','images/pri.png');
    this.load.image('corazon','images/vidas.png');
    this.load.image('morena','images/morena.png');
    if(mono=='img2'){
        this.load.spritesheet('dude','images/sheimbaum.png',{frameWidth:51,frameHeight:51});
    }else if(mono=='img1'){
        this.load.spritesheet('dude','images/amlo1.png',{frameWidth:54.2,frameHeight:49});
    }
    
    // this.load.spritesheet('dude','images/amlo1.png',{frameWidth:54.2,frameHeight:49});

    
    

}
function create(){
    
    this.add.image(750,420,'sky').setDisplaySize(1850,850);
    // this.add.image(400,300,'star');
    platforms=this.physics.add.staticGroup();
    corazones=this.physics.add.staticGroup();

    platforms.create(40,568,'ground').setScale(1, 0.3).refreshBody();
    platforms.create(900,150,'ground').setScale(1, 0.3).refreshBody();
    platforms.create(900,650,'ground').setScale(1, 0.3).refreshBody();

    platforms.create(500,420,'ground').setScale(1, 0.3).refreshBody();
    platforms.create(100,210,'ground').setScale(1, 0.3).refreshBody();
    platforms.create(1350,490,'ground').setScale(1, 0.3).refreshBody();
    platforms.create(40,820,'ground').setScale(10, 0.3).refreshBody().setVisible(false);
    corazon1=corazones.create(1300,27,'corazon').setScale(.3,0.3).refreshBody().setVisible(true);
    corazon2=corazones.create(1400,27,'corazon').setScale(.3,0.3).refreshBody().setVisible(true);
    corazon3=corazones.create(1500,27,'corazon').setScale(.3,0.3).refreshBody().setVisible(true);

   
  


    player=this.physics.add.sprite(100,450,'dude').setScale(2);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 10
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 7 }),
        frameRate: 10,
        repeat: -1

    });
    cursors=this.input.keyboard.createCursorKeys();
  
    stars = this.physics.add.group({
        key: 'star',
        repeat: 20,
        setXY: { x: 12, y: 0, stepX: 80 }
    });
    
    stars.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.5);
    
    });
    bombs=this.physics.add.group();
    morenas=this.physics.add.group();
    let fecha =new Date();
    scoreText = this.add.text(10, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' });
    nameText=this.add.text(250,16,`Name: ${tempname}`,{ fontSize: '32px', fill: '#c81d11' })
    nameText=this.add.text(550,16,fecha.toLocaleDateString(),{ fontSize: '32px', fill: '#c81d11' })



    let pausadoMusic = this.add.text(780, 27, 'SILENCIO', { fontSize: '32px', fill: '#ffffff' }).setInteractive();
    pausadoMusic.on('pointerdown', pausarReanudarSonido);



    this.physics.add.collider(player,platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs,platforms);
    this.physics.add.collider(morenas,platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    this.physics.add.collider(player, morenas, hitMorenas, null, this);
    

        
}
function update(){
    if(gameOver && vidas==0){
        sessionStorage.setItem('Score',score);
        
         window.location.href="GameOver.html"
        return;
    }
    if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
        
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
        
            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);
        
            player.anims.play('turn');
        }
        
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-420);
        }
        
        if(score>=380){
            sessionStorage.setItem('Score',score);
            window.location.href="NivelCompletado.html"
        }
 
        if (score >=numAleatorio && !morenaGenerada ) {
            console.log("Generando morena... Score:", score);
    
            if (morenas) {
                var morena1 = morenas.create(Phaser.Math.Between(200, 600), 16, 'morena');
                morena1.setScale(0.5);
                morena1.setBounce(1);
                morena1.setCollideWorldBounds(true);
                morena1.setVelocity(Phaser.Math.Between(-200, 200), 20);
                morena1.allowGravity = false;
                morenaGenerada=true;

                this.time.delayedCall(8000, function () {
                    if (morena1.active) { // Si aún no ha colisionado
                        morena1.disableBody(true, true);
                       
                        console.log("Morena eliminada automáticamente");
                    }
                }, [], this);
    
                
            } else {
                console.error("⚠️ ERROR: Grupo 'morenas' no definido.");
            }
        }
        // if (player.y > 600) {
        //     this.scene.restart();
        //     score = 0;
        //     gameOver = false;
        // }
    
}
function collectStar(player,star){
    star.disableBody(true,true);
    const sonido = document.getElementById("monedas");
        sonido.currentTime = 0; 
        sonido.play();
    score+=10;
    scoreText.setText('Score: '+score)
    if (stars.countActive(true) === 0)
    {
        
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });
        

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setScale(0.5);
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setScale(0.5);
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
        var bomb = bombs.create(x*3, 16, 'bomb');
        bomb.setScale(0.5);
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
        var bomb = bombs.create(x*2, 16, 'bomb');
        bomb.setScale(0.5);
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
        
        

    }
    
}
function hitBomb (player, bomb)
{
 
    if(vidas==3){
        bomb.disableBody(true, true);
        corazon3.setVisible(false);
        const sonido = document.getElementById("fuchi");
        sonido.currentTime = 0; 
        sonido.play();
        vidas--;
        console.log(vidas)

    }else if(vidas==2){
        bomb.disableBody(true, true);
        corazon2.setVisible(false);
        const sonido = document.getElementById("fuchi");
        sonido.currentTime = 0; 
        sonido.play();
        vidas--;
        console.log(vidas)

    }else if(vidas ==1) {
        bomb.disableBody(true, true);
        corazon1.setVisible(false);
        const sonido = document.getElementById("fuchi");
        sonido.currentTime = 0; 
        sonido.play();
        vidas--;
        console.log(vidas)

        
    }
     if( vidas==0){
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }

        
}
function hitMorenas(player,morena1){
    console.log("entrando en el hit");
    const sonido = document.getElementById("morena");
        sonido.currentTime = 0; 
        sonido.play();
    score=score+50;
    scoreText.setText('Score: '+score)

    morena1.disableBody(true, true);

}
function seleccionadoPause() {
    console.log("Pausa activada");
    if (pausas) {
        console.log("primera parte")
        console.log(pausas)
        this.physics.pause();
        player.anims.pauseAll()
        pausas = false;
        pausado.setText('PAUSA');
        console.log(pausas)
    } else {
        console.log("primera parte")
        console.log(pausas)
        
        pausas = true;
        pausado.setText('REANUDAR');
    }
}
function pausarReanudarSonido() {
    if (sonido.paused) {
        sonido.play(); 

    } else {
        sonido.pause(); 

    }
}