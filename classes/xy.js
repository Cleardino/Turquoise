class XY {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    add(otherXY) {
        this.x = this.x+otherXY.x;
        this.y = this.y+otherXY.y;
    }
}

class Velocity extends XY {
    constructor(x, y) {
        super(x, y);
    }
}

class Position extends XY {
    constructor(x, y) {
        super(x, y);
    }

    setWithinCanvas(x, y) {
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
        super.set(x, y);
        
    }
}