//Setup Canvas
var c = document.getElementById("TurquoiseCanvas");
var ctx = c.getContext("2d");

var userIsUsingiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream; //this code detecting if user is on iOS is from Stack Exchange, but I think it's ok since its basically one line

//Game Settings
var runSettings = {developerMode: true, trueSize: false, customCursors: true};

//Global variables describing window size, canvas size, and how the canvas is being drawn in CSS
var canvasSize = {width: c.width, height: c.height};
var windowSize = {height: window.innerHeight, width: window.innerWidth};
var canvasPositionAndSizeInWindow; // Will contain left, top, width, height. Gets Updated at start, when the window is resized, and to fix problems on mobile every Click




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
    
}


//stackoverflow lock scroll code. Fixes bug if user adds to home screen on iOS. Actually I think this always happens?
/*if (userIsUsingiOS && window.navigator.standalone) {
  //console.log("standalone");
  //c.style.position = auto;
  document.body.style.position = 'fixed';//fixed
  document.body.style.top = `-${window.scrollY}px`; 

}*/






//console.log(spriteSheetMeta);

//Initialise
var gameState = new TurquoiseState();

var gameInput;

let gameRender = new TurquoiseRender(c, ctx);



if (!runSettings.trueSize) {
    scaleToWindow();
} else{
  c.style = "background-color: white"
}
updateGlobalCanvasPositionAndSizeCache();


if(runSettings.customCursors) {
  c.style.cursor = 'none';
}


let spriteSheet = new Image();
spriteSheet.src = "texture.png";
let spriteSheetMeta;
spriteSheet.onload = loadSpriteSheetJSONThenRun();


function loadSpriteSheetJSONThenRun() {
  fetch('texture.json').then(function (response) {
    return response.json();
  }).then(function (obj) {
    //console.log(obj);
    spriteSheetMeta = obj;
    gameInput = new TurquoiseInput(c, gameState);
    addContent(gameState);
    run();
  }).catch(function (error) {
    console.error(error);
  });
}
