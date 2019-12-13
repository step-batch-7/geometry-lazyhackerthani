const isEqualPoint = function(point1, point2) {
  return point1.x == point2.x && point1.y == point2.y;
};

class Line {
  constructor(p1x, p1y, p2x, p2y) {
    [this.pointA, this.pointB] = [
      { x: p1x, y: p1y },
      { x: p2x, y: p2y }
    ];
  }
  toString() {
    let inString = `points(${this.pointA.x},${this.pointA.y}),(${this.pointB.x},${this.pointB.y})`;
    return inString;
  }
  isEqualTo(other) {
    return (
      other instanceof Line &&
      isEqualPoint(other.pointA, this.pointA) &&
      isEqualPoint(other.pointB, this.pointB)
    );
  }
}

module.exports = Line;
