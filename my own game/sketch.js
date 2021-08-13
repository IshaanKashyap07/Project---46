var bird, birdFlying;
var helicopter, helicopterGroup;
var platform,platformGroup;
var spring;

function preload(){
  birdFlying = loadImage("Images/flyingBird.png")
  fallingBird = loadImage("Images/fallingBird.png")
  deadBird = loadImage("Images/deadBird.png")
  jumpBird = loadImage("Images/jumpBird.png")

  helicopter1 = loadImage("Images/helicopter1.png")
  helicopter2 = loadImage("Images/helicopter2.png")
  helicopter3 = loadImage("Images/helicopter3.png")
  helicopter4 = loadImage("Images/helicopter4.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  bird = createSprite(windowWidth/2,windowHeight/2);
  bird.addImage("birdFlying",birdFlying);
  bird.addImage("fallingBird",fallingBird);
  bird.addImage("deadBird",deadBird);
  bird.addImage("jumpBird",jumpBird);
  
  bird.scale = 0.3
  bird.velocityY = -10
  
  helicopterGroup = new Group()
  platformGroup = new Group()
  
  spawnPlatform()
  }
  
function draw(){
  background(221)
 bird.changeImage("birdFlying")
  if(keyDown(LEFT_ARROW)){
    bird.x = bird.x-5
  }

  if(keyDown(RIGHT_ARROW)){
    bird.x = bird.x+5
  }
  if(bird.isTouching(platformGroup)){
    bird.velocityY = -15
    bird.changeImage("jumpBird")
  }
  bird.velocityY = bird.velocityY+0.5

  if(bird.isTouching(helicopterGroup)){
    bird.changeImage("deadBird")   
  }

  if(bird.y < 0 ){
    spawnPlatform();
  }

  spawnHelicopters();
  drawSprites();
}

function spawnPlatform(){
   for(var i = 50; i<=windowHeight-50; i += 60){
    platform = createSprite(random(50,windowWidth-50),i,100,20)
    //platform.addImage()
    platformGroup.add(platform)
 }

}

function spawnHelicopters(){
  if(World.frameCount%100 === 0){
    var select = Math.round(random(1,2))
    if(select === 1){
      helicopter = createSprite(0,random(0,windowHeight/2),100,30)
      helicopter.velocityX = 5
    }
    else{
      helicopter = createSprite(width,random(0,windowHeight/2),100,30)
      helicopter.velocityX = -5
    }
    helicopter.lifetime = width/5
    helicopterGroup.add(helicopter)
  }

}