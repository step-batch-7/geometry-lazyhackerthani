`use strict`;
const assert = require('chai').assert;
const Point = require('../src/point.js');

describe('Point', function() {
  describe('toString', function() {
    it('should give string representation of point when it has x and y', function() {
      const point = new Point(1, 2);
      assert.strictEqual(point.toString(), '[Point @(1,2)]');
    });
    it('should give string representation of point with undefined when x or y is not given', function() {
      const point = new Point(2);
      assert.strictEqual(point.toString(), '[Point @(2,undefined)]');
    });
  });
  describe('visit', function() {
    it('should give result of operation done on the function given', function() {
      let point = new Point(1, 2);
      assert.strictEqual(
        point.visit((x, y) => x + y),
        3
      );
      point = new Point(1, 2);
      assert.strictEqual(
        point.visit((x, y) => x * y),
        2
      );
    });
    it('should give undefined if given is not a function', function() {
      const point = new Point(1, 2);
      assert.strictEqual(point.visit('function'), undefined);
    });
  });
  describe('isEqualTo', function() {
    it('should say true if both points are equal', function() {
      const point1 = new Point(1, 2);
      const point2 = new Point(1, 2);
      assert.isTrue(point1.isEqualTo(point2));
    });
    it('should say false if both points are not equal', function() {
      const point1 = new Point(1, 2);
      const point2 = new Point(2, 2);
      assert.isFalse(point1.isEqualTo(point2));
    });
  });
  describe('clone', function() {
    it('should give a copy of point', function() {
      const point1 = new Point(1, 2);
      const point2 = new Point(1, 2);
      assert.deepStrictEqual(point1.clone(), point2);
    });
  });
  describe('findDistanceTo', function() {
    it('should give distance between two distinct points', function() {
      const point1 = new Point(1, 2);
      const point2 = new Point(2, 2);
      assert.strictEqual(point1.findDistanceTo(point2), 1);
    });
    it('should give distance between points as 0 when both the points are equal', function() {
      const point1 = new Point(1, 2);
      const point2 = new Point(1, 2);
      assert.strictEqual(point1.findDistanceTo(point2), 0);
    });
  });
  describe('isOn', function() {
    const Line = require('../src/line.js');
    it('should say true if the point is on the given line', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      const point = new Point(2, 2);
      assert.isTrue(point.isOn(line));
    });
    it('should say false if the point is not on the given line', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 3 });
      const point = new Point(3, 4);
      assert.isFalse(point.isOn(line));
    });
    it('should say false if point is not on the line but in the no range', function() {
      const line = new Line({ x: 1, y: 1 }, { x: 4, y: 4 });
      const point = new Point(2, 1);
      assert.isFalse(point.isOn(line));
    });
  });
});
