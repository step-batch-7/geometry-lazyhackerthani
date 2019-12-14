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
}

module.exports = Point;
