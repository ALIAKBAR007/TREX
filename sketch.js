var play = 1
var end  = 0
var gameState = play

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,  cloud_Image
var score
var obstracle1
var obstracle2
var obstracle3
var obstracle4
var obstracle5
var obstracle6
var gameover
var restart, restart_image
var gameover, gameover_image
var jumpsound
var gameoversound
var milestonesound


function preload() {
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png")
  cloud_Image = loadImage("cloud.png")
  obstracle1 = loadImage("obstacle1.png")
  obstracle2 = loadImage("obstacle2.png")
  obstracle3 = loadImage("obstacle3.png")
  obstracle4 = loadImage("obstacle4.png")
  obstracle5 = loadImage("obstacle5.png")
  obstracle6 = loadImage("obstacle6.png")
  restart_image = loadImage("restart image.png")
  gameover_image = loadImage("gameover image.png")
  jumpsound = loadSound("smb_jump-super.wav")
  gameoversound = loadSound("smb_gameover.wav")
  milestonesound = loadSound("smb_coin.wav")
}

function setup() {
createCanvas(600, 200);

//create a trex sprite
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);  
trex.scale = 0.4;
  
//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);

 //restart button
restart = createSprite(320, 100, 30, 30)
restart.addImage("restart", restart_image)
restart.scale = 0.3 
  
  restart.visible = false
  
  
//gameover image
gameover = createSprite(230, 100, 30, 30)  
gameover.addImage("gameover", gameover_image)  
gameover.scale = 0.3
  
  gameover.visible = false
  
  
  // invisible ground
invisibleground = createSprite(200,190,400,10)

  
  invisibleground.visible=false
  
  var r = Math.round (random(1,100))
  console.log(r)
  
  
  trex.setCollider("circle", 0, 0, 30)
  trex.debug = false
  
  
   score = 0
  
  //grouping
  
  obstraclegroup = new Group()
  cloudgroup = new Group()
  
}

function draw() {
  
background("#A4B1BF");

  
  
  if(gameState === play)
    { 
      ground.velocityX = -(2 + 2 * score / 300);
      
      spawnClouds() 
      spawnObstracle()
      
      if (keyDown("space") && trex.y>75) {
  trex.velocityY = -10;
        
        jumpsound.play()
}
      
      if(score > 0 && score%500 === 0){
        
        milestonesound.play()
        
      }
      

trex.velocityY = trex.velocityY + 0.8

if (ground.x < 0) {
  ground.x = ground.width / 2;
}

trex.collide(invisibleground);
      
      score = score + Math.ceil(getFrameRate()/60)
      
      if(obstraclegroup.isTouching(trex))
        {
          gameState = end
          
          gameoversound.play()
          
        }
      
    }
  
  else if(gameState === end)
    {
     restart.visible = true
     gameover.visible = true 
      
     trex.changeAnimation("collided", trex_collided) 
      
      ground.velocityX = 0
     
      
      obstraclegroup.setLifetimeEach(-1)
      cloudgroup.setLifetimeEach(-1)
      
      obstraclegroup.setVelocityXEach(0)
      cloudgroup.setVelocityXEach(0)
      
      trex.collide(invisibleground);
    }
  
 
  text( " YOUR SCORE IS " + score,220, 15) 
  
//jump when the space button is pressed

if(mousePressedOver(restart)){

  reset()

}
  
drawSprites();
  
  
}

function spawnClouds()
{
  
  if(frameCount % 60===0)
  {
    cloud = createSprite(600, 100, 40, 40)
    cloud.velocityX = -2
    cloud.addImage(cloud_Image)
    cloud.scale = random(0.05,0.2)    
    cloud.y = random(10,60)
    
    //console.log(trex.depth)
    //console.log(cloud.depth)
    
    cloud.depth = trex.depth
    trex.depth = trex.depth + 2
    
    
    cloud.lifetime = 300
    
    cloudgroup.add(cloud)
    
    
  }
   

  
}

function spawnObstracle()
{
  
  if(frameCount%100===0)
    {
      
      var obstracle = createSprite(600, 170, 10, 40)
  obstracle.velocityX = -(3 + score / 300)
      
      obstracle.lifetime = 300
    
      
      var r = Math.round (random (1,6))
      switch(r)      
        {
          case 1 : obstracle.addImage(obstracle1)
          break;
          
          case 2 : obstracle.addImage(obstracle2)
          break;
          
          case 3 : obstracle.addImage(obstracle3)
          break;
          
          case 4 : obstracle.addImage(obstracle4)
          break;
          
          case 5 : obstracle.addImage(obstracle5)
          break;
          
          case 6 : obstracle.addImage(obstracle6)
          break;
          default:break;
        }
      
      obstracle.scale = 0.1
      
      obstraclegroup.add(obstracle)
      
      
    }
   
}

function reset (){
  
  gameState = play
  
  restart.visible=false
  gameover.visible=false
  
  obstraclegroup.destroyEach()
  cloudgroup.destroyEach()
  
  score = 0
  
}

