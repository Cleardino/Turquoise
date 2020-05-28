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


//someday I will restrain the loop so that it's impossible to run faster than 60 times per second.
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
addContent(gameState);

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

//Someday I will make it wait for everything to load before running.
run();






