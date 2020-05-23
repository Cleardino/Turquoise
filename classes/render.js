class TurquoiseRender {
    constructor(c, ctx) {
        this.c = c
        this.ctx = ctx
        this.snapObjectsToPixel = true; //Use to ensure pixel art is always drawn correctly
    }
    draw(gameState) {
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
        //console.log(gameState.getGobjects().length);
        for (let i = 0; i < gameState.getGobjects().length; i++) {
            
            //gameState.getGobjects()[i].draw();
            let o = gameState.getGobjects()[i];

            if (o.visibile) {
                this.ctx.globalAlpha = o.opacity;
                if (this.snapObjectsToPixel) {
                    this.ctx.drawImage(o.getImage(), Math.round(o.position.x), Math.round(o.position.y), o.width, o.height);
                } else {
                    this.ctx.drawImage(o.getImage(), o.position.x, o.position.y, o.width, o.height);
                 }
                this.ctx.globalAlpha = 1;
                //ctx.globalCompositionOperation = "source-over";
                
                
            }
        
        //imageArray[i].update();
        //imageArray[i].draw();
        //console.log(gameState.getCurrentScene.getGobjects());
    }
    }

}