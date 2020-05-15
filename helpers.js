

function coordsWithinRectangle(coordX, coordY, rectLeftX, rectRightX, rectTopY, rectBottomY) {
    if (((coordX > rectLeftX) && (coordX < rectRightX)) && ((coordY > rectTopY) && (coordY < rectBottomY))) {
        return true;
    }
    else {
        return false;
    }
}

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
    let elem = event.target.getBoundingClientRect();
    let xClicked = event.clientX - elem.left;
    xClicked = Math.floor((xClicked / (elem.width/c.width)));
    xClicked = keepXWithinCanvas(xClicked);
    return xClicked;
}

function getYFromEvent(event) {
    let elem = event.target.getBoundingClientRect();
    let yClicked = event.clientY - elem.top;
    yClicked = Math.floor((yClicked / (elem.height/c.height)));
    yClicked = keepYWithinCanvas(yClicked);
    return yClicked;
}

//should this be in a class,? not just loose