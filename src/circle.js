const Point = require('../src/point');

class Circle {
  constructor(center, radius) {
    this.center = new Point(center.x, center.y);
    this.radius = radius;
  }
  toString() {
    return `[Circle @(${this.center.x},${this.center.y}) radius ${this.radius}]`;
  }
  isEqualTo(other) {
    return this.center.isEqualTo(other.center) && this.radius == other.radius;
  }
}

module.exports = Circle;