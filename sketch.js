//create global variable for gameState;
var gameState;
var PLAY=1;
var END=0;
//create global variable for food group and bananaImage 
var foodGroup,bananaImage;
//create global variable for obstacles group and obstacleImage; 
var obstaclesGroup,obstacleImage;
//create global variable for backgroundImage 
var backgroundImage,backGround;
//create global variable for score
var score;
//create global variable for monkey and monkey_running 
var monkey,monkey_running;
//create global variable for invisibleGround
var invisibleGround;

function preload(){
  //to loadImage for backgroundImage 
  backgroundImage=loadImage("jungle2.jpg");
  

  
   //to loadAinmation for monkey_running
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
   //to loadImage for bananaImage 
  bananaImage=loadImage("Banana.png");
  
   //to loadImage for obstcaleImage 
  obstacleImage=loadImage("stone.png");
}  


function setup() {
    //to create canvas
    canvas = createCanvas(displayWidth,displayHeight-150);

  
     backGround=createSprite(400,400,20,20);

     //to create sprite for monkey
     monkey = createSprite(100,displayHeight-200,20,20);

     //to set scale for monkey
     monkey.scale=0.1;
  
    monkey.setCollider("circle",0,0,250);
    monkey.debug=true;

     //to add animation for monkey
     monkey.addAnimation("running", monkey_running);

      //to create sprite for invisibleGround
     invisibleGround = createSprite(100,displayHeight-200,800,10);

     //to set velocity for invisibleGround
     invisibleGround.velocityX=-4

     //to make invisibleGround invisible
     invisibleGround.visible = false;
  
     invisibleGround.x=invisibleGround.width/2;


     //to set initial score as 0
     score = 0;

     //to create obstaclesGroup
     obstaclesGroup=new Group();

     //to create foodGroup
     foodGroup=new Group();
      gameState=PLAY;
  
  }

 
function draw() {
  //to set background
  background(220);

  camera.position.x=displayWidth/2; 
  
  if (gameState===PLAY) {
    
     switch(score){
      case 1:monkey.scale=0.10;
        break;
      case 2:monkey.scale=0.11;
        break;
      case 3:monkey.scale=0.12;
        break;  
      case 4:monkey.scale=0.13;
        break;  
        default: break;          
    }    
      //to increase score by 2 if mokey is touching foodGroup
  if (monkey.isTouching(foodGroup)) {
      score=score+2;  
   }   
    
     if(keyDown("space") && monkey.y >= displayHeight-250){
    monkey.velocityY = -12 ;
    } 
    
    //to add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if (invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2;
    }
      //to increase monkey scale by 0.05 if monkey is touching foodGroup
 // if (foodGroup.isTouching(monkey)) {
  //    monkey.scale=monkey.scale+0.001
  //    foodGroup.destroyEach();
  //}
    //to set monkey's original scale if monkey is touching foodGroup
  if (monkey.isTouching(obstaclesGroup)) {
      monkey.scale=0.1;
      gameState=END;
    }
    
    for (var i = 0; i < foodGroup.length; i++) {
      if (foodGroup.get(i).isTouching(monkey)) {
        foodGroup.get(i).destroy();
        score= score+0;
      }
    }   
    
     //to call spawnObstacles and food function
  spawnObstacles();
  food();
} else if(gameState===END) {
          //set velocity of each game object to 0
      monkey.velocityY=0;
      invisibleGround.velocityX=0;
      foodGroup.setVelocityXEach(0);
      obstaclesGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
  }
  
  backGround.addImage(backgroundImage); 
  backGround.scale=1.1;
  
 
    
  //to  make the monkey collide with invisbleGround
  edges=createEdgeSprites();
  monkey.collide(invisibleGround);  
  
 
  
  //to display
  drawSprites();
  
  fill("blue")
   //to show text   
  text("Score: "+ score, 300, 100);
}

function spawnObstacles() {
if (World.frameCount % 100 === 0) {
    //to create sprite for obstacle
    var obstacle = createSprite(920,displayHeight-210,20,20);
    
     //to set animation for obstacle
    obstacle.addImage(obstacleImage);
    
    //to set scale for obstacle
    obstacle.scale = 0.1;
    
    //to set velocity for obstacle
    obstacle.velocityX =  -(8+(10*score/100));
    
     //assign lifetime to the variable
    obstacle.lifetime = 134;
    
    //add each cloud to the group
    obstaclesGroup.add(obstacle);
  }
}

function food() {
if (World.frameCount % 80 === 0) {
    //to create sprite for banana
    var banana = createSprite(950,400,20,20);
    
    //generate random obstacles
    banana.y = Math.round(random(displayHeight-300,displayHeight-350));
    
    //to set animation for banana
    banana.addImage(bananaImage);
    
    //ot set scale for banana
    banana.scale = 0.05;
    
    //to set velocity
    banana.velocityX = -(8+(3*score/100));
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    //add each cloud to the group
    foodGroup.add(banana);
  }
}