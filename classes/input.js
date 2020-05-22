class TurquoiseInput {
    constructor(c, gameState) {
        this.c = c;
        this.gameState = gameState;
        this.hover = new Position(-1, -1);
        this.cursorSetToHovering = false;
        var self = this;

        c.addEventListener('click', function(event) {
            updateGlobalCanvasPositionAndSizeCache();
            //Eventually skip reading clicks if hover is -1 -1, and set hover to -1 -1 every touchevent
            let clicked = getPositionFromEvent(event);
            //console.log(clicked);

            console.log(developerModeVariables.generateClickShapePoints);
            if (developerModeVariables.generateClickShapePoints) {
                developerModeVariables.objectBeingSelected.onClickOrTap();
                let newpx = (clicked.x - developerModeVariables.relativeX)
                let newpy =  (clicked.y - developerModeVariables.relativeY)
                if (newpx < 0) {
                    newpx = 0;
                }
                if (newpy < 0) {
                    newpy = 0;
                }
                if (newpy > developerModeVariables.objectBeingSelected.height) {
                    newpy = developerModeVariables.objectBeingSelected.height;
                }
                if (newpx > developerModeVariables.objectBeingSelected.width) {
                    newpx = developerModeVariables.objectBeingSelected.height;
                }
                developerModeVariables.generatedPoints = developerModeVariables.generatedPoints.concat("[" + newpx + ", " + newpy + "], ");
                console.log(developerModeVariables.generatedPoints);
            }

            self.forTopObjectAtPositionCallOnClick(clicked);
            // Idea for alternate place to do this logic?: self.gameState.getTopObjectAtPosition().onClickOrTap();
            
        }, false);

        c.addEventListener('mousemove', function(event) {
            self.hover = getPositionFromEvent(event);
            //console.log(self.hover);
            //examplePoint.x = self.hover.x;
            //examplePoint.y = self.hover.y;
            //console.log(line1.isTouchingPosition(examplePoint));
            //console.log(line1.isIntersecting(line2));
            //BELOW LINES ADDED FOR TESTING
            //line1.p2 = self.hover;
            
            //console.log(this.hoverX);
            //console.log(this.hoverX+", "+this.hoverY);
        }, false);

        //Below event for testing only
        /*document.addEventListener("keydown", function(event) {
            //console.log("ooh");
            if (event.key == "ArrowUp") {
                line1.p2 = self.hover;
            }
            if (event.key == "ArrowDown") {
                examplePoint.x = self.hover.x;
                examplePoint.y = self.hover.y;
            }
            
        })*/
    }
    
    

    forTopObjectAtPositionCallOnClick(clicked) {
        let clickActioned = false;
        //console.log(gameState.getGobjects());
        console.log(clicked);
        console.log(self.gameState);
        console.log(gameState);
        for (let i = (self.gameState.getGobjects().length - 1); (i > -1) && (!clickActioned); i--) {
            console.log("checked1");
            if (gameState.getGobjects()[i].doCoordsCollideWithThis(clicked) && gameState.getGobjects()[i].interactable) {
                gameState.getGobjects()[i].onClickOrTap();
                clickActioned = true;
            }
        }
        console.log("clickactioned" + clickActioned);
    }

    updateCursorHover() {
        this.hovering = false;
        if ((this.hover.x > -1) && (this.hover.y > -1)) {
            for (var i = 0; i < gameState.getGobjects().length; i++) {
                //console.log(gameState.getGobjects()[i]);
                //console.log(hoverX + ", " + hoverY);
                if ((gameState.getGobjects()[i].doCoordsCollideWithThis(this.hover))){
                    //console.log("hello");
                    if (this.gameState.getGobjects()[i].isRequestingHoverhand()) {
                        this.hovering = true;
                    }
                    this.gameState.getGobjects()[i].onMouseHover();
                    
                } 
                //console.log(this.hoverX + ", "+ this.hoverY);
                //console.log(gameState.getGobjects()[i].doCoordsCollideWithThis(this.hoverX, this.hoverY));
            }
            if (this.hovering) {
                if (!this.cursorSetToHovering) {
                    this.c.style.cursor = "pointer"; //pointer OR none
                    this.cursorSetToHovering = true;
                }
                
            } else {
                if (this.cursorSetToHovering) {
                    this.c.style.cursor = "auto"; //auto OR none
                    this.cursorSetToHovering = false;
                }
                
            }
        }
        
    }

}