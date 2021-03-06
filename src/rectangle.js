const { abs, min, max } = Math;
const Point = require('../src/point');
const Line = require('../src/line.js');

const isBetween = function(range1, range2, no) {
  return min(range1, range2) < no && no < max(range1, range2);
};

const getWidth = function(point1, point2) {
  return abs(point2.x - point1.x);
};

const getHeight = function(point1, point2) {
  return abs(point2.y - point1.y);
};

const getVertices = function(d1, d2) {
  return [d1, new Point(d2.x, d1.y), d2, new Point(d1.x, d2.y)];
};

const getSides = function(vertices) {
  const pairVertices = [...vertices];
  pairVertices.push(pairVertices.shift());
  return pairVertices.map((point2, i) => {
    return new Line(vertices[i], point2);
  });
};

const areDiagonalsEqual = function(thisD1, thisD2, otherD1, otherD2) {
  const rect1Diagonal1 = new Line(thisD1, thisD2);
  const rect1Diagonal2 = new Line(
    new Point(thisD2.x, thisD1.y),
    new Point(thisD1.x, thisD2.y)
  );
  const otherDiagonal = new Line(otherD1, otherD2);
  return (
    rect1Diagonal1.isEqualTo(otherDiagonal) ||
    rect1Diagonal2.isEqualTo(otherDiagonal)
  );
};

class Rectangle {
  constructor(d1, d2) {
    this.d1 = new Point(d1.x, d1.y);
    this.d2 = new Point(d2.x, d2.y);
    Object.defineProperties(this, {
      d1: { writable: false },
      d2: { writable: false }
    });
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
  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    return areDiagonalsEqual(this.d1, this.d2, other.d1, other.d2);
  }
  covers(other) {
    if (!(other instanceof Point)) return false;
    return (
      isBetween(this.d1.x, this.d2.x, other.x) &&
      isBetween(this.d1.y, this.d2.y, other.y)
    );
  }
  hasPoint(other) {
    if (!(other instanceof Point)) return false;
    const sides = getSides(getVertices(this.d1, this.d2));
    return sides.some(side => side.hasPoint(other));
  }
}

module.exports = Rectangle;
