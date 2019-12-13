const isEqualPoint = function(point1, point2) {
  return point1.x == point2.x && point1.y == point2.y;
};

class Line {
  constructor(endA, endB) {
    [this.endA, this.endB] = [
      { x: endA.x, y: endA.y },
      { x: endB.x, y: endB.y }
    ];
  }
  toString() {
    let inString = `points(${this.endA.x},${this.endA.y}),(${this.endB.x},${this.endB.y})`;
    return inString;
  }
  isEqualTo(other) {
    return (
      other instanceof Line &&
      isEqualPoint(other.endA, this.endA) &&
      isEqualPoint(other.endB, this.endB)
    );
  }
}

module.exports = Line;
