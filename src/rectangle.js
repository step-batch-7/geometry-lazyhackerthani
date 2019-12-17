const Point = require('../src/point');

class Rectangle {
  constructor(diagonal1, diagonal2) {
    this.diagonal1 = new Point(diagonal1.x, diagonal1.y);
    this.diagonal2 = new Point(diagonal2.x, diagonal2.y);
  }
  toString() {
    return `[Rectangle (${this.diagonal1.x},${this.diagonal1.y}) to (${this.diagonal2.x},${this.diagonal2.y})]`;
  }
}

module.exports = Rectangle;
