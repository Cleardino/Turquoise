class TurquoiseInput {
    constructor(c, gameState) {
        this.c = c;
        this.gameState = gameState;
        this.hover = new Position(-1, -1);
        this.cursorCSSStyleSetToHovering = false;
        var self = this;
        this.cursor = new Image();
        this.cursor.src = "images/cursor/macwhitestroke.png"
        this.hand = new Image();
        this.hand.src = "images/cursor/handv2.png"
        this.pointer = new Image();
        this.pointer.src = "images/cursor/macpointer.png"
        this.mouseDown = false;
        this.grabhand;
        this.doClosedHand = false;
        this.closedHand = new Image();
        this.closedHand.src = "images/cursor/machold.png"
        this.executeClick = false; //This allows click events to be cancelled if user leaves click area during cloesd hand
        this.objectLastClicked;
        this.objectLastHovering;
        this.isMouseDown = false;
        this.ongoingTouches = [];

        


        /*c.addEventListener('click', function(event) {
            event.preventDefault();
            updateGlobalCanvasPositionAndSizeCache();
            //Eventually skip reading clicks if hover is -1 -1, and set hover to -1 -1 every touchevent. Turns out this isn't necesary as this current setup doesn't produce click events on touch.
            if(self.executeClick) {
                let clicked = getPositionFromEvent(event);
                if(runSettings.developerMode) {
                     giveDevToolsClickEvent(clicked);
                }
            
            //console.log(clicked);
                let o = gameState.getTopObjectAtPositionIfInteractableElseFalse(clicked);
                if(o){
                    o.onClickOrTap();
                }
                //self.forTopObjectAtPositionCallOnClick(clicked);
                self.executeClick = false;
            }
            
            
            
            
            
            
            
            
            // Idea for alternate place to do this logic?: self.gameState.getTopObjectAtPosition().onClickOrTap();
            
        }, false);*/

        c.addEventListener('mousemove', function(event) {
            event.preventDefault();
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


        c.addEventListener('mousedown', e=> {
            if(this.grabhand) {
                this.doClosedHand = true;
            }
            this.isMouseDown = true;
            this.executeClick = true;
            let clicked = getPositionFromEvent(e);
            let o = gameState.getTopObjectAtPositionIfInteractableElseFalse(clicked);
                if(o){
                    o.onMouseOrTapDown();
                    this.objectLastClicked = o;
                }

            //I do this in multiple places to prevent it from mysteriously being overridden oops a bit messy
            if(runSettings.customCursors) {
                c.style.cursor = 'none';
            }
        });

        c.addEventListener('mouseup', e => {
            //console.log("mouseupdetected");
            this.doClosedHand = false;
            this.isMouseDown = false;
            let clicked = getPositionFromEvent(e);
            let o = gameState.getTopObjectAtPositionIfInteractableElseFalse(clicked);
            if(o) {
                if(o === this.objectLastClicked && this.executeClick) {
                    o.onClickOrTap();
                }
                
            }
            this.objectLastClicked = undefined;
            
            if(runSettings.developerMode) {
                giveDevToolsClickEvent(clicked);
           }
        });

        c.addEventListener('mouseenter', e => {
            if(runSettings.customCursors) {
                c.style.cursor = 'none';
            }
        });

        c.addEventListener('mouseleave', e => {
            this.doClosedHand = false;
            //console.log("bye");
            if(this.objectLastHovering) {
                this.objectLastHovering.onMouseEndHover();
                this.objectLastHovering.onMouseOrTapExit();
                if(this.isMouseDown) {
                    this.objectLastHovering.onClickOrTapExit(this.hover);
                    this.isMouseDown = false;
                }
                this.objectLastHovering = undefined;
            }
            this.hover.set(-1, -1);
        });

        c.addEventListener('touchstart', e => {
            e.preventDefault();
            updateGlobalCanvasPositionAndSizeCache();
            let touchStarts = e.changedTouches;
            //console.log(touchStarts);
            //console.log("touched");
            self.hover.set(-1, -1); //Stops doing any hovering/custom cursor logic until a future mousemove is detected

            for(let i = 0; i < touchStarts.length; i++) {
                let p = getPositionFromEvent(touchStarts[i]);
                let o = gameState.getTopObjectAtPositionIfInteractableElseFalse(p);
                self.ongoingTouches.push(copyTouchAndAppendObject(touchStarts[i], p, o));
                if(o){
                    o.onMouseOrTapDown();
                }
            }
            
            
            
        });

        c.addEventListener('touchmove', e => {
            e.preventDefault();
            let touches = e.changedTouches;
            for(let i = 0; i < touches.length; i++) {  
                let p = getPositionFromEvent(touches[i]);
                let idx = self.ongoingTouchIndexById(touches[i].identifier);
                if (idx >=0) {
                    self.ongoingTouches[idx].currentPosition = p;
                }
            }

        });

        c.addEventListener('touchend', e => {
            e.preventDefault();
            let touchEnds = e.changedTouches;
            for(let i = 0; i < touchEnds.length; i++) {
                let p = getPositionFromEvent(touchEnds[i]);
                let o = gameState.getTopObjectAtPositionIfInteractableElseFalse(p);
                let idx = self.ongoingTouchIndexById(touchEnds[i].identifier);
                if(idx >= 0) {
                    if(o && (self.ongoingTouches[idx].tapBeganOnObject === o)) {
                        o.onClickOrTap();
                    }
                    self.ongoingTouches.splice(idx, 1);
                }
            }

        });

        c.addEventListener('touchcancel', e => {
            e.preventDefault();
            let touchCancels = e.changedTouches;
            for(let i = 0; i < touchCancels.length; i++) {
                let idx = self.ongoingTouchIndexById(touchCancels[i].identifier);
                if(idx>= 0){ 
                    self.ongoingTouches.splice(idx, 1);
                }
            }
        });

        

        /*document.addEventListener('touchmove', e=> {
            e.preventDefault();
        });*/

        c.addEventListener('contextmenu', e => {
            e.preventDefault();
          });

        document.addEventListener("keydown", function(event) {
            event.preventDefault();
            if(runSettings.developerMode) {
                giveDevtoolsKeyEvent(event);
            }
        });
    }
    
    

   

/*     forTopObjectAtPositionCallOnClick(clicked) {
        let clickActioned = false;
        if (gameState.interactable) {
            for (let i = (self.gameState.getGobjects().length - 1); (i > -1) && (!clickActioned); i--) {
                if (gameState.getGobjects()[i].doCoordsCollideWithThis(clicked) && gameState.getGobjects()[i].interactable) {
                    gameState.getGobjects()[i].onClickOrTap();
                    clickActioned = true;
                }
            }
        }
    } */

    updateOngoingInput() {
        this.grabhand = false;
        this.pointerhand = false;
        if (this.usingMouse()) {
            
            let o = gameState.getTopObjectAtPositionIfInteractableElseFalse(this.hover);
            if(o){
                if(this.objectLastHovering==undefined) {
                    o.onMouseStartHover();
                }
                //o.onMouseHover();
                if(this.objectLastHovering && (o != this.objectLastHovering)) {
                    this.objectLastHovering.onMouseOrTapExit();
                    this.objectLastHovering.onMouseEndHover();
                    this.doClosedHand = false; //?????
                    //console.log("mousedown =" +this.mouseDown);
                    o.onMouseStartHover();
                    if(this.isMouseDown) {
                        this.executeClick = false;
                        this.objectLastHovering.onClickOrTapExit(this.hover);
                        //console.log("tried to disable closed hand");
                        this.doClosedHand = false;
                        this.isMouseDown = false; //recvent addition
                        
                    } 

                }
                this.objectLastHovering = o;
                if(this.objectLastHovering && this.objectLastClicked && this.objectLastHovering){
                    if(this.objectLastHovering != this.objectLastClicked) {
                        //this.objectLastClicked.onMouseOrTapExit();
                        //this.objectLastClicked.onMouseEndHover();
                        if(this.isMouseDown){
                            this.executeClick = false;
                            this.objectLastClicked.onClickOrTapExit(this.hover);
                            //console.log("tried to disable closed hand");
                            this.doClosedHand = false;
                            this.isMouseDown = false; // recent addition
                        }
                        this.objectLastClicked = undefined;
                    }
                }
                

                if(o.isRequestingHoverhand()){
                    this.grabhand = true;
                }
                if(o.isRequestingPointerhand()){
                    this.pointerhand = true;
                }
            } else {
                if(this.objectLastHovering) {
                    this.objectLastHovering.onMouseEndHover();
                    this.objectLastHovering.onMouseOrTapExit();
                    if(this.isMouseDown) {
                        this.executeClick = false;
                        this.objectLastHovering.onClickOrTapExit(this.hover);
                        this.doClosedHand = false;
                        this.isMouseDown = false; //recent addition
                        //console.log("tried to disable closed hand");
                    }
                } 
                this.objectLastHovering = undefined;
                this.grabhand = false;
            }

            /* for (var i = 0; i < gameState.getGobjects().length; i++) {
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
            } */
        }

        if(this.usingMouse()){ 
            if (runSettings.customCursors) { 
                this.drawCustomCursor();
            } else {
                this.updateCursorCSSStyle();
            }
        }

        for(let i = 0; i < this.ongoingTouches.length; i++) {
            let o = gameState.getTopObjectAtPositionIfInteractableElseFalse(this.ongoingTouches[i].currentPosition);
            if(this.ongoingTouches[i].tapBeganOnObject) {
                if(!(this.ongoingTouches[i].tapBeganOnObject === o)) {
                    this.ongoingTouches[i].tapBeganOnObject.onMouseOrTapExit();
                    this.ongoingTouches[i].tapBeganOnObject.onClickOrTapExit(this.ongoingTouches[i].currentPosition);
                    this.ongoingTouches[i].tapBeganOnObject = false; //at the moment, after touch leaves object it forgets what object it started with for simplicity until I really have a reason to remember that.
                }
            }
            
        }
        
    }


    updateCursorCSSStyle() {
        if (this.grabhand) {
            if (!this.cursorCSSStyleSetToHovering) {
                this.c.style.cursor = "pointer"; //pointer OR none
                this.cursorCSSStyleSetToHovering = true;
            }
        }
        else {
            if (this.cursorCSSStyleSetToHovering) {
                this.c.style.cursor = "auto"; //auto OR none
                this.cursorCSSStyleSetToHovering = false;
            }
        }
    }

    usingMouse() {
        return ((this.hover.x > -1) && (this.hover.y > -1)); //Returns true if a MouseMove event has happened since startup, or since a touch event.
    }

    drawCustomCursor() {
        if (this.grabhand && this.doClosedHand) {
            ctx.drawImage(this.closedHand, this.hover.x + 2, this.hover.y + 4, 13, 12);
        }
        else if (this.grabhand) {
            ctx.drawImage(this.hand, this.hover.x, this.hover.y, 16, 16);
        }
        else if (this.pointerhand){
            ctx.drawImage(this.pointer, this.hover.x, this.hover.y, 16, 16);
        } else {
            ctx.drawImage(this.cursor, this.hover.x, this.hover.y, 11, 16);
            if (this.doClosedHand) {
                this.doClosedHand = false;
                this.executeClick = false;
            }
        }
    }

    //This function is from https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
    ongoingTouchIndexById(idToFind) {
        for (var i = 0; i < this.ongoingTouches.length; i++) {
            var id = this.ongoingTouches[i].identifier;
            
            if (id == idToFind) {
              return i;
            }
          }
          return -1;    // not found
    }
}



//This function is based on https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
function copyTouchAndAppendObject({ identifier }, currentPosition, tapBeganOnObject = false) {
    return { identifier, currentPosition, tapBeganOnObject};
  }

/* class OngoingTouch{
    constructor(touchEvent, tapBeganOnObject = false) {
        this.touchEvent = touchEvent;
        this.tapBeganOnObject = tapBeganOnObject;
    }
} */