

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
    if (x > canvasSize.height) {
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

//should this be in a class,? not just loose