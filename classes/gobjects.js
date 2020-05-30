/*Default Game Object*/
class SpriteObject {
    constructor(name, position, width, height, imgURL, clickShapeNums) {
        this.updateEveryFrame = true;
        this.name = name;
        this.position = position;
        if(imgURL) {
            this.img = [new Image()];
            this.img[0].src = imgURL;
        }
        this.frameIndex = 0; //This index determines the index to use with both ClickShape, and Animation Frames, so they aught to match if you need a unique clickshape every frame. This is a bad way of doing things.
        
        //Sprite Dimensions
        this.width = width;
        this.height = height;

        this.velocity = new Velocity(0,0);
        this.opacity = 1;
        this.visible;
        this.visibile = true;
        this.fadeOut;
        this.fadeOut = false;
        this.willDestroyWhenInvisible;
        this.willDestroyWhenInvisible = false;
        this.requestsDestroy;
        this.requestsDestroy = false;

        //If not interactable, no input functions will be caled
        this.interactable;
        this.interactable = true;
        this.fadeSpeed;

        //Bools to request different cursors
        this.hoverhand;
        this.hoverhand = false;
        this.pointerhand;
        this.pointerhand = false;
        this.ownerRequestsClosedHand;
        this.ownerRequestsClosedHand = false;

        this.clickRectanglePadding = 0;
        
        //(explained below)
        this.clickShapePoints = [];
        this.relativeClickshape;
        
        //If you set this to true, it will be moved on top of all other objects. Used when user drags objects.
        this.requestsTopBilling = false;
        this.beingGrabbed = false;

        //By default, an Object's Clickable area is a rectangle the size of its sprite. This can be padded outward by increasing this.clickRectanglePadding
        //Alternately, you can provide the Constructor with a "Clickshape", which is a polygon of any number of vertices, to serve as an objects clickable area.
        //It expects to receive a Clickbox as an array of arrays, which can be generated using the Devtools.
        //If you need an object to change its Clickshape depending on its state, you can provide the constructor with an array of Clickshapes, then it will use whatever clickshape is at the index of the animation frame it is currently on.

        //If only one Clickshape is provided, it puts it as the only element in an array, so that it can deal with it the same as an array of Clickshapes.
        if (clickShapeNums) {
            if (!(Array.isArray(clickShapeNums[0][0]))) {
                clickShapeNums = [clickShapeNums];

            } 
            //To make it easy to do math on a clickshape later, it converts it into an arrray of points.
            for(let o = 0; o < clickShapeNums.length; o++) {
                this.clickShapePoints.push([]);
                for(let i = 0; i < clickShapeNums[o].length; i++) {
                    this.clickShapePoints[o].push(new Point(clickShapeNums[o][i][0], clickShapeNums[o][i][1]))
                }
            }

        }
    }
    
    //Draws object to canvas. Called by GameRender on every object in the current scene every loop.
    draw(x = Math.round(this.position.x), y = Math.round(this.position.y)) {
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.getImage(), x, y, this.width, this.height);
        ctx.globalAlpha = 1;
    }

    getName() {
        return this.name;
    }

    //Called every loop by gameState
    update() {
        this.updatePosition();
        this.updateFadeout();
        
        //gameState.getGobjects
    }
    getImage() {
        return this.img[this.frameIndex];
    }
    updatePosition() {
        this.position.add(this.velocity);
    }
    updateFadeout() {
        if ((this.fadeOut == true) && (this.visibile)) {
            this.opacity = this.opacity - this.fadeSpeed;
            if (this.opacity < 0) {
                this.opacity = 0;
                this.visibile = false;
                if (this.willDestroy){
                    //TODO destroy from array. // Wait I think this is done by Gamestate atm
                }
                //console.log(this.isVisible());
            }
        }
        if ((!this.visibile) && this.willDestroyWhenInvisible) {
            this.requestsDestroy = true;
        }
    }

    //Given X,Y Coordinates in the form of a Position Object, returns true if those coords are inside the object.
    //Collission based on either a rectangle the size of the sprite, or the Clickshape if provided.
    //This is called to determine what the mouse is clicking on
    doCoordsCollideWithThis(givenPosition) {

        if (isPositionWithinRectangle(givenPosition, this.position.x-this.clickRectanglePadding, (this.position.x + (this.width) + this.clickRectanglePadding), this.position.y - this.clickRectanglePadding, (this.position.y + (this.height) + this.clickRectanglePadding))) {
            if (this.clickShapePoints && (this.clickShapePoints.length == 1)) {
                this.relativeClickshape = this.getRelativeClickShapeFromPoints(this.clickShapePoints[0]);
                return this.relativeClickshape.areCoordsWithin(givenPosition);
            }            
            if (!this.clickShapePoints[this.frameIndex]) { //IF NO CLICKBOX (this used to be [0], but this makes more sense I think)
                return true;
            }
            if (this.clickShapePoints == []){
                return true;
            }
            if (this.clickShapePoints[this.frameIndex].length < 1) {
                return true;
            }
            this.relativeClickshape = this.getRelativeClickShapeFromPoints(this.clickShapePoints[this.frameIndex]);   
            return this.relativeClickshape.areCoordsWithin(givenPosition);
            
        }
        else {
            return false;
        }
        
        
    }
    //Helper function for collision
    getRelativeClickShapeFromPoints(arrayOfPoints) {
        let tempPoints = [];
        let px;
        let py;
        for (let i = 0; i < arrayOfPoints.length; i++) {
            px = (arrayOfPoints[i].x + this.position.x);
            py = (arrayOfPoints[i].y + this.position.y);
            tempPoints.push(new Point(px, py));
        }
        return new Shape(tempPoints);
    }

    //Call to make the object fade out. Speed means how fast to fade, thenDestory means whether the object is destroyed after fadeout
    startFadeout(speed = 0.05, willDestroyWhenInvisible = true, interactable = false) {
        this.fadeOut = true;
        this.fadeSpeed = speed;
        this.willDestroyWhenInvisible = willDestroyWhenInvisible;
        this.interactable = interactable;
        
        //console.log(this.fadeSpeed);
    }

    setVisible(boolean) {
        this.visibile = boolean;
    }

    destroy() {
        this.requestsDestroy = true;
    }
    setInteractable(boolean) {
        this.interactable = boolean;
    }

    isRequestingDestroy() {
        return this.requestsDestroy;
    }

    /***THESE FUNCTIONS ARE CALLED IN RESPONSE TO PLAYER INPUT. (tho not called if interactable is set to false)*/

    //This is called when the object is clicked or tapped on. (A complete Mousedown and Mouseup/tapdown and tapup)
    onClickOrTap() {
        
        if(runSettings.developerMode) {
            giveDevToolsObjectClicked(this);
        }
        //console.log("onClickOrTap" + this.name);
    }

    onMouseOrTapDown(position = undefined) {
        //console.log("OnMouseOrTapDown" + this.name);
    }

    //If a click or tap begins on an object, then that object will continue to receive that input's position through this function until the user lifts the mouse or finger.
    onOwnedInputMove(position) {

    }
    //Called when a click or touch which began on this object ends.
    onOwnedInputEnd() {

    }
    
    //Called if actively held down cursor or actively held tap leaves the object
    onClickOrTapExit(position = undefined) { 
        //console.log("onClickOrTapExit" + this.name);
    }

    //Called if any cursor or actively held tap leaves the object. Similar to previous except this also includes Mouse Hover.
    onMouseOrTapExit() { 
        //console.log("onMouseOrTapExit" + this.name);
    }

    //Called when mouse starts hovering over the object.
    onMouseStartHover() {
        //console.log("onMouseStartHover"+this.name);
    }

    //Called if mouse hover ends, regardless of whether they were holding down mouse.
    onMouseEndHover() { 
        //console.log("onMouseEndHover"+this.name);
    }

    /**END INPUT FUNCTIONS */

    isRequestingHoverhand() {
        return (this.hoverhand && this.interactable);
    }

    isRequestingPointerhand() {
        return this.pointerhand;
    }
    
}



class DraggableSprite extends SpriteObject {
    constructor(name, position, width, height, imgURL, altImg = false, clickShapeNums = false, keepWithin = false){
        super(name, position, width, height, imgURL, clickShapeNums);
        if(altImg) {
            this.img.push(new Image());
            this.img[1].src = altImg;
        }
        if(keepWithin) {
            this.keepWithin = [keepWithin[0], new Position(keepWithin[1].x-width, keepWithin[1].y-height)];
        } else {
            this.keepWithin = false;
        }
        this.whereGrabbed = new Position(0,0);
        this.hoverhand = true;
        this.ownerRequestsClosedHand = true;
    }
    onMouseOrTapDown(position) {
        this.beingGrabbed = true;
        this.requestsTopBilling = true;
        if(this.img[1]) {
            this.frameIndex = 1;
        }
        let rx = position.x - this.position.x;
        let ry = position.y - this.position.y;
        this.whereGrabbed.set(rx, ry);
        console.log(this.whereGrabbed);
    }
    onOwnedInputMove(position) {
        if(this.keepWithin) {
            if((((position.x-this.whereGrabbed.x) > this.keepWithin[0].x) && ((position.y-this.whereGrabbed.y) > this.keepWithin[0].y)) && ((position.x-this.whereGrabbed.x) < this.keepWithin[1].x) && (position.y-this.whereGrabbed.y < this.keepWithin[1].y)) {
                //console.log("it's within");
                this.position.set(position.x-this.whereGrabbed.x, position.y-this.whereGrabbed.y);
            } else {
                let newx = position.x-this.whereGrabbed.x;
                let newy = position.y-this.whereGrabbed.y;
                if(position.x-this.whereGrabbed.x < this.keepWithin[0].x) {
                    newx = this.keepWithin[0].x;
                }
                if(position.y-this.whereGrabbed.y < this.keepWithin[0].y) {
                    newy = this.keepWithin[0].y;
                }
                if(position.x-this.whereGrabbed.x > this.keepWithin[1].x) {
                    newx = this.keepWithin[1].x;
                }
                if(position.y-this.whereGrabbed.y > this.keepWithin[1].y) {
                    newy= this.keepWithin[1].y;
                }
                this.position.set(newx, newy);
            }
        } else {
            this.position.set(position.x-this.whereGrabbed.x, position.y-this.whereGrabbed.y);
        }
        
    }
    onOwnedInputEnd() {
        console.log("owned input ended");
        this.beingGrabbed = false;
        this.requestsTopBilling = false;
        this.whereGrabbed.set(0,0);
        if(this.img[1]) {
            this.frameIndex = 0;
        }
    }


}


class ThrowableSprite extends DraggableSprite {
    constructor(name, position, width, height, imgURL, clickShapeNums, keepWithin, friction = 0.9, velocityLossOnWallBounce = 1/*0.5 works well*/){
        super(name, position, width, height, imgURL, false, clickShapeNums, keepWithin);
        this.lastFivePositionsDuringMove = [];
        this.friction = friction;
        this.velocityLossOnWallBounce = velocityLossOnWallBounce;
        
    }
    update() {
        super.update();
        if(this.beingGrabbed) {
            while(this.lastFivePositionsDuringMove.length >= 5) {
                this.lastFivePositionsDuringMove.shift();
            }
            this.lastFivePositionsDuringMove.push(new Position(this.position.x, this.position.y));
        }
        //this.stayAboveFloor();
        //this.changeDirectionOnWallCollision();
    }

    onMouseOrTapDown(position) {
        super.onMouseOrTapDown(position);
        this.velocity.set(0,0);
        this.lastFivePositionsDuringMove = [];
    }

    onOwnedInputMove(position) {
        super.onOwnedInputMove(position);
        //this.stayAboveFloor();
        //this.position.set(position.x-this.whereGrabbed.x, position.y-this.whereGrabbed.y);
        
        
    }

    updatePosition() {
        this.changeDirectionOnWallCollision();
        
        let minimumVelocity = 0.2;

        this.position.add(this.velocity);
        
        this.velocity.multiply(this.friction);

         //If velocity is too low, stop. Prevents the effect of an unnatural looking final pixel move, but perhaps this should be tweaked.
        /* if((0 < this.velocity.x) &&(this.velocity.x < minimumVelocity)) {
            this.velocity.stop();
            console.log("stopped");
        }
        if((0 > this.velocity.x) && (this.velocity.x > -minimumVelocity)) {
            this.velocity.stop();
            console.log("stopped");
        } */

        
        

    }



    onOwnedInputEnd() {
        super.onOwnedInputEnd();
        let maximumThrowVelocity = 50;//was 10
        if(this.lastFivePositionsDuringMove.length==5) {
            let newvx = ((this.lastFivePositionsDuringMove[this.lastFivePositionsDuringMove.length - 1].x - this.lastFivePositionsDuringMove[0].x)/5);
            let newvy = ((this.lastFivePositionsDuringMove[this.lastFivePositionsDuringMove.length - 1].y - this.lastFivePositionsDuringMove[0].y)/5);
            if(newvx > maximumThrowVelocity) {
                newvx = maximumThrowVelocity;
            }
            if(newvy > maximumThrowVelocity) {
                newvy = maximumThrowVelocity;
            }
            if(newvx < -maximumThrowVelocity) {
                newvx = -maximumThrowVelocity;
            }
            if(newvy < -maximumThrowVelocity) {
                newvy = -maximumThrowVelocity;
            }
            this.velocity.x = newvx;
            this.velocity.y = newvy;
        }
        
        this.lastFivePositionsDuringMove = [];
        console.log(this.velocity);
        console.log("End Hold");
    }


    changeDirectionOnWallCollision() {
        if (this.position.x < this.keepWithin[0].x) {
            if(this.velocity.x < 0){
                this.velocity.x = (-this.velocity.x * this.velocityLossOnWallBounce);
            }
        } 
        if(this.position.x > this.keepWithin[1].x){
            if(this.velocity.x > 0){
                this.velocity.x = (-this.velocity.x * this.velocityLossOnWallBounce);
            }
        } 
        if (this.position.y < this.keepWithin[0].y) {
            if(this.velocity.y < 0) {
                this.velocity.y = (-this.velocity.y * this.velocityLossOnWallBounce);
            }
        } 
        if (this.position.y > this.keepWithin[1].y) {
            if(this.velocity.y > 0) {
                this.velocity.y = (-this.velocity.y * this.velocityLossOnWallBounce);
            }
        }
    }
}

class GravitySprite extends ThrowableSprite {
    constructor(name, position, width, height, imgURL, clickShapeNums) {
        super(name, position, width, height, imgURL, clickShapeNums);
        this.gravity = 0.5;
        this.friction = 1;
        this.floorFriction = 0.9;
    }

    update() {
        super.update();
        this.stayAboveFloor();
    }

    updatePosition() {

        this.position.add(this.velocity);
        
        this.velocity.multiply(this.friction);
        if(!this.beingGrabbed) {
            this.velocity.y += this.gravity;
        }
    }


    
    stayAboveFloor() {
        let floorHeight = 25;
        if ((this.position.y +this.height) > canvasSize.height - floorHeight) {
            console.log("floor!");
            this.position.y = (canvasSize.height - floorHeight - this.height);
            this.velocity.x *= this.floorFriction;
            //this.velocity.y = -this.velocity.y;
        }
        
        /* let searchPos = new Position(this.position.x + (this.width/2), this.position.y + this.height + 5);
        //console.log(searchPos);
        let o = gameState.getTopObjectAtPositionIfInteractableElseFalse(searchPos);
        if(o && o.getName =="TestBall"){
            console.log("OMG");
            console.log(o);
            //this.position.y = (canvasSize.height - floorHeight - this.height);
        } */
        

    }
}

class StackableSprite extends GravitySprite {

}

class PlayButton extends SpriteObject { //Starting by making a specific one, then will make something generic. Imagine even if a class could accept button text, and function to be called on click
    constructor(position) {
        super("playButton", position, 72, 20, "images/Play.png");
        this.clickRectanglePadding = 20;
        this.pointerhand = true;
        this.img.push(new Image());
        this.img.push(new Image());
        this.img[1].src = "images/Play-hover.png";
        this.img[2].src = "images/Play-down.png";
    }
    onClickOrTap(){
        super.onClickOrTap();
        gameState.goToNextScene();
        //this.frameIndex = 0;
    }
    onMouseOrTapDown(){
        super.onMouseOrTapDown();
        this.frameIndex = 2;
    }
    onMouseOrTapExit(){
        super.onMouseOrTapExit();
        this.frameIndex = 0;
    }
    onMouseStartHover() {
        super.onMouseStartHover();
        this.frameIndex = 1;
    }

}

/* class TestSwitch extends SpriteObject {
    constructor(name, position) {
        super(name, position, 150, 150, "images/switch/switch1.png",[[[14, 91], [27, 78], [18, 24], [31, 23], [44, 80], [109, 113], [110, 127], [93, 146], [13, 107]],[[14, 105], [15, 92], [31, 74], [88, 101], [120, 59], [124, 58], [130, 66], [101, 110], [108, 113], [110, 128], [92, 145]]]);
        this.img = [new Image(), new Image()];
        this.img[0].src = "images/switch/switch1.png";
        this.img[1].src = "images/switch/switch5.png";
        this.hoverhand = true;
    }
    onClickOrTap() {
        super.onClickOrTap();
        if (this.frameIndex < 1) {
            this.frameIndex = 1;
        } else {
            this.frameIndex = 0;
        }
    }


}

class BetterTestSwitch extends SpriteObject {
    constructor(name, position) {
        super(name, position, 150, 150, "images/switch/switch1.png",[[[54, 61], [124, 91], [111, 146], [75, 150], [4, 115], [2, 82], [9, 15], [35, 13]],[],[],[],[[6, 104], [6, 82], [29, 63], [81, 85], [119, 49], [136, 59], [133, 81], [112, 136], [102, 150], [91, 150]]]);
        this.img = [new Image(), new Image(), new Image(), new Image(), new Image()]
        this.img[0].src = "images/switch/switch1.png";
        this.img[1].src = "images/switch/switch2.png";
        this.img[2].src = "images/switch/switch3.png";
        this.img[3].src = "images/switch/switch4.png";
        this.img[4].src = "images/switch/switch5.png";
        this.hoverhand = true;
        this.switchOn = false;
    }
    onClickOrTap() {
        super.onClickOrTap();
        if (this.switchOn) {
            this.switchOn = false;
        } else {
            this.switchOn = true;
        }
    }

    update() {
        super.update();
        if(this.switchOn && (this.frameIndex < 4)) {
            this.frameIndex++;
        }
        if(((!this.switchOn)) && (this.frameIndex > 0)) {
            this.frameIndex--;
        }

    }
} */


/* This is to be used to make switches and anything else that alternates between a state A and state B on tap or click.
All images provided should have the same width and height. If state B specifics aren't provided it will stick to default.
Speed is how many repeat frames to insert between provided frames. 0 is fastest.*/
class TwoStateSpriteObject extends SpriteObject {
    constructor(name, position, width, height, defaultSpriteURL, stateBSpriteURL = null, transitionFramesURLs = null, transitionSpeed = 0, defaultClickShape = null, stateBClickShape = null) {
        super(name, position, width, height, null, makeTSClickShapeArray(defaultClickShape, transitionFramesURLs, stateBClickShape));
        this.arrayOfURLs = [defaultSpriteURL];
        this.whenStartedToWait;
        //this.arrayOfURLs = ["ha"];
        //this.arrayOfURLs.push(defaultSpriteURL);
        if(transitionFramesURLs != null) {
            this.arrayOfURLs = this.arrayOfURLs.concat(transitionFramesURLs);
        }
        if(stateBSpriteURL != null) {
            this.arrayOfURLs.push(stateBSpriteURL);
        }

        this.img = [];
        this.stateBIndex = this.arrayOfURLs.length - 1;
        this.inStateB = false;
        this.hoverhand = true;
        this.transitionSpeed = transitionSpeed;
        for(let i = 0; i < this.arrayOfURLs.length; i++) {
            this.img.push(new Image());
            this.img[i].src = this.arrayOfURLs[i];
        }
        
    }

    onClickOrTap() {
        super.onClickOrTap();
        this.activate();
    }

    activate() {
        if (this.inStateB) {
            this.makeStateA();
        }
        else {
            this.makeStateB();
        }
    }

    makeStateA() {
        if (this.inStateB) {
            this.inStateB = false;
            this.interactable = false;
            this.whenStartedToWait = framesDrawn;
        }
    }

    makeStateB() {
        if (!this.inStateB) {
            this.inStateB = true;
            this.interactable = false;
            this.whenStartedToWait = framesDrawn;
        }
    }

    update() {
        super.update();
        if((this.inStateB && (this.frameIndex < this.stateBIndex)) && ((framesDrawn-this.whenStartedToWait) > this.transitionSpeed)) {
            this.frameIndex++;
            this.whenStartedToWait = framesDrawn;
            if (this.frameIndex == this.stateBIndex) {
                console.log("made interactable1");
                this.interactable = true;
            }
        }
        if((((!this.inStateB)) && (this.frameIndex > 0)) && ((framesDrawn-this.whenStartedToWait) > this.transitionSpeed)) {
            this.frameIndex--;
            this.whenStartedToWait = framesDrawn;
            if (this.frameIndex == 0) {
                console.log("made interactable2");
                this.interactable = true;
            }
        }
        /* if(((this.frameIndex == 0) || (this.frameIndex == this.stateBIndex)) && !this.interactable) {
            console.log("made interactable3");
            this.interactable = true;
        } */
    }
}

class DragSwitch extends TwoStateSpriteObject {
    constructor(p1) {
        super("switch1", p1, 150, 150, "images/switch/switch1.png", "images/switch/switch5.png", ["images/switch/switch2.png","images/switch/switch3.png","images/switch/switch4.png"], 10, [[54, 61], [124, 91], [111, 146], [75, 150], [4, 115], [2, 82], [9, 15], [35, 13]], [[6, 104], [6, 82], [29, 63], [81, 85], [119, 49], [136, 59], [133, 81], [112, 136], [102, 150], [91, 150]]);
    }

    onClickOrTap(){
        //do nothing
        //console.log("clicked");
        super.onClickOrTap();
    }
    onClickOrTapExit(position = undefined) {
        super.onClickOrTapExit(position);
        if(position) {
            console.log(position);
            //console.log(this.position.x+(this.width/2) + 40);
             if((position.x > this.position.x+(this.width/2)-40) && (!this.inStateB)){
                console.log("make state b");
                this.makeStateB();
            } else if(position.x < (this.position.x+(this.width/2) + 40)) {
                console.log("make state a");
                this.makeStateA();
            }
            console.log(this.position.x+(this.width/2));
        }
        
    } 
}

class BouncyImage extends SpriteObject {
    constructor(name, coords, width, height, imgURL, speed = 8, clickShapeNums) {
        super(name, coords, width, height, imgURL, clickShapeNums);
        this.velocity.x = (Math.random() - 0.5) * speed;
        this.velocity.y = (Math.random() - 0.5) * speed;
        this.hoverhand = true;
    }

    changeDirectionOnWallCollision() {
        if (((this.position.x + this.width) > c.width) || (this.position.x < 0)) {
            this.velocity.x = -this.velocity.x;
        }
        if (((this.position.y + this.height) > c.height) || (this.position.y < 0)) {
            this.velocity.y = -this.velocity.y;
        }
    }

    updatePosition() {
        this.changeDirectionOnWallCollision();
        super.updatePosition();
    }

    onClickOrTap() {
        super.onClickOrTap();
        if(!developerModes.makeClickShape) {
            this.startFadeout();
            this.velocity.set(0,0);
        }
        
    }


}

class BouncyImageSpawner {
    constructor(width, height, imgURL, quantity = 10, name = "BouncyImage", speed = 2, clickShapeNums) {
        this.width = width;
        this.height = height;
        this.imgURL = imgURL;
        this.quantity = quantity;
        this.name = name;
        this.gameState = gameState;
        this.c = c;
        this.spawned = [];
        this.speed = speed;
        for (let i = 0; i < this.quantity; i++) {
            let x = Math.random() * (canvasSize.width - this.width);
            let y = Math.random() * (canvasSize.height - this.height);
            //console.log(x);
            //turquoiseState.getCurrentScene().addGobjcet()
            this.spawned.push(new BouncyImage(this.name+ i.toString(), new Position(x,y), this.width, this.height, this.imgURL, this.speed, clickShapeNums));
            //imageArray.push(new BouncyImage("dvd"+ i.toString(),x, y, dvdWidth, dvdHeight, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/DVD_logo.svg/320px-DVD_logo.svg.png"));

        }
    }

}

/*This makes TwoStateSpriteObject's Super Clickshape Array that SpriteObject expects... A bit of a mess I know*/
function makeTSClickShapeArray(defaultClickShape, transitionFramesURLs, stateBClickShape) {
    let tempClickShapeNums;
    if (defaultClickShape != null) {
        tempClickShapeNums = [defaultClickShape];
    }
    else {
        tempClickShapeNums = false;
    }
    if (transitionFramesURLs != null) {
        if (stateBClickShape != null) {
            for (let w = 0; w < transitionFramesURLs.length; w++) {
                tempClickShapeNums.push([]);
            }
        }
    }
    if (stateBClickShape != null) {
        tempClickShapeNums.push(stateBClickShape);
    }
    return tempClickShapeNums;
}
