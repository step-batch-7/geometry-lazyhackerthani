class Line {
    constructor(sX, sY, eX, eY) {
        this.startX = sX;
        this.startY = sY;
        this.endX = eX;
        this.endY = eY;
    }
    toString() {
        let { startX, startY, endX, endY } = this;
        let inString = `startX ${startX}, startY ${startY}, endX ${endX}, endY ${endY}`;
        return inString;
    }
    isEqualTo(other) {
        return this.startX == other.startX && this.startY == other.startY && this.endX == other.endX && this.endY == other.endY;
    }
}

module.exports = Line;