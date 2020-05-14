class TurquoiseState {
    constructor() {
        this.scenes = [];
        this.currentScene = 0;
        //console.log(this.scenes);
    }
    
    addScene(scene) {
        this.scenes.push(scene);
    }
    getSceneByArrayPosition(i){
        //console.log("test");
        return this.scenes[i];
        //var i;
        //for (i = 0; (i < this.scenes.length(); i++) {
            //if (scenes[i].getName == name) {
                //return scenes[i];
            //}
        //}
    }

    getSceneByName(name) {
        var i;
        for (i = 0; i < this.scenes.length; i++) {
            if (this.scenes[i].getName() == name) {
                //console.log('helllooo');
                return this.scenes[i];
            }
        }
        
    }

    getArrayPosOfCurrentScene() {
        return this.currentScene;
    }
    
    getNameOfCurrentScene(){
        return this.currentScene.getName();
    }
    getCurrentScene(){
        //console.log("test");
        return this.scenes[0];
        
        //return this.scenes[currentScene];
    }

    getGobjects() {
        return this.scenes[this.currentScene].getGobjects();
    }
/*     goToNextScene() {

    }

    goToPreviousScene() {

    } */ //not necesary?

    //goToScene(name) {

    //}

    update() {
        for (i = 0; i < this.getGobjects().length; i++) {
            this.getGobjects()[i].update();
            //console.log(gameState.getGobjects());
            if (this.getGobjects()[i].isRequestingDestroy()) {
                this.getCurrentScene().destroyGobject(i);
                //console.log(gameState.getGobjects());
                i--; // hoping this prevents skipping an object's update, but untested. going through the array backwards supposedly prevents this also
                
            }
            
        }
    }

}

class Scene {
    constructor(name, gobjects = [], spawners = []){
        this.name = name;
        this.gobjects = gobjects;
        this.spawners = spawners;
        console.log(gameState);
    }
    spawn() {
        while (this.spawners.length > 0) {
            this.gobjects = this.gobjects.concat(this.spawners[0].spawned);
            this.spawners.splice(0,1);
        }
    }
    addGobject(gobject) {
        this.gobjects.push(gobject);
    }
    getName() {
        //console.log("so this is happening");
        return this.name;
    }
    destroyGobject(i) {
        this.gobjects.splice(i,1);
    }
    getGobjects() {
        return this.gobjects;
    }
}

class TurquoiseRender {
    constructor(c, ctx) {
        this.c = c
        this.ctx = ctx
    }
    draw(gameState) {
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
        for (i = 0; i < gameState.getGobjects().length; i++) {
            
            //gameState.getGobjects()[i].draw();
            let o = gameState.getGobjects()[i];

            if (o.visibile) {
                this.ctx.globalAlpha = o.opacity;
                this.ctx.drawImage(o.img, o.x, o.y, o.width, o.height);
                this.ctx.globalAlpha = 1;
                //ctx.globalCompositionOperation = "source-over";
            }
        
        //imageArray[i].update();
        //imageArray[i].draw();
        //console.log(gameState.getCurrentScene.getGobjects());
    }
    }

}

var hoverX = -1; //is this a nightmare?
var hoverY = -1;
var cursorSetToHovering = false;

class TurquoiseInput {
    constructor(c, gameState) {
        this.c = c;
        this.gameState = gameState;

        c.addEventListener('click', function(event) {
            let xClicked = keepXWithinCanvas((event.pageX - c.offsetLeft));
            let yClicked = keepYWithinCanvas((event.pageY - c.offsetTop));
            
            

            //console.log(xClicked + "," + yClicked);
            
            let clickActioned = false;
        
            //console.log(gameState.getGobjects());
        
            for (var i = (gameState.getGobjects().length - 1); (i > -1) && (!clickActioned); i--) {
                if (gameState.getGobjects()[i].doCoordsCollideWithThis(xClicked,yClicked) && gameState.getGobjects()[i].interactable){
                    gameState.getGobjects()[i].onClickOrTap();
                    //console.log("click X:" + xClicked);
                    //console.log("click Y:" + yClicked);
                    //console.log("hover X" + hoverX);
                    //console.log("hover Y" + hoverY);
                    clickActioned = true;
                }
            }
        
        }, false);

        c.addEventListener('mousemove', function(event) {
            hoverX = keepXWithinCanvas((event.pageX-8));
            hoverY = keepYWithinCanvas((event.pageY-8));
            //console.log(this.hoverX);
            //console.log(this.hoverX+", "+this.hoverY);
        }, false);
    }

    updateCursorHover() {
        this.hovering = false;
        if ((hoverX > -1) && (hoverY > -1)) {
            for (var i = 0; i < gameState.getGobjects().length; i++) {
                //console.log(gameState.getGobjects()[i]);
                //console.log(hoverX + ", " + hoverY);
                if ((gameState.getGobjects()[i].doCoordsCollideWithThis(hoverX,hoverY))){
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

class SpriteObject {
    constructor(name, x, y, width, height, imgURL) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = imgURL;
        this.width = width;
        this.height = height;
        this.xspeed = 0;
        this.yspeed = 0;
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
        this.hoverhand = false;
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
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
    }
    updateFadeout() {
        if ((this.fadeOut == true) && (this.visibile)) {
            this.opacity = this.opacity - this.fadeSpeed;
            if (this.opacity < 0) {
                this.opacity = 0;
                this.visibile = false;
                if (this.willDestroy){
                    //TODO destroy from array
                }
                //console.log(this.isVisible());
            }
        }
        if ((!this.visibile) && this.willDestroyWhenInvisible) {
            this.requestsDestroy = true;
        }
    }
/*     draw() {
        // set composite mode
        if (this.visibile) {
            ctx.globalAlpha = this.opacity;
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            ctx.globalAlpha = 1;
            //ctx.globalCompositionOperation = "source-over";
        }
    } */
    doCoordsCollideWithThis(xx, yy) {
        if (coordsWithinRectangle(xx, yy, this.x, (this.x + (this.width)), this.y, (this.y + (this.height)))) {
            return true;
        }
        else {
            return false;
        }
        /*         if (((xx > left) && (xx < right)) && ((yy > top) && (yy < bottom))) {
                    //console.log("xx: " + xx + "\nyy: " + yy + "\nleft: " + left + "\nright: " + right + "\ntop: " + top + "\nbottom:" + bottom);
                    //console.log("\nthis.x: "+this.x);
                    //console.log("\nthis.y: "+this.y);
                    return true;
                } else {
                    //console.log("xx: " + xx + "\nyy: " + yy + "\nleft: " + left + "\nright: " + right + "\ntop: " + top + "\nbottom:" + bottom);
                    //console.log("\nthis.x: "+this.x);
                    //console.log("\nthis.y: "+this.y);
                    return false;
                } */
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
        this.startFadeout();
    }
    isRequestingHoverhand() {
        return (this.hoverhand && this.interactable);
    }
    onMouseHover() {
        //console.log(this.name);
    }
}

class BouncyImage extends SpriteObject {
    constructor(name, x, y, width, height, imgURL, speed = 8) {
        super(name, x, y, width, height, imgURL);
        this.xspeed = (Math.random() - 0.5) * speed;
        this.yspeed = (Math.random() - 0.5) * speed;
        this.hoverhand = true;
    }

    changeDirectionOnWallCollision() {
        if (((this.x + this.width) > c.width) || (this.x < 0)) {
            this.xspeed = -this.xspeed;
        }
        if (((this.y + this.height) > c.height) || (this.y < 0)) {
            this.yspeed = -this.yspeed;
        }
    }

    updatePosition() {
        this.changeDirectionOnWallCollision();
        super.updatePosition();
    }


}

class BouncyImageSpawner {
    constructor(width, height, imgURL, quantity = 10, name = "BouncyImage", speed = 8) {
        this.width = width;
        this.height = height;
        this.imgURL = imgURL;
        this.quantity = quantity;
        this.name = name;
        this.gameState = gameState;
        this.c = c;
        this.spawned = [];
        this.speed = speed;

        let x;
        let y;
        for (i = 0; i < this.quantity; i++) {
            x = Math.random() * (canvasWidth - this.width);
            y = Math.random() * (canvasHeight - this.height) ;
            //turquoiseState.getCurrentScene().addGobjcet()
            this.spawned.push(new BouncyImage(this.name+ i.toString(),x, y, this.width, this.height, this.imgURL, this.speed));
            //imageArray.push(new BouncyImage("dvd"+ i.toString(),x, y, dvdWidth, dvdHeight, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/DVD_logo.svg/320px-DVD_logo.svg.png"));

        }
    }

}