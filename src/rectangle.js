const { abs } = Math;
const Point = require('../src/point');

class Rectangle {
  constructor(d1, d2) {
    this.d1 = new Point(d1.x, d1.y);
    this.d2 = new Point(d2.x, d2.y);
  }
  toString() {
    return `[Rectangle (${this.d1.x},${this.d1.y}) to (${this.d2.x},${this.d2.y})]`;
  }
  get area() {
    //a=wl
    return abs(this.d2.x - this.d1.x) * abs(this.d2.y - this.d1.y);
  }
}

module.exports = Rectangle;
