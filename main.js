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

//Initialise
let gameState;
let gameInput;
let gameRender;


var framesDrawn = 0 ;
//var time = new Date();

let secsElapsed = 0;
let timeLastDrew = 0;
let currentTime = 0;
let dontRestrain = false;

function run(timeStamp) {
    requestAnimationFrame(run);
    if(timeStamp < 1000) {
      dontRestrain = true;
    } else{
      dontRestrain = false;
    }
    secsElapsed = (timeStamp - timeLastDrew)/1000;
    currentTime = timeStamp;
    //console.log(timeStamp);
    fps = Math.round(1 / secsElapsed); //not sure this works very well
    if (!developerModeVariables.freeze) {
      if(dontRestrain || (currentTime-timeLastDrew) > 15) {
        gameState.update();
        gameRender.draw(gameState);
        gameInput.updateOngoingInput();
        
        //console.log(currentTime-timeLastDrew);
        timeLastDrew = currentTime;
      }
      
      //ctx.filter = 'url(#remove-alpha)';
      //ctx.font = "16px ChiKareGo2";
      //ctx.fillText("oh myyy goood im so glad this works", 12, 40);
    }
    
    /* ctx.font = '25px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText("FPS: " + fps, 10, 30); */
    //draw();
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






if (!runSettings.trueSize) {
    scaleToWindow();
} else{
  c.style = "background-color: white"
}
updateGlobalCanvasPositionAndSizeCache();


if(runSettings.customCursors) {
  c.style.cursor = 'none';
}

let spriteSheetMeta;
let spriteSheet = new Image();
spriteSheet.src = "texture.png";
spriteSheet.onload = loadSpriteSheetJSONThenRun();


function initialise() {
  gameState = new TurquoiseState();
  gameInput = new TurquoiseInput(c, gameState);
  gameRender = new TurquoiseRender(c, ctx);
  addContent(gameState);
}

function loadSpriteSheetJSONThenRun() {
  fetch('texture.json').then(function (response) {
    return response.json();
  }).then(function (obj) {
    //console.log(obj);
    spriteSheetMeta = obj;
    initialise();
    run(0);
  }).catch(function (error) {
    console.error(error);
  });
}
