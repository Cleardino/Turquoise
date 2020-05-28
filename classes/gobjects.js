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
        this.interactable;
        this.interactable = true;
        this.fadeSpeed;
        this.hoverhand;
        this.hoverhand = false;
        this.pointerhand;
        this.pointerhand = false;
        this.clickRectanglePadding = 0;
        //this.usePolyForHitDetection;
        //this.usePolyForHitDetection = false;
        this.clickShapePoints = [];
        this.relativeClickshape;
        this.requestsTopBilling = false;
        this.beingGrabbed = false;
        //this.alreadyDevClicked = false;
        //this.clickShapeNums = clickShapeNums;
        //console.log(clickShapeNums).length;

        if (clickShapeNums) {
            if (!(Array.isArray(clickShapeNums[0][0]))) {
                clickShapeNums = [clickShapeNums];
                //console.log(this.name);
                //console.log(clickShapeNums)
            } else {
                //console.log("got a superrayyyy");
                //console.log(clickShapeNums.length);
            }
            for(let o = 0; o < clickShapeNums.length; o++) {
                this.clickShapePoints.push([]);
                for(let i = 0; i < clickShapeNums[o].length; i++) {
                    this.clickShapePoints[o].push(new Point(clickShapeNums[o][i][0], clickShapeNums[o][i][1]))
                    //console.log(this.name);
                    //console.log(this.clickShapePoints);
                    //console.log("hi");
                }
            }
            //console.log("it's happening");

        }
        //console.log(this.clickShapePoints);
        //console.log(this.fadeOut);
        //console.log(this.visibile);
    }
    
    draw(x = Math.round(this.position.x), y = Math.round(this.position.y)) {
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.getImage(), x, y, this.width, this.height);
        ctx.globalAlpha = 1;
    }

    getName() {
        return this.name;
    }

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

    doCoordsCollideWithThis(givenPosition) {

        //this.relativeClickshape = null;
        //console.log(this.relativeClickshape);

        /* if (this.clickShapePoints[this.frameIndex].length < 3) {
            //TODO THERE IS A BETTER FIX TO ALL THIS
            //console.log('Trying to detect collision with Clickbox with fewer than 3 points');
            return false;
        } */

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

    //Speed means how fast to fade, thenDestory means whether the object is destroyed after fadeout
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
    onClickOrTap() {
        
        if(runSettings.developerMode) {
            giveDevToolsObjectClicked(this);
        }
        //console.log("onClickOrTap" + this.name);
    }

    onMouseOrTapDown(position = undefined) {
        //console.log("OnMouseOrTapDown" + this.name);
    }

    onOwnedInputMove(position) {

    }

    onOwnedInputEnd() {

    }

    onClickOrTapExit(position = undefined) { //Called if actively held down cursor or actively held tap leaves the object
        //console.log("onClickOrTapExit" + this.name);
    }

    onMouseOrTapExit() { //Called if any cursor or actively held tap leaves the object
        //console.log("onMouseOrTapExit" + this.name);
    }

    isRequestingHoverhand() {
        return (this.hoverhand && this.interactable);
    }

    isRequestingPointerhand() {
        return this.pointerhand;
    }
/*     onMouseHover() {
        console.log("hovering");
    } */
    onMouseStartHover() {
        //console.log("onMouseStartHover"+this.name);
    }
    onMouseEndHover() { //Called if mouse hover ends, regardless of whether they were holding down mouse
        //console.log("onMouseEndHover"+this.name);
    }
}

/* class DraggableSprite extends SpriteObject { //rush copypaste of ball, but feel free to revive
    constructor(name, position, width, height, imgURL, clickshape){
        super(name, position, width, height, imgURL, clickshape);
        this.whereGrabbed = new Position(0,0);
        this.hoverhand = true;
        //this.friction = 1;
    }
    onMouseOrTapDown(position) {
        this.beingGrabbed = true;
        this.requestsTopBilling = true;
        let rx = position.x - this.position.x;
        let ry = position.y - this.position.y;
        this.whereGrabbed.set(rx, ry);
        console.log(this.whereGrabbed);
    }
    onOwnedInputMove(position) {
        this.position.set(position.x-this.whereGrabbed.x, position.y-this.whereGrabbed.y);
    }
    onOwnedInputEnd() {
        this.beingGrabbed = false;
        this.requestsTopBilling = false;
        this.whereGrabbed.set(0,0);
    }


} */

class TestBall extends SpriteObject {
    constructor(position){
        super("TestBall", position, 68, 67, "images/ball.png",[[34, 4], [51, 10], [61, 21], [64, 33], [61, 48], [52, 59], [35, 65], [19, 61], [11, 53], [5, 43], [4, 34], [7, 20], [13, 13], [24, 6]]);
        this.whereGrabbed = new Position(0,0);
        this.hoverhand = true;
    }
    onMouseOrTapDown(position) {
        this.beingGrabbed = true;
        this.requestsTopBilling = true;
        let rx = position.x - this.position.x;
        let ry = position.y - this.position.y;
        this.whereGrabbed.set(rx, ry);
        console.log(this.whereGrabbed);
    }
    onOwnedInputMove(position) {
        this.position.set(position.x-this.whereGrabbed.x, position.y-this.whereGrabbed.y);
    }
    onOwnedInputEnd() {
        this.beingGrabbed = false;
        this.requestsTopBilling = false;
        this.whereGrabbed.set(0,0);
    }


}


class TestBall2 extends TestBall {
    constructor(position){
        super(position);
        this.lastFivePositionsDuringMove = [];
        this.friction = 0.1;
    }
    update() {
        super.update();
        if(this.beingGrabbed) {
            while(this.lastFivePositionsDuringMove.length >= 5) {
                this.lastFivePositionsDuringMove.shift();
            }
            this.lastFivePositionsDuringMove.push(new Position(this.position.x, this.position.y));
        }
        //this.changeDirectionOnWallCollision();
    }

    onMouseOrTapDown(position) {
        super.onMouseOrTapDown(position);
        this.velocity.set(0,0);
        this.lastFivePositionsDuringMove = [];
    }

    onOwnedInputMove(position) {
        
        super.onOwnedInputMove(position);
        
    }

    updatePosition() {
        this.position.add(this.velocity);
        //console.log(this.velocity.x + "-=" + this.friction);
        if((this.velocity.x > 0) && (this.velocity.x > this.friction)) {
            this.velocity.x -= this.friction;
            if(this.velocity.x <= (this.friction)) {
                this.velocity.x = 0;
            }
            //console.log(this.velocity.x+"woa");
        }
        if((this.velocity.y > 0) && (this.velocity.y > this.friction)) {
            this.velocity.y -= this.friction;
            if(this.velocity.y <= (this.friction)) {
                console.log("woa");
                this.velocity.y = 0;
            }
            //console.log(this.velocity.x+"woa");
        }

        if((this.velocity.x < 0) && (this.velocity.x < -this.friction)) {
            this.velocity.x += this.friction;
            if(this.velocity.x >= (-this.friction)) {
                this.velocity.x = 0;
            }
            //console.log(this.velocity.x+"woa");
        }
        if((this.velocity.y < 0) && (this.velocity.y < -this.friction)) {
            this.velocity.y += this.friction;
            if(this.velocity.y >= (-this.friction)) {
                console.log("woa");
                this.velocity.y = 0;
            }
            
        }
        

    }

    onOwnedInputEnd() {
        super.onOwnedInputEnd();
        let maximumThrowVelocity = 3;
        if(this.lastFivePositionsDuringMove.length==5) {
            let newvx = (this.lastFivePositionsDuringMove[this.lastFivePositionsDuringMove.length - 1].x - this.lastFivePositionsDuringMove[0].x)/4;
            let newvy = (this.lastFivePositionsDuringMove[this.lastFivePositionsDuringMove.length - 1].y - this.lastFivePositionsDuringMove[0].y)/4;
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
        if (((this.position.x + this.width) > c.width) || (this.position.x < 0)) {
            this.velocity.x = -this.velocity.x;
        }
        if (((this.position.y + this.height) > c.height) || (this.position.y < 0)) {
            this.velocity.y = -this.velocity.y;
        }
    }
}

class PlayButton extends SpriteObject { //Start by making a specific one, then make something generic. Imagine even if a class could accept button text
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
