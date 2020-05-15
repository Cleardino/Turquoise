c = document.getElementById("myCanvas");
ctx = c.getContext("2d");

var h = window.innerHeight;
var w = window.innerWidth;

//c.style = "height: 100%; width:auto; border:1px solid #000000;";

//c.style = "width: 100%; border:1px solid #000000;";

//c.style = "height: 100%";

document.getElementById("myCanvas").style.width = 1000;

var canvasWidth = c.width;
var canvasHeight = c.height;
var windowHeight;
var windowWidth;

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

function scaleToWindow() {

    var h = window.innerHeight;
    var w = window.innerWidth;
    canvasDivided = canvasWidth/canvasHeight;
    windowDivided = w/h;
    //console.log(h);
    var hmm = (h/canvasHeight)*canvasWidth;
    //console.log(canvasDivided);
    //console.log(windowDivided);

    if (canvasDivided > windowDivided) {
        c.style = "width: 100%;"
    } else {
        c.style = "width: "+hmm.toString()+  "px;"
        //c.style = "width: 500px; border:1px solid #000000;"
    }
}



//Initialise
var gameState = new TurquoiseState();

//let dvdSpawner = new BouncyImageSpawner(dvdWidth, dvdHeight, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/DVD_logo.svg/320px-DVD_logo.svg.png", 10, "dvd");
//let bdSpawner = new BouncyImageSpawner(bdWidth, bdHeight, "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Blu_ray_logo.png/320px-Blu_ray_logo.png", 10, "bd");
let marioSpawner = new BouncyImageSpawner(15, 28, "images/mario.png", 10, "mario");


let bouncyScene = new Scene("BouncyScene", [], [/*dvdSpawner, bdSpawner, */marioSpawner]);
bouncyScene.spawn();
gameState.addScene(bouncyScene);

let gameRender = new TurquoiseRender(c, ctx);
let gameInput = new TurquoiseInput(c, gameState);


//console.log(gameState.getGobjects());

scaleToWindow();


window.addEventListener("orientationchange", function() {
    scaleToWindow();
  });

  window.addEventListener("resize", function() {
    scaleToWindow();
  });

//window.oneresize = function() {scaleToWindow();};

//window.addEventListener("resize", scaleToWindow());

run();


