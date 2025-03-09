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


var game=new Phaser.Game(config);

function preload(){
    this.load.image('sky','images/trenmaya.jpeg');
    this.load.image('ground','images/bandera.png');
    this.load.image('star','images/dinero.png');
    this.load.image('bomb','images/pri.png');
    this.load.spritesheet('dude','images/amlo1.png',{frameWidth:54.2,frameHeight:49});

}
function create(){
    this.add.image(750,420,'sky').setDisplaySize(1800,840);
    // this.add.image(400,300,'star');
    platforms=this.physics.add.staticGroup();
    platforms.create(40,568,'ground').setScale(1, 0.3).refreshBody();
    platforms.create(900,150,'ground').setScale(1, 0.3).refreshBody();
    platforms.create(900,650,'ground').setScale(1, 0.3).refreshBody();

    platforms.create(500,420,'ground').setScale(1, 0.3).refreshBody();
    platforms.create(100,210,'ground').setScale(1, 0.3).refreshBody();
    platforms.create(1350,490,'ground').setScale(1, 0.3).refreshBody();
    platforms.create(40,820,'ground').setScale(10, 0.3).refreshBody().setVisible(false);
  


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

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.physics.add.collider(player,platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs,platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
}
function update(){
    if(gameOver){
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
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }