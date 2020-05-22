class SpriteObject {
    constructor(name, position, width, height, imgURL, clickShapeNums) {
        this.updateEveryFrame = true;
        this.name = name;
        this.position = position;
        this.img = new Image();
        this.img.src = imgURL;
        this.width = width;
        this.height = height;
        this.velocity = new Velocity(0,0);
        this.colour = "Black";
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
        this.hoverhand = true;
        //this.usePolyForHitDetection;
        //this.usePolyForHitDetection = false;
        this.clickShapePoints = [];
        this.relativeClickshape;
        //this.clickShapeNums = clickShapeNums;
        //console.log(clickShapeNums).length;
        if (clickShapeNums) {
            //console.log("it's happening");
            for(let i = 0; i < clickShapeNums.length; i++) {
                this.clickShapePoints.push(new Point(clickShapeNums[i][0], clickShapeNums[i][1]))
                //console.log("hi");
            }
        }
        //console.log(this.clickShapePoints);
        //console.log(this.fadeOut);
        //console.log(this.visibile);
    }
    
    getName() {
        return this.name;
    }

    update() {
        this.updatePosition();
        this.updateFadeout();
        
        gameState.getGobjects
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
        if (isPositionWithinRectangle(givenPosition, this.position.x, (this.position.x + (this.width)), this.position.y, (this.position.y + (this.height)))) {
            if (this.clickShapePoints.length > 0) {//Only uses 
                let tempPoints = [];
                let px;
                let py;
                for (let i = 0; i < this.clickShapePoints.length; i++) {
                    px = (this.clickShapePoints[i].x + this.position.x);
                    py = (this.clickShapePoints[i].y + this.position.y);
                    tempPoints.push(new Point(px, py));
                }
                this.relativeClickshape = new Shape(tempPoints);
                return this.relativeClickshape.areCoordsWithin(givenPosition);
            } else return true;
        }
        else {
            return false;
        }
        
        
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
        if(developerModes.makeClickShape) {
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.drawImage(this.img, Math.round(this.position.x), Math.round(this.position.y), this.width, this.height);
            developerModeVariables.relativeX = Math.round(this.position.x);
            developerModeVariables.relativeY = Math.round(this.position.y);
            //console.log(developerVariables.relativeX);
            developerModeVariables.generateClickShapePoints = true;
            developerModeVariables.freeze = true;
            developerModeVariables.objectBeingSelected = this;
            developerModeVariables.generatedPoints = "[";
        }
    }
    isRequestingHoverhand() {
        return (this.hoverhand && this.interactable);
    }
    onMouseHover() {
        //console.log(this.name);
    }
}

/* class TexanImage extends SpriteObject {
    constructor(name, position, width, height, imgURL) {
        super(name, position, width, height, imgURL);
        this.hoverhand = false;
        this.usePolyForHitDetection = true;
        this.hitDetectionPoly = []; //something
    }
} */

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
        this.startFadeout();
        this.velocity.set(0,0);
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