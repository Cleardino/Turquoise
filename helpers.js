

function isPositionWithinRectangle(position, rectLeftX, rectRightX, rectTopY, rectBottomY) {
    if (((position.x > rectLeftX) && (position.x < rectRightX)) && ((position.y > rectTopY) && (position.y < rectBottomY))) {
        return true;
    }
    else {
        return false;
    }
}



function positionWithinCanvas(x, y) {

    if (x < 0) {
        x = 0;
    }
    if (x > canvasSize.width) {
        x = canvasSize.width;
    }
    if (y < 0) {
        y = 0;
    }
    if (y > canvasSize.height) {
        y = canvasSize.height;
    }
    return new Position(x, y);
}




function getPositionFromEvent(event) {
    return positionWithinCanvas((Math.floor(((event.clientX - canvasPositionAndSizeInWindow.left) / (canvasPositionAndSizeInWindow.width/c.width)))), (Math.floor(((event.clientY - canvasPositionAndSizeInWindow.top) / (canvasPositionAndSizeInWindow.height/c.height)))));

}

function updateGlobalCanvasPositionAndSizeCache() {
    let elem = c.getBoundingClientRect();
    canvasPositionAndSizeInWindow = { left: elem.left, top: elem.top, width: elem.width, height: elem.height };
}

function areGobjectsCollidingAsRects(obj1, obj2) {
    //console.log(obj1);
    //This is about the simplest thing in the world, but I still did end up borrowing from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection oop
    if((obj1.position.x < obj2.position.x + obj2.width) && 
        (obj1.position.x + obj1.width > obj2.position.x) &&
        (obj1.position.y < obj2.position.y + obj2.height) &&
        (obj1.position.y + obj1.height > obj2.position.y)) {
            return true;
        } else {
            return false;
        }
}

function createSheetPosition(imgString) {
    return {xInSheet: spriteSheetMeta.frames[imgString].frame.x, yInSheet: spriteSheetMeta.frames[imgString].frame.y, spriteW: spriteSheetMeta.frames[imgString].frame.w, spriteH: spriteSheetMeta.frames[imgString].frame.h, offsetX: spriteSheetMeta.frames[imgString].spriteSourceSize.x, offsetY: spriteSheetMeta.frames[imgString].spriteSourceSize.y, rotated: spriteSheetMeta.frames[imgString].rotated}
}

function drawImageFromSheet(x, y, sheetPosition) {
    //ctx.save();
    if(sheetPosition.rotated) {
        console.log("oh no I can't draw rotated images.");
        //ctx.save();
        //ctx.rotate(Math.PI / 2);
        //context.translate(0,0); 
        //ctx.drawImage(spriteSheet, sheetPosition.xInSheet, sheetPosition.yInSheet, sheetPosition.spriteH, sheetPosition.spriteW, x + sheetPosition.offsetX, y + sheetPosition.offsetY, sheetPosition.spriteH, sheetPosition.spriteW);
        //ctx.rotate(-Math.PI / 2);
        //ctx.restore();
        //ctx.rotate(270 * Math.PI / 180);
    } else {
        ctx.drawImage(spriteSheet, sheetPosition.xInSheet, sheetPosition.yInSheet, sheetPosition.spriteW, sheetPosition.spriteH, x + sheetPosition.offsetX, y + sheetPosition.offsetY, sheetPosition.spriteW, sheetPosition.spriteH);
    }
    /* if(sheetPosition.rotated) {
        ctx.rotate(270 * Math.PI / 180);
    } */
    //ctx.setTransform(1,0,0,1,0,0);
    //ctx.restore();
}

//should this be in a class,? not just loose