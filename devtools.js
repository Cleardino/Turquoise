//(I know this file is a nightmare. - Elliot)

var developerModes = {makeClickShape: false, moveMode: false};
var developerModeVariables = {freeze: false, relativeX: null, relativeY: null, generateClickShapePoints: false, generatedPoints: "", objectBeingSelected: null, oldpx: null, oldpy: null, numberOfPoints: 0, firstpx: null, firstpy: null, selectedObjHeight: null, selectedObjWidth: null, exitClickboxMakerNextClick: false, movingObject: false};

function giveDevToolsObjectClicked(objClicked) {
    if (developerModes.makeClickShape) {
        //console.log("devclick");
        if (developerModeVariables.objectBeingSelected == null) {
            //console.log("knew it was null");
            if (objClicked.clickShapePoints.length > 0) {
                //let displayClickbox = this.getRelativeClickShapeFromPoints(this.clickShapePoints);
                objClicked.relativeClickshape.draw();
                console.log(objClicked.name + "'s current Clickbox has " + objClicked.clickShapePoints.length + " points.");
            }
            else {
                console.log("This SpriteObject has no Clickbox yet.");
            }
            console.log('Click on the object again to continue.');
            developerModeVariables.freeze = true;
            c.style.cursor = "auto";
            runSettings.customCursors = false;
            developerModeVariables.objectBeingSelected = objClicked;
            //console.lo
        }
        else if (developerModeVariables.objectBeingSelected = objClicked && (!developerModeVariables.generateClickShapePoints)) {
            ctx.clearRect(0, 0, c.width, c.height);
            console.log("Making new Clickbox... \nNote: The more points a Clickbox has, the more taxing it will be on performance.");
            ctx.drawImage(objClicked.getImage(), Math.round(objClicked.position.x), Math.round(objClicked.position.y), objClicked.width, objClicked.height);
            ctx.fillText("Developer Mode: Make Clickbox", 10, 10);
            ctx.fillText("Open the web console.", 10, 20);
            //ctx.beginPath();
            //ctx.rect(0, 0, 150, 100);
            //ctx.stroke;
            ctx.fillText("____________________________", 10, 300);
            ctx.fillText("____________________________", 10, 340);
            ctx.fillText("Click here to reconnect to first point", 10, 320);
            ctx.fillText(" and complete Clickbox", 10, 330);
            //let finish = new Image(100, 35);
            //finish.src = "images/mouse.png";
            //ctx.drawImage(finish, 10, 30, 100, 35)
            developerModeVariables.relativeX = Math.round(objClicked.position.x);
            developerModeVariables.relativeY = Math.round(objClicked.position.y);
            //console.log(developerVariables.relativeX);
            developerModeVariables.generateClickShapePoints = objClicked;
            developerModeVariables.generatedPoints = "[";
            developerModeVariables.selectedObjHeight = objClicked.height;
            developerModeVariables.selectedObjWidth = objClicked.width;
            gameState.interactable = objClicked;
            console.log("Now click to place the first point of the new Clickbox.");
        } 
    }
    if(developerModes.moveMode) {
        console.log("Click anywhere to move this object there.");
        developerModeVariables.freeze = true;
        developerModeVariables.movingObject = true;
        developerModeVariables.objectBeingSelected = objClicked;
        gameState.interactable = false;
        c.style.cursor = "auto";
        runSettings.customCursors = false;
    }
}

function giveDevToolsClickEvent(clicked) {
    if (developerModeVariables.generateClickShapePoints) {
        this.c.style.cursor = "auto";
        //developerModeVariables.objectBeingSelected.onClickOrTap();
        if(developerModeVariables.exitClickboxMakerNextClick) {
            developerModeVariables = {freeze: false, relativeX: null, relativeY: null, generateClickShapePoints: false, generatedPoints: "", objectBeingSelected: null, oldpx: null, oldpy: null, numberOfPoints: 0, firstpx: null, firstpy: null, selectedObjHeight: null, selectedObjWidth: null, exitClickboxMakerNextClick: false};
            //developerModeVariables.generateClickShapePoints = false;
            developerModes.makeClickShape = false;
            //developerModeVariables.freeze = false;
            gameState.interactable = true;
        } else {
            let newpx = (clicked.x - developerModeVariables.relativeX);
        let newpy = (clicked.y - developerModeVariables.relativeY);
        
        
        if(isPositionWithinRectangle(new Position(clicked.x, clicked.y), 10, 178, 301, 342)) {
            //console.log("finish");
            let drawFromX = (developerModeVariables.oldpx + developerModeVariables.relativeX);
            let drawFromY = (developerModeVariables.oldpy + developerModeVariables.relativeY);
            let drawToX = (developerModeVariables.firstpx + developerModeVariables.relativeX);
            let drawToY = (developerModeVariables.firstpy + developerModeVariables.relativeY);
            ctx.beginPath();
            ctx.moveTo(drawFromX,drawFromY);
            ctx.lineTo(drawToX, drawToY);
            ctx.stroke();
            console.log("New Clickbox completed. It has " + developerModeVariables.numberOfPoints + " points.");
            console.log("Copy the below Array to somewhere safe, and replace this Object's Clickbox with it manually.")
            developerModeVariables.generatedPoints = developerModeVariables.generatedPoints.slice(0,-2);
            console.log(developerModeVariables.generatedPoints.concat("]"));
            console.log("Click anywhere to resume game loop.");
            developerModeVariables.exitClickboxMakerNextClick = true;

        } else {

            if(developerModeVariables.generatedPoints == "[") {
                console.log("Started Clickbox. Keep clicking to add more points. When you are finished click the button in the bottom left to connect the last point to the first point.");
                developerModeVariables.firstpx = newpx;
                developerModeVariables.firstpy = newpy;
            }
            if(false) { //set this to true to lock within image dimensions, TODO make this automatic
                if (newpx < 0) {
                    newpx = 0;
                }
                if (newpy < 0) {
                    newpy = 0;
                }
                if (newpy > developerModeVariables.selectedObjHeight) {
                    newpy = developerModeVariables.selectedObjHeight;
                }
            }
            
            //console.log("heihgt" + developerModeVariables.objectBeingSelected.height);
            if (newpx > developerModeVariables.selectedObjWidth) {
                newpx = developerModeVariables.selectedObjWidth;
            }
            if ((developerModeVariables.oldpx !== null) && (developerModeVariables.oldpy !== null)) {
                ctx.beginPath();
                //console.log(developerModeVariables.oldpx);
                let drawFromX = (developerModeVariables.oldpx + developerModeVariables.relativeX);
                let drawFromY = (developerModeVariables.oldpy + developerModeVariables.relativeY);
                let drawToX = (newpx + developerModeVariables.relativeX);
                let drawToY = (newpy + developerModeVariables.relativeY);
                //console.log("dfx" + drawFromX);
                //console.log("dfx" + drawFromY);
                //console.log("dtx" + drawToX);
                //console.log("dty" + drawToY);
                ctx.moveTo(drawFromX,drawFromY);
                ctx.lineTo(drawToX, drawToY);
                ctx.stroke();

                //ctx.beginPath();
                //console.log(developerModeVariables.oldpx);
                //ctx.moveTo(10,10);
                //ctx.lineTo(100,100);
                //ctx.stroke();

                //console.log("I just drew");
            } 
            developerModeVariables.generatedPoints = developerModeVariables.generatedPoints.concat("[" + newpx + ", " + newpy + "], ");
            developerModeVariables.numberOfPoints++;
            console.log(developerModeVariables.numberOfPoints + " Clickbox points so far: "+developerModeVariables.generatedPoints.concat("..."));
            developerModeVariables.oldpx = newpx;
            developerModeVariables.oldpy = newpy;
        }
        }
        

        

        

    }
    if(developerModeVariables.movingObject) {
            //console.log(developerModeVariables.objectBeingSelected);
            console.log("("+clicked.x+", "+clicked.y+")");
            developerModeVariables.objectBeingSelected.visibile = false;
            gameRender.draw(gameState);
            developerModeVariables.objectBeingSelected.visibile = true;
            developerModeVariables.objectBeingSelected.draw(clicked.x, clicked.y);
            //ctx.drawImage(developerModeVariables.objectBeingSelected.getImage(), clicked.x, clicked.y, developerModeVariables.objectBeingSelected.width, developerModeVariables.objectBeingSelected.height);
            //developerModeVariables.objectBeingSelected.visibile = true;
    }
}


function giveDevtoolsKeyEvent(event) {
    if (event.key == "c") {
        console.log("Make ClickShape Mode Activated on next Object clicked.");
        developerModes.makeClickShape = true;
    }
    if (event.key == 'm') {
        console.log("Move Object Mode Activated on next Object clicked");
        developerModes.moveMode = true;
    }
    if (event.key ==="Escape") {
        developerModeVariables = {freeze: false, relativeX: null, relativeY: null, generateClickShapePoints: false, generatedPoints: "", objectBeingSelected: null, oldpx: null, oldpy: null, numberOfPoints: 0, firstpx: null, firstpy: null, selectedObjHeight: null, selectedObjWidth: null, exitClickboxMakerNextClick: false};
            developerModes.makeClickShape = false;
            developerModes.moveMode = false;
            gameState.interactable = true;
    }
}
