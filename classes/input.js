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
            if(runSettings.developerMode) {
                giveDevToolsClickEvent(clicked);
            }
            
            console.log("clicked");
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

        c.addEventListener('touchstart', e => {
            e.preventDefault();
            console.log("touched");
            console.log(e.cancelable);
            self.hover.set(-1, -1); // in future hide custom cursor
            
            console.log(event);
        }/*, {passive:false}*/);

        c.addEventListener('contextmenu', e => {
            e.preventDefault();
          });

        document.addEventListener("keydown", function(event) {
            if(runSettings.developerMode) {
                giveDevtoolsKeyEvent(event);
            }
        })
    }
    
    

   

    forTopObjectAtPositionCallOnClick(clicked) {
        let clickActioned = false;
        if (gameState.interactable) {
            for (let i = (self.gameState.getGobjects().length - 1); (i > -1) && (!clickActioned); i--) {
                if (gameState.getGobjects()[i].doCoordsCollideWithThis(clicked) && gameState.getGobjects()[i].interactable) {
                    gameState.getGobjects()[i].onClickOrTap();
                    clickActioned = true;
                }
            }
        }
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

