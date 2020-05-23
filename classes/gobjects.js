class SpriteObject {
    constructor(name, position, width, height, imgURL, clickShapeNums) {
        this.updateEveryFrame = true;
        this.name = name;
        this.position = position;
        this.img = [new Image()];
        this.frameIndex = 0;
        this.img[0].src = imgURL;
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
        this.hoverhand = false;
        this.oneClickbox = false;
        //this.usePolyForHitDetection;
        //this.usePolyForHitDetection = false;
        this.clickShapePoints = [];
        this.relativeClickshape;
        //this.alreadyDevClicked = false;
        //this.clickShapeNums = clickShapeNums;
        //console.log(clickShapeNums).length;
        
        if (clickShapeNums) {
            if (!(Array.isArray(clickShapeNums[0][0]))) {
                clickShapeNums = [clickShapeNums];
                if (clickShapeNums.length < this.img.length) {
                    this.oneClickbox = true;
                }
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

        if (isPositionWithinRectangle(givenPosition, this.position.x, (this.position.x + (this.width)), this.position.y, (this.position.y + (this.height)))) {
            if (!this.clickShapePoints[0]) { //IF NO CLICKBOX
                return true;
            }
            if (this.clickShapePoints == []){
                //console.log("hiii");
                return true;
            }
            if (this.clickShapePoints[this.frameIndex].length < 1) {
                return true;
            }
                
                if(this.oneClickbox) {
                    this.relativeClickshape = this.getRelativeClickShapeFromPoints(this.clickShapePoints[0]);
                } else {
                    this.relativeClickshape = this.getRelativeClickShapeFromPoints(this.clickShapePoints[this.frameIndex]);
                }
                
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
    }

    isRequestingHoverhand() {
        return (this.hoverhand && this.interactable);
    }
    onMouseHover() {
        //console.log(this.name);
    }
}


class TestSwitch extends SpriteObject {
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