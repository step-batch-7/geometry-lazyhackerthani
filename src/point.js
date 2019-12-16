const { hypot, min, max } = Math;
const isBetween = function(range1, range2, no) {
  return min(range1, range2) <= no && no <= max(range1, range2);
};
class Point {
  constructor(x, y) {
    [this.x, this.y] = [x, y];
  }
  toString() {
    return `[Point @(${this.x},${this.y})]`;
  }
  visit(doOperation) {
    if (typeof doOperation !== 'function') {
      return undefined;
    }
    return doOperation(this.x, this.y);
  }
  isEqualTo(other) {
    if (!(other instanceof Point)) return false;
    return this.x === other.x && this.y === other.y;
  }
  clone() {
    return new Point(this.x, this.y);
  }
  findDistanceTo(other) {
    return hypot(this.x - other.x, this.y - other.y);
  }
  isOn(other) {
    return (
      isBetween(other.endA.x, other.endB.x, this.x) &&
      isBetween(other.endA.y, other.endB.y, this.y)
    );
  }
}

module.exports = Point;
