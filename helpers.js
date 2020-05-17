

function coordsWithinRectangle(coordX, coordY, rectLeftX, rectRightX, rectTopY, rectBottomY) {
    if (((coordX > rectLeftX) && (coordX < rectRightX)) && ((coordY > rectTopY) && (coordY < rectBottomY))) {
        return true;
    }
    else {
        return false;
    }
}

//treating X & Y separately is so insane and will be fixed

function keepXWithinCanvas(xClicked) {
    if (xClicked < 0) {
        xClicked = 0;
    }
    if (xClicked > c.width) {
        xClicked = c.width;
    }
    return xClicked;
}
function keepYWithinCanvas(yClicked) {
    if (yClicked > c.height) {
        yClicked = c.height;
    }
    if (yClicked < 0) {
        yClicked = 0;
    }
    return yClicked;
}


function getXFromEvent(event) {
    //console.log(canvasScreenLeft);
    //console.log(canvasScreenTop);
    //console.log(canvasScreenHeight);
    //console.log(canvasScreenWidth);
    let xClicked = keepXWithinCanvas((Math.floor(((event.clientX - canvasPositionAndSizeInWindow.left) / (canvasPositionAndSizeInWindow.width/c.width)))));
    //console.log(xClicked);
    return xClicked;
}

function getYFromEvent(event) {
    yClicked = keepYWithinCanvas(Math.floor(((event.clientY - canvasPositionAndSizeInWindow.top) / (canvasPositionAndSizeInWindow.height/c.height))));
    //console.log(yClicked);
    return yClicked;
}

function getCoordsFromEvent(event) {
    let elem = event.target.getBoundingClientRect();

}

//should this be in a class,? not just loose