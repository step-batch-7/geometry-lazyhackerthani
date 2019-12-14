`use strict`;
const assert = require('chai').assert;
const Line = require('../src/line.js');

describe('Line', function() {
  describe('toString', function() {
    it('should give string representation of a line', function() {
      const line = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const actual = line.toString();
      const expected = `[Line (2,3) to (3,4)]`;
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('isEqualTo', function() {
    it('should give true if given object is a instance of line and have same values', function() {
      const line = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const otherLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const actual = line.isEqualTo(otherLine);
      assert.isTrue(actual);
    });
    it('should give false if given object is a instance of line but have different values', function() {
      const line = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const otherLine = new Line({ x: 2, y: 3 }, { x: 4, y: 4 });
      const actual = line.isEqualTo(otherLine);
      assert.isFalse(actual);
    });
    it('should give false if given object is not a instance of line', function() {
      const line = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const otherLine = { x: 2, y: 3 };
      const actual = line.isEqualTo(otherLine);
      assert.isFalse(actual);
    });
  });

  describe('length', function() {
    it('should give length of the line when both the points are not same and have integer value', function() {
      const line = new Line({ x: 2, y: 3 }, { x: 3, y: 3 });
      assert.strictEqual(line.length, 1);
    });
    it('should give length as 0 when the line is actually a point', function() {
      const line = new Line({ x: 3, y: 3 }, { x: 3, y: 3 });
      assert.strictEqual(line.length, 0);
    });
  });
  it('should give length of the line when both the points are not same and have floating value', function() {
    let line = new Line({ x: 2, y: 3 }, { x: 3.5, y: 3 });
    assert.strictEqual(line.length, 1.5);

    line = new Line({ x: 2, y: 3 }, { x: 3.5, y: 4.5 });
    assert.approximately(line.length, 2.1213, 0.0001);
  });
});

describe('slope', function() {
  it('should have slope for a line neither parallel to x nor to y axis', function() {
    const line = new Line({ x: 3, y: 5 }, { x: 4, y: 6 });
    assert.strictEqual(line.slope, 1);
  });
  it('should have slope as undefined if line is parallel to x axis ', function() {
    const line = new Line({ x: 1, y: 2 }, { x: 3, y: 2 });
    assert.strictEqual(line.slope, undefined);
  });
  it('should have slope as 0 if line is parallel to y axis ', function() {
    const line = new Line({ x: 1, y: 2 }, { x: 1, y: 3 });
    assert.strictEqual(line.slope, 0);
  });
});

describe('isParallelTo', function() {
  it('should say true if given line are parallel', function() {
    const line1 = new Line({ x: 3, y: 3 }, { x: 6, y: 6 });
    const line2 = new Line({ x: 4, y: 3 }, { x: 6, y: 5 });
    assert.isTrue(line1.isParallelTo(line2));
  });
  it('should say false if given line are overlapping', function() {
    const line1 = new Line({ x: 3, y: 5 }, { x: 4, y: 6 });
    const line2 = new Line({ x: 4, y: 6 }, { x: 6, y: 8 });
    assert.isFalse(line1.isParallelTo(line2));
  });
  it('should say false if given line are not parallel', function() {
    const line1 = new Line({ x: 3, y: 5 }, { x: 4, y: 6 });
    const line2 = new Line({ x: 4, y: 6 }, { x: 6, y: 5 });
    assert.isFalse(line1.isParallelTo(line2));
  });
  it('should say false if given object is not a line', function() {
    const line1 = new Line({ x: 3, y: 5 }, { x: 4, y: 6 });
    const line2 = { endA: { x: 4, y: 6 }, endB: { x: 6, y: 5 }, slope: 1 };
    assert.isFalse(line1.isParallelTo(line2));
  });

  describe('findX', function() {
    it('should give x for given y on the line', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.strictEqual(line.findX(2), 2);
    });
    it('should give NaN when y is outside the Line Segment', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.isNaN(line.findX(4));
    });
  });
  describe('findY', function() {
    it('should give y for given x on the line', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.strictEqual(line.findY(2), 2);
    });
    it('should give NaN when x is outside the Line Segment', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.isNaN(line.findY(4));
    });
  });
  describe('hasPoint', function() {
    const Point = require('../src/point');
    it('should say true if point is on the line', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      const point = new Point(2, 2);
      assert.isTrue(line.hasPoint(point));
    });
    it('should say true if point is on the line and second point has smaller x and y', function() {
      const line = new Line({ x: 1, y: 3 }, { x: 3, y: 1 });
      const point = new Point(2, 2);
      assert.isTrue(line.hasPoint(point));
    });
    it('should say false if point is not on the line', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      const point = new Point(4, 1);
      assert.isFalse(line.hasPoint(point));
    });
  });
  describe('midPoint', function() {
    it('should give midPoint of the', function() {
      const line = new Line({ x: 2, y: 4 }, { x: 6, y: 12 });
      assert.deepStrictEqual(line.midPoint, { x: 4, y: 8 });
    });
  });
  describe('split', function() {
    it('should give two lines split on middle point', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      const expected = [
        new Line({ x: 1, y: 1 }, { x: 2, y: 2 }),
        new Line({ x: 2, y: 2 }, { x: 3, y: 3 })
      ];
      assert.deepStrictEqual(line.split(), expected);
    });
  });
});
