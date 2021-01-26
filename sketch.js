var mario,marioimg,peelimg,goombaimg,bg,bgimg,reset,resetimg,invisibleGround,stackimg,koopaimg,plantimg,stimg,obgroup,gamestate,go,mp,mpi,cp,d,di;
var PLAY=2;
var END=1;
var gamestate=2
var score

function preload(){
bgimg=loadImage("bg2.png")
marioimg=loadAnimation("mario1.png","mario2.png");
 goombaimg=loadImage("goomba1.png");
  stackimg=loadImage("stack.png");
  plantimg=loadImage("Plant.png");
  peelimg=loadImage("peell.png") ;      
  stimg=loadImage("st.png");
  koopaimg=loadImage("koopa.png");
 go=loadImage("gameover.jpg");
  resetimg=loadImage("re-1.png");
 mpi=loadImage("mp.png");
  cp=loadSound("ff447971-e47d-4355-9985-6e6eb47370f9.mp3");
    d=loadSound("e6d63e6c-93fc-405f-8c06-32c6b464a7d1.mp3");
  di=loadSound("d6e3d4ee-be8c-44d8-bb25-936ca05d00fb.mp3");
}

function setup() {
createCanvas(400,400);
  bg=createSprite(0,10,300,252);
 bg.addImage(bgimg);
  bg.scale=1;
  bg.velocityX=-2;
  bg.x=bg.width/2;
  
  gmo=createSprite(200,200,400,400);
 gmo.addImage(go);
  gmo.scale=0.5;
  
  
   mario=createSprite(40,325,30,50)
 mario.addAnimation("running",marioimg)
  mario.scale=0.1
  
  invisibleGround = createSprite(200,365,400,10);
  invisibleGround.visible = false;
  mario.debug=false;
  mario.setCollider("rectangle",0,0,50,mario.height);
  obgroup=createGroup();
   reset = createSprite(200,200,1,1);
  reset.addImage(resetimg)
  reset.scale=0.3
  
  mp = createSprite(125,20,1,1);
  mp.addImage(mpi)
  mp.scale=0.07
  score=0;
}

function draw() {

 if(gamestate===2) {
    background("white");
   mario.visible=true;
   bg.visible=true;
   gmo.visible=false;
  if(bg.x<0){
    bg.x=bg.width/2}
  
  if(keyDown("space") &&mario.y>230) {
    mario.velocityY=-12
    d.play()
  }
    if(score>0 && score %100 === 0){
       cp.play() 
    }
   
score = score + Math.round(getFrameRate()/60);
   reset.visible=false;
  spawnobstacles();
  if(obgroup.isTouching(mario)){gamestate=1;
                               di.play();}
 }
  mario.velocityY=mario.velocityY+0.8
 mario.collide(invisibleGround)
  
if (gamestate===1){
  bg.visible=false;
  gmo.visible=true;
  obgroup.destroyEach();
  bg.velocityX=0;
  mario.visible=false;
  reset.visible=true;
  
   if(mousePressedOver(reset)) {
       restart();
  
    }
}
 drawSprites();
  stroke("green");
textSize(15);
fill("orange");
text("survival time : "+ score,250,20)
     
}

function restart(){
  gamestate=2;
  score=0;
  bg.velocityX=-2;
  bg.x=bg.width/2
}

function spawnobstacles()
{var obstacles;
if(frameCount%80===0)
{obstacles=createSprite(400,325 ,30,50);
 obstacles.velocityX=-5
obstacles.scale=0.1 ;
var rand;
rand=Math.round(random(1,6));
switch(rand){
  case 1: obstacles.addImage(plantimg)
    break;
  case 2:obstacles.addImage(goombaimg)
    break;
  case 3:obstacles.addImage(stackimg)
    break;
  case 4:obstacles.addImage(peelimg)
    break;
  case 5:obstacles.addImage(stimg)
    break;
  case 6:obstacles.addImage(koopaimg)
    break;
  default:break;
}
obgroup.add(obstacles)}
}