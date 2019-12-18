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
    it('should remain unchanged of the properties of the circle', () => {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      circle.center.x = undefined;
      circle.center.y = undefined;
      circle.radius = undefined;
      const actual = circle.toString();
      const expected = '[Circle @(1,2) radius 5]';
      assert.deepStrictEqual(actual, expected);
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
    it('should say false if given is not a instance of circle but has point', function() {
      const circle = new Circle(new Point(1, 2), 5);
      assert.isFalse(circle.isEqualTo(new Point(1, 2), 5));
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
    it('should say false if point is not on the circle', function() {
      const circle = new Circle(new Point(0, 0), 2);
      const point = new Point(1, 3);
      assert.isFalse(circle.hasPoint(point));
    });
    it('should say False if point is inside the circle', function() {
      const circle = new Circle(new Point(0, 0), 2);
      const point = new Point(1, 1);
      assert.isFalse(circle.hasPoint(point));
    });
    it('should say False if point is in the center of circle', function() {
      const circle = new Circle(new Point(0, 0), 2);
      const point = new Point(0, 0);
      assert.isFalse(circle.hasPoint(point));
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
  describe('covers', function() {
    it('should say true for point inside the circle', function() {
      const circle = new Circle(new Point(0, 0), 2);
      assert.isTrue(circle.covers(new Point(0, 1)));
    });
    it('should say false if point is not inside the circle', function() {
      const circle = new Circle(new Point(0, 0), 2);
      const point = new Point(1, 3);
      assert.isFalse(circle.covers(point));
    });
    it('should say false if point is on the circle', function() {
      const circle = new Circle(new Point(0, 0), 2);
      const point = new Point(0, 2);
      assert.isFalse(circle.covers(point));
    });
    it('should say True if point is in the center of circle', function() {
      const circle = new Circle(new Point(0, 0), 2);
      const point = new Point(0, 0);
      assert.isTrue(circle.covers(point));
    });
  });
});
