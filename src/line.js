const { pow, sqrt } = Math;
const arePointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};

const yInterceptOf = function(x, y, m) {
  return y - m * x;
};

class Line {
  constructor(endA, endB) {
    [this.endA, this.endB] = [
      { x: endA.x, y: endA.y },
      { x: endB.x, y: endB.y }
    ];
  }
  toString() {
    return `[Line (${this.endA.x},${this.endA.y}) to (${this.endB.x},${this.endB.y})]`;
  }
  isEqualTo(other) {
    if (!(other instanceof Line)) return false;
    return (
      arePointsEqual(other.endA, this.endA) &&
      arePointsEqual(other.endB, this.endB)
    );
  }
  get length() {
    return sqrt(
      pow(this.endA.x - this.endB.x, 2) + pow(this.endA.y - this.endB.y, 2)
    );
  }
  isParallelTo(other) {
    if (!(other instanceof Line)) return false;
    return this.slope === other.slope;
  }
  get slope() {
    if (this.endA.y === this.endB.y) return undefined;
    return (this.endA.x - this.endB.x) / (this.endA.y - this.endB.y);
  }
  findX(givenY) {
    return (
      (givenY - yInterceptOf(this.endA.x, this.endA.y, this.slope)) / this.slope
    );
  }
}

module.exports = Line;
