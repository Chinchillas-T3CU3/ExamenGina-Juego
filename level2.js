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
var bala;
var camioneta;
var camionetascreadas=false;
var balacamioneta
var camioneta1;


var game=new Phaser.Game(config);

function preload(){
    this.load.image('sky','images/fondo2.png');
    this.load.image('ground','images/bandera.png');
    this.load.image('star','images/dinero.png');
    this.load.image('bomb','images/pri.png');
    this.load.image('bala','images/bala.png');
    this.load.image('balaIzq','images/balaIzq.png');
    this.load.image('corazon','images/vidas.png');
    this.load.image('morena','images/morena.png');
    this.load.image('mayo','images/mayo.png');
    this.load.image('chapo','images/chapo.png');
    this.load.image('salinas','images/salinas.png');
    this.load.image('camioneta','images/camioneta.png');
    this.load.spritesheet('dude','images/polis1.png',{frameWidth:49,frameHeight:57});
    

}
function create(){
    this.add.image(750,420,'sky').setDisplaySize(1800,840);

    platforms=this.physics.add.staticGroup();
    items=this.physics.add.staticGroup();
    corazones=this.physics.add.staticGroup();
    bala=this.physics.add.group({
        default:'bala',
        maxSize:15,
        allowGravity: false
    })
    balacamioneta=this.physics.add.group({
        default:'balaIzq',
        maxSize:25,
        allowGravity:false
    })

    platforms.create(40,568,'ground').setScale(.5, 0.3).refreshBody();//aparicion

    platforms.create(150,150,'ground').setScale(.5, 0.3).refreshBody();//arribaIz
    platforms.create(200,750,'ground').setScale(.5, 0.3).refreshBody();//abajoiz


    platforms.create(640,568,'ground').setScale(.5, 0.3).refreshBody();//aparicion
    platforms.create(750,150,'ground').setScale(.5, 0.3).refreshBody();//arribaIz
  
    platforms.create(350,368,'ground').setScale(.2, 0.3).refreshBody();//aparicion
    platforms.create(950,300,'ground').setScale(.3, 0.3).refreshBody();//aparicion

    platforms.create(980,768,'ground').setScale(.5, 0.3).refreshBody();//aparicion
    platforms.create(1300,168,'ground').setScale(.2, 0.3).refreshBody();//aparicion

    platforms.create(1350,668,'ground').setScale(.3, 0.3).refreshBody();//aparicion
    platforms.create(1370,468,'ground').setScale(.3, 0.3).refreshBody();//aparicion

    items.create(155,100,'salinas').setScale(.09, 0.09).refreshBody();//aparicion
    items.create(205,700,'chapo').setScale(.4, 0.3).refreshBody();//aparicion
    items.create(645,500,'mayo').setScale(.15, 0.15).refreshBody();//aparicion
    items.create(755,100,'chapo').setScale(.4, 0.3).refreshBody();//aparicion
    items.create(355,320,'salinas').setScale(.09, 0.09).refreshBody();//aparicion
    items.create(955,230,'mayo').setScale(.15, 0.15).refreshBody();//aparicion
    items.create(985,715,'chapo').setScale(.4, 0.3).refreshBody();//aparicion
    items.create(1305,120,'salinas').setScale(.09, 0.09).refreshBody();//aparicion
    items.create(1390,400,'mayo').setScale(.15, 0.15).refreshBody();//aparicion
    items.create(1330,620,'chapo').setScale(.4, 0.3).refreshBody();//aparicion
    



    
    platforms.create(40,820,'ground').setScale(10, 0.3).refreshBody().setVisible(false);
    corazon1=corazones.create(1200,23,'corazon').setScale(.3,0.3).refreshBody().setVisible(true);
    corazon2=corazones.create(1300,23,'corazon').setScale(.3,0.3).refreshBody().setVisible(true);
    corazon3=corazones.create(1400,23,'corazon').setScale(.3,0.3).refreshBody().setVisible(true);
  
    

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
        repeat: 10,
        setXY: { x: 42, y: 0, stepX: 150 }
    });
    
    stars.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.setScale(0.5);
    
    });
    bombs=this.physics.add.group();
    morenas=this.physics.add.group();
    camionetas=this.physics.add.group();

    if(camionetascreadas==false){
        camioneta1=camionetas.create(1550,16,'camioneta');
       camioneta1.setScale(0.3);
       camioneta1.setBounce(1);
       camioneta1.setCollideWorldBounds(true);
       camioneta1.setVelocityX(0);
       camioneta1.setVelocityY(50);
       camionetascreadas=true;
   }
   this.time.addEvent({
    delay: 2000, // cada 2000 ms (2 segundos)
    callback: camionetadisparo,
    callbackScope: this,
    loop: true
    });

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' });
    this.physics.add.collider(player,platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs,platforms);
    this.physics.add.collider(morenas,platforms);
    this.physics.add.collider(camionetas,platforms);


    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
    this.physics.add.collider(balacamioneta, player, hitplayer, null, this);
    this.physics.add.collider(bala, items, hitItems, null, this);
    

        
}
function update(){
    if(gameOver && vidas==0){
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
        if(this.input.keyboard.checkDown(cursors.space,500)){
            
            disparar();

        }
        

      
        
    
        
        // if (player.y > 600) {
        //     this.scene.restart();
        //     score = 0;
        //     gameOver = false;
        // }
    
}
function collectStar(player,star){
    star.disableBody(true,true);
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
        
        
        

    }
    
}
function hitBomb (player, bomb)
{
        
    if(vidas==3){
        bomb.disableBody(true, true);
        corazon3.setVisible(false);
        vidas--;
        console.log(vidas)

    }else if(vidas==2){
        bomb.disableBody(true, true);
        corazon2.setVisible(false);
        vidas--;
        console.log(vidas)

    }else if(vidas ==1) {
        bomb.disableBody(true, true);
        corazon1.setVisible(false);
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

function hitplayer(player,balacamioneta){
    if(vidas==3){
        balacamioneta.disableBody(true, true);
        corazon3.setVisible(false);
        vidas--;
        console.log(vidas)

    }else if(vidas==2){
        balacamioneta.disableBody(true, true);
        corazon2.setVisible(false);
        vidas--;
        console.log(vidas)

    }else if(vidas ==1) {
        balacamioneta.disableBody(true, true);
        corazon1.setVisible(false);
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
function hitItems(bala,items){
    score+=30
    scoreText.setText('Score: '+score)
    items.disableBody(true,true)
    bala.disableBody(true,true)
}
function disparar(){
  
    var direccion = 0; 

    if (cursors.right.isDown) {
        direccion = 1;
    } else if (cursors.left.isDown) {
        direccion = -1;
    } else {
        direccion=1; // aqui lo igualamos a 1 por que siempre voltea pa la derecha 
    }


    var nuevabala = bala.get(player.x, player.y, direccion === 1 ? 'bala' : 'balaIzq');//wachamos y usamos la direccion de donde esta volteando


    nuevabala.setScale(0.2, 0.1);
    nuevabala.setActive(true);
    nuevabala.setVisible(true);
    nuevabala.body.enable=true;
    nuevabala.setVelocityX(direccion * 400); 
    nuevabala.setVelocityY(0);
    nuevabala.allowGravity = false;

       
    
    
}
function camionetadisparo(){
  
    let balaNueva = balacamioneta.get(camioneta1.x, camioneta1.y, 'balaIzq');
    if(balaNueva){
        balaNueva.setVelocityX(-200);
        balaNueva.setScale(0.2, 0.1);
        balaNueva.setActive(true);
        balaNueva.setVisible(true);
        balaNueva.body.enable=true;
        balaNueva.setVelocityY(0);
        balaNueva.allowGravity = false;
    }else{
        console.log("la bala no se ha generado")
    }
    

       
    
    
}

