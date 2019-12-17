const { pow, PI } = Math;
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
  get area() {
    return PI * pow(this.radius, 2);
  }
  get perimeter() {
    return 2 * PI * this.radius;
  }
  hasPoint(other) {
    return (
      pow(other.x - this.center.x, 2) + pow(other.y - this.center.y, 2) <=
      pow(this.radius, 2)
    );
  }
  moveTo(other) {
    return new Circle(other, this.radius);
  }
}

module.exports = Circle;
