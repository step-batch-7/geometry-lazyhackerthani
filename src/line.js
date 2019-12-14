const { pow, sqrt, min, max } = Math;
const arePointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};

const isBetween = function(range1, range2, no) {
  return min(range1, range2) <= no && no <= max(range1, range2);
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
    if (!(other instanceof Line) || other.yIntercept === this.yIntercept)
      return false;
    return this.slope === other.slope;
  }
  get slope() {
    if (this.endA.y === this.endB.y) return undefined;
    return (this.endA.x - this.endB.x) / (this.endA.y - this.endB.y);
  }
  get yIntercept() {
    return this.endA.y - this.slope * this.endA.x;
  }
  findX(givenY) {
    return (givenY - this.yIntercept) / this.slope;
  }
  findY(givenX) {
    return this.slope * givenX + this.yIntercept;
  }
  hasPoint(other) {
    return (
      isBetween(this.endA.x, this.endB.x, other.x) &&
      isBetween(this.endA.y, this.endB.y, other.y)
    );
  }
}

module.exports = Line;
