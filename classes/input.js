var hover = new Position(-1, -1); //these public variables aren't ideal, for some reason this made it work
var cursorSetToHovering = false;

class TurquoiseInput {
    constructor(c, gameState) {
        this.c = c;
        this.gameState = gameState;

        c.addEventListener('click', function(event) {
            updateGlobalCanvasPositionAndSizeCache();
            //let xClicked = getXFromEvent(event);
            //let yClicked = getYFromEvent(event);
            let clicked = getPositionFromEvent(event);
            //console.log(xClicked);
            //console.log(yClicked);
            
            let clickActioned = false;
        
            //console.log(gameState.getGobjects());
        
            for (var i = (gameState.getGobjects().length - 1); (i > -1) && (!clickActioned); i--) {
                if (gameState.getGobjects()[i].doCoordsCollideWithThis(clicked) && gameState.getGobjects()[i].interactable){
                    gameState.getGobjects()[i].onClickOrTap();
                    clickActioned = true;
                }
            }
        
        }, false);

        c.addEventListener('mousemove', function(event) {
            //hoverX = getXFromEvent(event);
            //hoverY = getYFromEvent(event);
            hover = getPositionFromEvent(event);
            //console.log(this.hoverX);
            //console.log(this.hoverX+", "+this.hoverY);
        }, false);
    }
    

    updateCursorHover() {
        this.hovering = false;
        if ((hover.x > -1) && (hover.y > -1)) {
            for (var i = 0; i < gameState.getGobjects().length; i++) {
                //console.log(gameState.getGobjects()[i]);
                //console.log(hoverX + ", " + hoverY);
                if ((gameState.getGobjects()[i].doCoordsCollideWithThis(hover))){
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
                if (!cursorSetToHovering) {
                    this.c.style.cursor = "pointer";
                    cursorSetToHovering = true;
                }
                
            } else {
                if (cursorSetToHovering) {
                    this.c.style.cursor = "auto";
                    cursorSetToHovering = false;
                }
                
            }
        }
        
    }

}