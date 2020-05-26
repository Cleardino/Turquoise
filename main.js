var c = document.getElementById("TurquoiseCanvas");
var ctx = c.getContext("2d"); //removing var shouldn't break it
//var trueSize = true;
var userIsUsingiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; //this code detecting if user is on iOS is from Stack Exchange, but I think it's ok since its basically one line
//console.log(iOS);
var runSettings = {developerMode: true, trueSize: false, customCursors: true};

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
      gameInput.updateOngoingInput();
      
      //ctx.filter = 'url(#remove-alpha)';
      //ctx.font = "16px ChiKareGo2";
      //ctx.fillText("oh myyy goood im so glad this works", 12, 40);
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


//stackoverflow lock scroll code. Fixes bug if user adds to home screen on iOS. Actually I think this always happens?
/*if (userIsUsingiOS && window.navigator.standalone) {
  //console.log("standalone");
  //c.style.position = auto;
  document.body.style.position = 'fixed';//fixed
  document.body.style.top = `-${window.scrollY}px`; 

}*/


//Initialise
var gameState = new TurquoiseState();

//let dvdSpawner = new BouncyImageSpawner(dvdWidth, dvdHeight, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/DVD_logo.svg/320px-DVD_logo.svg.png", 10, "dvd");
//let bdSpawner = new BouncyImageSpawner(bdWidth, bdHeight, "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Blu_ray_logo.png/320px-Blu_ray_logo.png", 10, "bd");
let marioSpawner = new BouncyImageSpawner(15, 28, "images/mario.png", 10, "mario");

let texBox = [[55, 1], [101,1], [101,36], [191, 54], [192, 83], [199, 100], [193, 124], [150, 154], [142, 169], [146, 190], [140, 194], [115, 184],[108, 163],[ 91, 140], [79, 124], [61, 124], [54, 137], [30, 121], [29, 115], [1, 82], [54, 81]];

//console.log(texBox.length);

let texas = new BouncyImageSpawner(200, 195, "images/texas.png", 3, "texas", 8, texBox);

//texas.clickShapeNums = texBox;
//console.log(texas.clickShapeM);

let examplePoint = new Point(10,10);
//let line1 = new Line(new Position(10,10), new Position(20, 200));
//let line2 = new Line(new Position(150,150), new Position(5, 20));
//let line3 = new Line(new Position(80,70), new Position(100,50));
//let testswitch = new BetterTestSwitch("switch1", new Position(500,0));
//let testswitch = new TwoStateSpriteObject("switch1", new Position(500,0), 150, 150, "images/switch/switch1.png", "images/switch/switch5.png", ["images/switch/switch2.png","images/switch/switch3.png","images/switch/switch4.png"]);

//let testswitch = new TwoStateSpriteObject("switch1", new Position(500,0), 150, 150, "images/switch/switch1.png", "images/switch/switch5.png", ["images/switch/switch2.png","images/switch/switch3.png","images/switch/switch4.png"], 5, [[54, 61], [124, 91], [111, 146], [75, 150], [4, 115], [2, 82], [9, 15], [35, 13]], [[6, 104], [6, 82], [29, 63], [81, 85], [119, 49], [136, 59], [133, 81], [112, 136], [102, 150], [91, 150]]);
let testswitch = new DragSwitch(new Position(500,0));
//let testswitch2 = new BetterTestSwitch("switch2", new Position(500,200));
let mouse = new SpriteObject("mouse", new Position(138,0), 385, 270, "images/mouse.png");
let triangle = new Shape([new Point(517, 124), new Point(512, 180), new Point(416, 156)]);

let title = new SpriteObject("title", new Position(128,254), 378, 81, "images/Fromagerie.png");
let playButton = new PlayButton(new Position(185, 225));

//texasShape = new Shape([new Point(171,108), new Point(212,110), new Point(216,138), new Point(315,159),  new Point(324,221), new Point(268,255), new Point(267,293), new Point(236,287), new Point(196,225),new Point(170,225),new Point(160,235),new Point(107,188),new Point(171,188)]);



//console.log(line1.isIntersecting(line2));
let titleScreen = new Scene("TitleScreen", [title, mouse, playButton], [texas]);
titleScreen.spawn();

let bouncyScene = new Scene("BouncyScene", [testswitch/*,testswitch2,mouse*/], [/*dvdSpawner, bdSpawner, marioSpawner,texas*/]);
bouncyScene.spawn();
gameState.addScene(titleScreen);
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

if(runSettings.customCursors) {
  c.style.cursor = 'none';
}


run();




