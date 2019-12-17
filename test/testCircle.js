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
    it('should say false for circle with different center or radius', function() {
      let circle1 = new Circle(new Point(1, 2), 5);
      let circle2 = new Circle(new Point(1, 3), 5);
      assert.isFalse(circle1.isEqualTo(circle2));
      circle1 = new Circle(new Point(1, 2), 5);
      circle2 = new Circle(new Point(1, 2), 3);
      assert.isFalse(circle1.isEqualTo(circle2));
    });
    it('should give false if given is not a instance of circle', function() {
      const circle = new Circle(new Point(1, 2), 5);
      assert.isFalse(circle.isEqualTo({ x: 1, y: 2 }, 5));
    });
  });
  describe('area', function() {
    it('should give area of circle', function() {
      const circle = new Circle(new Point(0, 0), 2);
      assert.approximately(circle.area, 12.56, 0.01);
    });
  });
  describe('perimeter', function() {
    it('should give perimeter of a circle', function() {
      const circle = new Circle(new Point(0, 0), 2);
      assert.approximately(circle.area, 12.56, 0.01);
    });
  });
  describe('hasPoint', function() {
    it('should say true if point is on the circle', function() {
      const circle = new Circle(new Point(0, 0), 2);
      const point = new Point(2, 0);
      assert.isTrue(circle.hasPoint(point));
    });
  });
  describe('moveTo', function() {
    it('should creates a new circle of same dimensions at 1,1', function() {
      const circle = new Circle(new Point(0, 0), 2);
      const circle1 = circle.moveTo({ x: 1, y: 1 });
      const circle2 = new Circle({ x: 1, y: 1 }, 2);
      assert.isTrue(circle2.isEqualTo(circle1));
    });
  });
});
