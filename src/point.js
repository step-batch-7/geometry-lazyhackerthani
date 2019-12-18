const { hypot, min, max } = Math;

class Point {
  constructor(x, y) {
    [this.x, this.y] = [x, y];
    Object.defineProperties(this, {
      x: { writable: false },
      y: { writable: false }
    });
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
    if (!(other instanceof Point)) return NaN;
    return hypot(this.x - other.x, this.y - other.y);
  }
  isOn(other) {
    return other.hasPoint(this);
  }
}

module.exports = Point;
