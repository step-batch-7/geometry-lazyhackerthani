const { abs } = Math;
const Point = require('../src/point');

const getWidth = function(point1, point2) {
  return abs(point2.x - point1.x);
};

const getHeight = function(point1, point2) {
  return abs(point2.y - point1.y);
};

class Rectangle {
  constructor(d1, d2) {
    this.d1 = new Point(d1.x, d1.y);
    this.d2 = new Point(d2.x, d2.y);
  }
  toString() {
    return `[Rectangle (${this.d1.x},${this.d1.y}) to (${this.d2.x},${this.d2.y})]`;
  }
  get area() {
    return getWidth(this.d1, this.d2) * getHeight(this.d1, this.d2);
  }
  get perimeter() {
    return (getWidth(this.d1, this.d2) + getHeight(this.d1, this.d2)) * 2;
  }
}

module.exports = Rectangle;
