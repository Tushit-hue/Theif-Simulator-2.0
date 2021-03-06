var path,boy,cash,diamonds,jwellery,sword,end;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY = 0
var END = 1
var gameState = PLAY



function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
 
  
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(windowWidth/2,windowHeight/2-100);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(windowWidth/2,windowHeight-70,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.1;
  
end = createSprite(windowWidth/2,windowHeight/2,20,20)
end.addAnimation("image",endImg)
end.visible = false
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
if (gameState === PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > windowHeight ){
    path.y = windowHeight/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection+=50
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection+=150

      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection+=100
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        treasureCollection = 0
        gameState = END
      

    }
  }
}
  
   if (gameState===END){
    cashG.destroyEach()
    diamondsG.destroyEach()
    jwelleryG.destroyEach()
    swordGroup.destroyEach();
     boy.destroy();
     path.x= windowWidth/2
     path.y= windowHeight/2
     end.visible = true
       

     
   }
  

 
drawSprites();
  
  
    
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,windowWidth-170,windowHeight-590);
  
 
  }
  
  




function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(windowWidth),windowHeight, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.22;
  cash.velocityY = 3;
  cash.lifetime = 250;
  cashG.add(cash);
  }
}


function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(windowWidth),windowHeight, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.05;
  diamonds.velocityY = 3;
  diamonds.lifetime = 250;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(windowWidth),windowHeight, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.23;
  jwellery.velocityY = 3;
  jwellery.lifetime = 250;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(windowWidth),windowHeight, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.15;
  sword.velocityY = 3;
  sword.lifetime = 250;
  swordGroup.add(sword);
  }
}