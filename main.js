c = document.getElementById("TurquoiseCanvas");
ctx = c.getContext("2d");


//Global variables describing window size, canvas size, and how the canvas is being drawn in CSS
var canvasSize = {width: c.width, height: c.height};
var windowSize = {height: window.innerHeight, width: window.innerWidth};
var canvasPositionAndSizeInWindow; // Will contain left, top, width, height


var dvdWidth = 128;
var dvdHeight = 65;
var bdWidth = 128;
var bdHeight = 70;

function run() {
    requestAnimationFrame(run);


    gameState.update();
    gameRender.draw(gameState);
    gameInput.updateCursorHover();
    
}

function scaleToWindow() {
    //console.log("helloworld");
    windowSize = {height: window.innerHeight, width: window.innerWidth}
    canvasDivided = canvasSize.width/canvasSize.height;
    windowDivided = windowSize.width/windowSize.height;
    //console.log(h);
    var hmm = (windowSize.height/canvasSize.height)*canvasSize.width;
    //console.log(canvasDivided);
    //console.log(windowDivided);

    
    //console.log(canvasScreenLeft);

    if (canvasDivided > windowDivided) {
        c.style = "width: 100%;"
    } else {
        c.style = "width: "+hmm.toString()+  "px;"
        //c.style = "width: 500px; border:1px solid #000000;"
    }
    let elem = c.getBoundingClientRect();
    canvasPositionAndSizeInWindow = {left: elem.left, top: elem.top, width: elem.width, height: elem.height }
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


run();


