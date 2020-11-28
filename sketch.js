
var monkey , monkeyRunning, monkeyCollided;
var banana ,bananaImage, obstacle, obstacleImage
var  banana,bananaGroup, obstacleGroup;
var score;
var ground;
var invisibleGround;
var END;
var gameState;

function preload(){
  
  
  monkeyRunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}


function setup() {
createCanvas(400,400);  
  monkey = createSprite(20,300,20,20);
  monkey.addAnimation("monkey",monkeyRunning);
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(200,340,800,7);
  invisibleGround.visible = true;
   invisibleGround.velocityX = -3;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  END = 0;
  
  score = 0;
  
}


function draw() {
background("white");
  obstacles();
  bananas();
  
  textSize(20);
  text("score:" + score,300,100);
  
if (invisibleGround.x < 0){
  invisibleGround.x = invisibleGround.width/2;
   } 
  
if(keyDown("space")&&monkey.y >= 100){
  monkey.velocityY = -10;
}
  
  monkey.velocityY = monkey.velocityY + 0.5;
  
  monkey.collide(invisibleGround);
  
 if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
if(gameState === END){
  banana.velocityX = 0;
  obstacle.velocityX = 0;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  textSize(25);
  text("gameOver",200,200);  
}  
  
 drawSprites();
 
}

function obstacles(){
  if(frameCount % 200 === 0){
    obstacle = createSprite(Math.round(random(100,300)),320,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200
    obstacleGroup.add(obstacle);
  }
}

function bananas(){
if(frameCount % 100 === 0){
  banana = createSprite(400,220,20,20);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -4;
  bananaGroup.add(banana);
  }
}



