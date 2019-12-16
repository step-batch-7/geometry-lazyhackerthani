const { pow, sqrt, min, max, round } = Math;
const Point = require('../src/point');
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
    if (!isBetween(this.endA.y, this.endB.y, givenY)) return NaN;
    if (this.endA.y == this.endB.y) return this.endA.x;
    return (givenY - this.yIntercept) / this.slope;
  }
  findY(givenX) {
    if (!isBetween(this.endA.x, this.endB.x, givenX)) return NaN;
    if (this.endA.x == this.endB.x) return this.endA.y;
    return this.slope * givenX + this.yIntercept;
  }
  hasPoint(other) {
    if (!(other instanceof Point)) return false;
    return (
      isBetween(this.endA.x, this.endB.x, other.x) &&
      isBetween(this.endA.y, this.endB.y, other.y)
    );
  }
  get midPoint() {
    return {
      x: (this.endA.x + this.endB.x) / 2,
      y: (this.endA.y + this.endB.y) / 2
    };
  }
  split() {
    return [
      new Line(this.endA, this.midPoint),
      new Line(this.midPoint, this.endB)
    ];
  }
  findPointFromStart(other) {
    let t = other / this.length;
    return new Point(
      round((1 - t) * this.endA.x + t * this.endB.x),
      round((1 - t) * this.endA.y + t * this.endB.y)
    );
  }
  findPointFromEnd(other) {
    let t = other / this.length;
    return new Point(
      round((1 - t) * this.endB.x + t * this.endA.x),
      round((1 - t) * this.endB.y + t * this.endA.y)
    );
  }
}

module.exports = Line;
