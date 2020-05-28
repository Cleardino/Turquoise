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
    subtract(otherXY) {
        this.x = this.x-otherXY.x;
        this.y = this.y-otherXY.y;
    }
}

class Velocity extends XY {
    constructor(x, y) {
        super(x, y);
    }
    stop() {
        this.x = 0;
        this.y = 0;
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

class Point extends Position {
    constructor(x, y) {
        super(x, y);
    }

    draw() {
        ctx.fillRect(this.x,this.y,1,1,);
    }

}

class Line {
    
    /** @param {Point} p1 @param {Point} p2*/
    constructor(p1, p2) {
        this.p1 = p1
        this.p2 = p2
    }

    draw() {
        //ctx.filter = 'url(#remove-alpha)';
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        //ctx.closePath();
        ctx.stroke();
        //ctx.filter = 'none';
    }

    //Geometry functions were based on learning from this article. https://martin-thoma.com/how-to-check-if-two-line-segments-intersect/ Some code similarities at the moment could justify giving credit.

    crossProduct(a, b) {
        return ((a.x * b.y) - (b.x * a.y)); 
    }

    wouldIntersectAsBox(otherLine) {
        let aTopY = Math.min(this.p1.y,this.p2.y);
        let aLeftmostX = Math.min(this.p1.x,this.p2.x);
        let aRightmostX = Math.max(this.p1.x, this.p2.x);
        let aBottommostY = Math.max(this.p1.y, this.p2.y);

        let bTopY = Math.min(otherLine.p1.y,otherLine.p2.y);
        let bLeftmostX = Math.min(otherLine.p1.x,otherLine.p2.x);
        let bRightmostX = Math.max(otherLine.p1.x, otherLine.p2.x);
        let bBottommosY = Math.max(otherLine.p1.y, otherLine.p2.y);

        if ((aBottommostY >= bTopY) && (bBottommosY >= aTopY) && (bRightmostX >= aLeftmostX) && (aRightmostX >= bLeftmostX)) {
            return true;
        } else return false;

    }

    isTouchingPosition(pos) {
        let accuracy = 0.0000000001; //was 90 The smaller you make this number, the more precisely the point needs to be on the line. Article I'm learning from used EPSILON. I tweaked this arbitrarily until it got roughly closer to pixel colision, but that was maybe not a good idea.
        let tempLine = new Line( new Point(0,0), new Point((this.p2.x - this.p1.x),(this.p2.y - this.p1.y)));
        let tempPoint = new Point(pos.x - this.p1.x, pos.y - this.p1.y);
        let r = this.crossProduct(tempLine.p2, tempPoint);
        //console.log(r);
        if (Math.abs(r) < accuracy) {
            return true;
        } else {
            return false;
        }

    }

    isPointRight(point) {
        let templn = new Line(new Point(0,0), new Point(this.p2.x - this.p1.x, this.p2.y - this.p1.y));
        let temppt = new Point(point.x - this.p1.x, point.y - this.p1.y);
        //console.log(this.crossProduct(this.p2, temppt))
        if (this.crossProduct(templn.p2, temppt) < 0) {
            return true;
        } else {
            return false;
        }
    }

    crosses(otherLine) {
        //console.log("this.isTouchingPosition(otherLine.p1)" + this.isTouchingPosition(otherLine.p1));
        //console.log("this.isTouchingPosition(otherLine.p2)" + this.isTouchingPosition(otherLine.p2));
        //console.log("this.isPointRight(otherLine.p1)" + this.isPointRight(otherLine.p1));
        //console.log("this.isPointRight(otherLine.p2)" + this.isPointRight(otherLine.p2));
        if (this.isTouchingPosition(otherLine.p1)) {
            return true;
        }

        if (this.isTouchingPosition(otherLine.p2)) {
            return true;
        }

        if ((this.isPointRight(otherLine.p1)) && (!(this.isPointRight(otherLine.p2)))) {
            return true;
        }

        if ((!(this.isPointRight(otherLine.p1))) && ((this.isPointRight(otherLine.p2)))) {
            return true;
        }

        return false;
    }

    isIntersecting(otherLine) {
        //console.log("p1" + this.isPointRight(otherLine.p1));
        //console.log("p2" + this.isPointRight(otherLine.p2));

        //console.log("line1touchesorcrosses" + this.crosses(this));
        //console.log("line2touchesorcrosses" + otherLine.crosses(this))

        if (this.wouldIntersectAsBox(otherLine)) {
            //console.log("IN BOX");
            if (this.crosses(otherLine) && otherLine.crosses(this)) {
                return true;
            } else {
                return false;
            }
        } else {
            //console.log("oh no");
            return false;
        }
            
    }


    
}

class Shape {
    constructor(pointArray){
        this.lineArray = [];
        this.lineArray.push(new Line(pointArray[0], pointArray[pointArray.length-1]));
        for (let i = 0; i < pointArray.length-1; i++) {
            this.lineArray.push(new Line(pointArray[i], pointArray[i+1]));
            //console.log(this.lineArray);
        }
    }
    draw() {
        for (let i = 0; i < this.lineArray.length; i++) {
            this.lineArray[i].draw();
            //console.log("printed " + this.lineArray[i]);
            //console.log(this.lineArray);
        }
    }

    areCoordsWithin(position) {
        let ray = new Line(new Position(0,0), position);
        let numberOfLinesIntersected = 0;
        //ray.draw();
        for(let i = 0; i < this.lineArray.length; i++) {
            if (this.lineArray[i].isIntersecting(ray)) {
                numberOfLinesIntersected++;
            }
        }
        //console.log(numberOfLinesIntersected);
        if (numberOfLinesIntersected % 2 === 0){//determines if numberOfLinesIntersected is even or odd
            return false;
        } else {
            return true;
        }
    }

}