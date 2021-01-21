var dog,dogIma, happyDog, database;
var foodS, foodStock;
var feed,addFood,fedTime,lastFed,foodObj;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500,500);

  foodObj= new Food();

  dog=createSprite(250,250,20,20);
  dog.addImage(dogImg);
  dog.scale=0.3;

  feed= createButton("feed the dog");
  feed.position();
  feed.mousePressed(feedDog);

  addFood= createButton("add food");
  addFood.position();
  addFood.mousePressed(addFood);


  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
}


function draw() { 
  background(46,139,87);
  
  fedTime= database.ref("FeedTime");
  fedTime.on("value",function(data){
lastFed = data.val;
  })

  fill(225);
  textSize(20);
  if(lastFed >=12){
    text("last Feed : 12 AM",350,30)
  }else{
    text("last Feed :"+lastFed+"AM",350,30); 
  }

  foodObj.display();
  drawSprites();
  
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:HTMLSourceElement()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



