c = document.getElementById("myCanvas");


ctx = c.getContext("2d");

var canvasWidth = c.width;
var canvasHeight = c.height;

var dvdWidth = 128;
var dvdHeight = 65;
var bdWidth = 128;
var bdHeight = 70;
var i; //im guessing this is a nightmare

function run() {
    requestAnimationFrame(run);


    gameState.update();
    gameRender.draw(gameState);
    gameInput.updateCursorHover();

    
}


//Initialise
var gameState = new TurquoiseState();

let dvdSpawner = new BouncyImageSpawner(dvdWidth, dvdHeight, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/DVD_logo.svg/320px-DVD_logo.svg.png", 10, "dvd");
let bdSpawner = new BouncyImageSpawner(bdWidth, bdHeight, "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Blu_ray_logo.png/320px-Blu_ray_logo.png", 10, "bd");

let bouncyScene = new Scene("BouncyScene", [], [dvdSpawner, bdSpawner]);
bouncyScene.spawn();
gameState.addScene(bouncyScene);

let gameRender = new TurquoiseRender(c, ctx);
let gameInput = new TurquoiseInput(c, gameState);


//console.log(gameState.getGobjects());

run();


