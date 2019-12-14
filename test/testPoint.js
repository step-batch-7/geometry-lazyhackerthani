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
});
