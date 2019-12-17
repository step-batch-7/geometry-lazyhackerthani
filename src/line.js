const { min, max, round } = Math;
const Point = require('../src/point');

const isBetween = function(range1, range2, no) {
  return min(range1, range2) <= no && no <= max(range1, range2);
};

const areCollinear = function(point1, point2, point3) {
  return (
    point1.x * (point2.y - point3.y) +
      point2.x * (point3.y - point1.y) +
      point3.x * (point1.y - point2.y) ===
    0
  );
};

class Line {
  constructor(endA, endB) {
    this.endA = new Point(endA.x, endA.y);
    this.endB = new Point(endB.x, endB.y);
  }
  toString() {
    return `[Line (${this.endA.x},${this.endA.y}) to (${this.endB.x},${this.endB.y})]`;
  }
  isEqualTo(other) {
    if (!(other instanceof Line)) return false;
    return (
      (this.endA.isEqualTo(other.endA) && this.endB.isEqualTo(other.endB)) ||
      (this.endA.isEqualTo(other.endB) && this.endB.isEqualTo(other.endA))
    );
  }
  get length() {
    return this.endA.findDistanceTo(this.endB);
  }
  isParallelTo(other) {
    if (
      !(other instanceof Line) ||
      areCollinear(this.endA, this.endB, other.endA)
    )
      return false;
    return this.slope === other.slope;
  }
  get slope() {
    return (this.endA.x - this.endB.x) / (this.endA.y - this.endB.y);
  }
  findX(givenY) {
    if (!isBetween(this.endA.y, this.endB.y, givenY)) return NaN;
    if (this.slope == undefined) return this.endA.x;
    return (givenY - this.endA.y) / this.slope + this.endA.x;
  }
  findY(givenX) {
    if (!isBetween(this.endA.x, this.endB.x, givenX)) return NaN;
    if (this.slope == 0) return this.endA.y;
    return this.slope * (givenX - this.endA.x) + this.endA.x;
  }
  hasPoint(other) {
    if (!(other instanceof Point)) return false;
    return (
      areCollinear(this.endA, this.endB, other) &&
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
      (1 - t) * this.endA.x + t * this.endB.x,
      (1 - t) * this.endA.y + t * this.endB.y
    );
  }
  findPointFromEnd(other) {
    let t = other / this.length;
    return new Point(
      (1 - t) * this.endB.x + t * this.endA.x,
      (1 - t) * this.endB.y + t * this.endA.y
    );
  }
}

module.exports = Line;
