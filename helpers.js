

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
    if(obj1.x < obj2.x + obj2.width && 
        obj1.x + obx.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y) {
            return true;
        } else {
            return false;
        }
}

//should this be in a class,? not just loose