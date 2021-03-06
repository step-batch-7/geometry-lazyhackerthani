`use strict`;
const assert = require('chai').assert;
const Line = require('../src/line.js');
const Point = require('../src/point');

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
      const line = new Line(new Point(2, 3), new Point(3, 4));
      const otherLine = new Line(new Point(2, 3), new Point(3, 4));
      const actual = line.isEqualTo(otherLine);
      assert.isTrue(actual);
    });
    it('should give true if given object is a instance of line and have same points in reverse order', function() {
      const line = new Line(new Point(2, 3), new Point(3, 4));
      const otherLine = new Line(new Point(3, 4), new Point(2, 3));
      const actual = line.isEqualTo(otherLine);
      assert.isTrue(actual);
    });
    it('should give false if given object is a instance of line but have different values', function() {
      const line = new Line(new Point(2, 3), new Point(3, 4));
      const otherLine = new Line(new Point(2, 3), new Point(4, 4));
      const actual = line.isEqualTo(otherLine);
      assert.isFalse(actual);
    });
    it('should give false if given object is not a instance of line', function() {
      const line = new Line(new Point(2, 3), new Point(3, 4));
      const otherLine = new Point(2, 3);
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
    it('should have slope as -infinity if line is parallel to x axis and difference of x co-ordinates is negative', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 2 });
      assert.strictEqual(line.slope, 0);
    });
    it('should have slope as infinity if line is parallel to x axis and difference of x co-ordinates is positive ', function() {
      const line = new Line({ x: 3, y: 2 }, { x: 1, y: 2 });
      assert.strictEqual(line.slope, 0);
    });
    it('should have slope as 0 if line is parallel to y axis ', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 3 });
      assert.strictEqual(line.slope, Infinity);
    });
    it('should give Infinity as slope when line is parallel to y-axis and direction is upwards', function() {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 1 });
      const actualValue = line.slope;
      const expectedValue = Infinity;
      assert.strictEqual(actualValue, expectedValue);
    });
    it('should give zero for x-axis', () => {
      const line = new Line({ x: 2, y: 0 }, { x: 1, y: 0 });
      const actual = line.slope;
      const expected = 0;
      assert.deepStrictEqual(actual, expected);
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
    it('should give true if both lines are parallel to Y-axis and slope is in negative', function() {
      const line1 = new Line({ x: 0, y: 0 }, { x: 0, y: 4 });
      const line2 = new Line({ x: 1, y: 1 }, { x: 1, y: -3 });
      assert.isTrue(line1.isParallelTo(line2));
    });
    it('should give true if both lines are parallel to Y-axis and second point has goes down', function() {
      const line1 = new Line({ x: 0, y: 0 }, { x: 0, y: 4 });
      const line2 = new Line({ x: 1, y: 4 }, { x: 1, y: 0 });
      assert.isTrue(line1.isParallelTo(line2));
    });
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
    it('should one value when line is parallel to x axis', function() {
      const line = new Line({ x: 3, y: 1 }, { x: 4, y: 1 });
      assert.strictEqual(line.findX(1), 3);
    });
    it('should should give floating value of x for given y', function() {
      const line = new Line({ x: 0, y: 0 }, { x: 3, y: 4 });
      assert.approximately(line.findX(1), 0.75, 0.1);
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
    it('should one value when line is parallel to y axis', function() {
      const line = new Line({ x: 3, y: 1 }, { x: 3, y: 2 });
      assert.strictEqual(line.findY(3), 1);
    });
  });

  describe('hasPoint', function() {
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
    it('should say false if point is not on the line but in the no range', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 4, y: 4 });
      const point = new Point(2, 1);
      assert.isFalse(line.hasPoint(point));
    });
    it('should say false if given is not a Point', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      const point = { x: 1, y: 1 };
      assert.isFalse(line.hasPoint(point));
    });
    it('should say false if point is not on the line but satisfy line equation', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      const point = new Point(4, 4);
      assert.isFalse(line.hasPoint(point));
    });
    it('should say true if point is on the line and the line is parallel to y axis', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 1, y: 3 });
      const point = new Point(1, 2);
      assert.isTrue(line.hasPoint(point));
    });
    it('should say true for (0,0) as point and on y axis', function() {
      const line = new Line({ x: 0, y: 0 }, { x: 0, y: 3 });
      const point = new Point(0, 0);
      assert.isTrue(line.hasPoint(point));
    });
    it('should say true for (0,0) as point and line on x axis', function() {
      const line = new Line({ x: 0, y: 0 }, { x: 4, y: 0 });
      const point = new Point(0, 0);
      assert.isTrue(line.hasPoint(point));
    });
    it('should say true for (0,0) as point and line on x axis even in reverse', function() {
      const line = new Line({ x: 4, y: 0 }, { x: 0, y: 0 });
      const point = new Point(0, 0);
      assert.isTrue(line.hasPoint(point));
    });
    it('should say true for (0,0) as end point', function() {
      const line = new Line({ x: 0, y: 0 }, { x: 0, y: 3 });
      const point = new Point(0, 2);
      assert.isTrue(line.hasPoint(point));
    });
    it('should say true for end Point1', function() {
      const line = new Line({ x: 2, y: 2 }, { x: 2, y: 5 });
      const point = new Point(2, 2);
      assert.isTrue(line.hasPoint(point));
    });
    it('should say true for end Point2', function() {
      const line = new Line({ x: 2, y: 2 }, { x: 2, y: 5 });
      const point = new Point(2, 5);
      assert.isTrue(line.hasPoint(point));
    });
    it('should say true for negative point', function() {
      const line = new Line({ x: 2, y: -2 }, { x: 2, y: 5 });
      const point = new Point(2, -1);
      assert.isTrue(line.hasPoint(point));
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

  describe('findPointFromStart', function() {
    it('should give point at given distance on the line from start', function() {
      const line = new Line({ x: 0, y: 1 }, { x: 7, y: 1 });
      assert.deepStrictEqual(line.findPointFromStart(2), { x: 2, y: 1 });
    });
    it('should give point at given distance on the line even when second point has smaller co-ordinates', function() {
      const line = new Line({ x: 6, y: 1 }, { x: 0, y: 1 });
      assert.deepStrictEqual(line.findPointFromStart(2), { x: 4, y: 1 });
    });
  });

  describe('findPointFromEnd', function() {
    it('should give point at given distance on the line from end', function() {
      const line = new Line({ x: 0, y: 1 }, { x: 5, y: 1 });
      assert.deepStrictEqual(line.findPointFromEnd(2), { x: 3, y: 1 });
    });
    it('should give point at given distance on the line even when second point has smaller co-ordinates', function() {
      const line = new Line({ x: 6, y: 1 }, { x: 0, y: 1 });
      assert.deepStrictEqual(line.findPointFromEnd(2), { x: 2, y: 1 });
    });
  });
});
