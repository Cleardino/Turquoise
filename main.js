var c = document.getElementById("TurquoiseCanvas");
var ctx = c.getContext("2d"); //removing var shouldn't break it
//var trueSize = true;

var runSettings = {developerMode: true, trueSize: true};

//Global variables describing window size, canvas size, and how the canvas is being drawn in CSS
var canvasSize = {width: c.width, height: c.height};
var windowSize = {height: window.innerHeight, width: window.innerWidth};
var canvasPositionAndSizeInWindow; // Will contain left, top, width, height. Gets Updated at start, when the window is resized, and to fix problems on mobile every Click


var dvdWidth = 128;
var dvdHeight = 65;
var bdWidth = 128;
var bdHeight = 70;

var framesDrawn = 0 ;
var time = new Date();

function run() {
    requestAnimationFrame(run);

    if (!developerModeVariables.freeze) {
      gameState.update();
      gameRender.draw(gameState);
      gameInput.updateCursorHover();
    }
    
    //examplePoint.draw();
    //line1.draw();
    //line2.draw();
    //triangle.draw();
    //texasShape.draw();
    //line3.draw();
    
    framesDrawn++;
    //time = time - new Date();
    //console.log(framesDrawn/60);
    
}





//Initialise
var gameState = new TurquoiseState();

//let dvdSpawner = new BouncyImageSpawner(dvdWidth, dvdHeight, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/DVD_logo.svg/320px-DVD_logo.svg.png", 10, "dvd");
//let bdSpawner = new BouncyImageSpawner(bdWidth, bdHeight, "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Blu_ray_logo.png/320px-Blu_ray_logo.png", 10, "bd");
let marioSpawner = new BouncyImageSpawner(15, 28, "images/mario.png", 10, "mario");

let texBox = [[55, 1], [101,1], [101,36], [191, 54], [192, 83], [199, 100], [193, 124], [150, 154], [142, 169], [146, 190], [140, 194], [115, 184],[108, 163],[ 91, 140], [79, 124], [61, 124], [54, 137], [30, 121], [29, 115], [1, 82], [54, 81]];

//console.log(texBox.length);

let texas = new BouncyImageSpawner(200, 195, "images/texas.png", 1, "texas", 8, texBox);

//texas.clickShapeNums = texBox;
//console.log(texas.clickShapeM);

let examplePoint = new Point(10,10);
let line1 = new Line(new Position(10,10), new Position(20, 200));
let line2 = new Line(new Position(150,150), new Position(5, 20));
let line3 = new Line(new Position(80,70), new Position(100,50));

let triangle = new Shape([new Point(517, 124), new Point(512, 180), new Point(416, 156)]);

//texasShape = new Shape([new Point(171,108), new Point(212,110), new Point(216,138), new Point(315,159),  new Point(324,221), new Point(268,255), new Point(267,293), new Point(236,287), new Point(196,225),new Point(170,225),new Point(160,235),new Point(107,188),new Point(171,188)]);



//console.log(line1.isIntersecting(line2));

let bouncyScene = new Scene("BouncyScene", [/*texas*/], [/*dvdSpawner, bdSpawner, */marioSpawner, texas]);
bouncyScene.spawn();
gameState.addScene(bouncyScene);

let gameRender = new TurquoiseRender(c, ctx);
let gameInput = new TurquoiseInput(c, gameState);
//gameInput.initialise();
//gameInput.initialise();


//console.log(gameState.getGobjects());
if (!runSettings.trueSize) {
    scaleToWindow();
}
updateGlobalCanvasPositionAndSizeCache();


//disable right click

//noContext = document.getElementById('noContextMenu');




run();




