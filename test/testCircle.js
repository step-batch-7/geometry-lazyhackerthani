`use strict`;
const assert = require('chai').assert;
const Circle = require('../src/circle.js');
const Point = require('../src/point');

describe('Circle', function() {
  describe('toString', function() {
    it('should give string representation of a circle', function() {
      const circle = new Circle(new Point(1, 2), 5);
      assert.strictEqual(circle.toString(), `[Circle @(1,2) radius 5]`);
    });
  });
  describe('isEqualTo', function() {
    it('should say true for circle with same center and radius', function() {
      const circle1 = new Circle(new Point(1, 2), 5);
      const circle2 = new Circle(new Point(1, 2), 5);
      assert.isTrue(circle1.isEqualTo(circle2));
    });
  });
});
