`use strict`;
const assert = require('chai').assert;
const Point = require('../src/point');
const Rectangle = require('../src/rectangle.js');

describe('Rectangle', function() {
  describe('toString', function() {
    it('should give string representation of a rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.strictEqual(rectangle.toString(), `[Rectangle (1,1) to (2,3)]`);
    });
  });
  describe('area', function() {
    it('should give the area of rectangle with every value positive', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 2 });
      assert.strictEqual(rectangle.area, 1);
    });
    it('should give the area of rectangle with one diagonal has negative value', function() {
      const rectangle = new Rectangle({ x: -1, y: -1 }, { x: 2, y: 2 });
      assert.strictEqual(rectangle.area, 9);
    });
    it('should give the area of rectangle with first diagonal has greater value than second', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: -2, y: -2 });
      assert.strictEqual(rectangle.area, 9);
    });
    it('should give the area of rectangle with diagonal has both positive and negative value', function() {
      const rectangle = new Rectangle({ x: -2, y: 2 }, { x: 2, y: 4 });
      assert.strictEqual(rectangle.area, 8);
    });
    it('should give the area of rectangle has zero area', function() {
      const rectangle = new Rectangle({ x: 1, y: 2 }, { x: 1, y: 4 });
      assert.strictEqual(rectangle.area, 0);
    });
  });
  describe('perimeter', function() {
    it('should give perimeter of a rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 2 });
      assert.strictEqual(rectangle.perimeter, 4);
    });
    it('should give the perimeter of rectangle with one diagonal has negative value', function() {
      const rectangle = new Rectangle({ x: -1, y: -1 }, { x: 2, y: 2 });
      assert.strictEqual(rectangle.perimeter, 12);
    });
    it('should give the perimeter of rectangle with first diagonal has greater value than second', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: -2, y: -2 });
      assert.strictEqual(rectangle.perimeter, 12);
    });
    it('should give the perimeter of rectangle with diagonal has both positive and negative value', function() {
      const rectangle = new Rectangle({ x: -2, y: 2 }, { x: 2, y: 4 });
      assert.strictEqual(rectangle.perimeter, 12);
    });
    it('should give the perimeter of rectangle has zero area', function() {
      const rectangle = new Rectangle({ x: 1, y: 2 }, { x: 1, y: 4 });
      assert.strictEqual(rectangle.perimeter, 4);
    });
  });
  describe('isEqualTo', function() {
    it('should say true rectangle are equal', function() {
      const rectangle1 = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 2 });
      const rectangle2 = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 2 });
      assert.isTrue(rectangle1.isEqualTo(rectangle2));
    });
    it('should say false rectangle are not equal', function() {
      const rectangle1 = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 2 });
      const rectangle2 = new Rectangle({ x: 1, y: 2 }, { x: 2, y: 4 });
      assert.isFalse(rectangle1.isEqualTo(rectangle2));
    });
    it('should say false given is not a rectangle instance', function() {
      const rectangle1 = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 2 });
      assert.isFalse(
        rectangle1.isEqualTo({ d1: { x: 1, y: 1 }, d2: { x: 2, y: 2 } })
      );
    });
    it('should give true when another diagonal of rectangle is given', function() {
      const rectangle1 = new Rectangle({ x: 1, y: 2 }, { x: 4, y: 7 });
      const rectangle2 = new Rectangle({ x: 4, y: 2 }, { x: 1, y: 7 });
      assert.isTrue(rectangle1.isEqualTo(rectangle2));
    });
  });
  describe('covers', function() {
    it('should say true if point is inside the rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      const point = new Point(2, 2);
      assert.isTrue(rectangle.covers(point));
    });
    it('should say false if point is not inside the rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 2 });
      const point = new Point(1, 3);
      assert.isFalse(rectangle.covers(point));
    });
    it('should say false if point is on the rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      const point = new Point(3, 3);
      assert.isFalse(rectangle.covers(point));
    });
    it('should say false if point is on the rectangle and second point has smaller x and y', function() {
      const rectangle = new Rectangle({ x: 1, y: 3 }, { x: 3, y: 1 });
      const point = new Point(1, 2);
      assert.isFalse(rectangle.covers(point));
    });
    it('should say false if point is not on the rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      const point = new Point(4, 1);
      assert.isFalse(rectangle.covers(point));
    });
    it('should say True if point is not on the rectangle but inside the rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 4, y: 4 });
      const point = new Point(2, 3);
      assert.isTrue(rectangle.covers(point));
    });
    it('should say false if given is not a Point', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      assert.isFalse(rectangle.covers({ x: 1, y: 1 }));
    });
    it('should say false for (0,0) as point and rectangle on y axis', function() {
      const rectangle = new Rectangle({ x: 0, y: 0 }, { x: 1, y: 3 });
      const point = new Point(0, 0);
      assert.isFalse(rectangle.covers(point));
    });
    it('should say false for (0,0) as point and rectangle on x axis', function() {
      const rectangle = new Rectangle({ x: 0, y: 0 }, { x: 3, y: 1 });
      const point = new Point(0, 0);
      assert.isFalse(rectangle.covers(point));
    });
    it('should say true for point is inside the rectangle and (0,0) as end point', function() {
      const rectangle = new Rectangle({ x: 0, y: 0 }, { x: 2, y: 3 });
      const point = new Point(0.1, 2);
      assert.isTrue(rectangle.covers(point));
    });
    it('should say true for point is not on the rectangle but inside and has negative point', function() {
      const rectangle = new Rectangle({ x: 2, y: -2 }, { x: 3, y: 5 });
      const point = new Point(2.5, -1);
      assert.isTrue(rectangle.covers(point));
    });
    it('should return true when point is inside the rectangle', function() {
      const rectangle = new Rectangle({ x: 3, y: 2 }, { x: 7, y: 4 });
      const point = new Point(5, 3);
      assert.isTrue(rectangle.covers(point));
    });
  });

  describe('hasPoint', function() {
    it('should say true if point is on the rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 2 });
      const point = new Point(1, 1);
      assert.isTrue(rectangle.hasPoint(point));
    });
    it('should say false if point is not on the rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 2 });
      const point = new Point(1, 3);
      assert.isFalse(rectangle.hasPoint(point));
    });
    it('should say true if point is on the rectangle and second point has smaller x and y', function() {
      const rectangle = new Rectangle({ x: 1, y: 3 }, { x: 3, y: 1 });
      const point = new Point(2, 1);
      assert.isTrue(rectangle.hasPoint(point));
    });
    it('should say false if point is not on the rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      const point = new Point(4, 1);
      assert.isFalse(rectangle.hasPoint(point));
    });
    it('should say false if given is not a Point', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 3, y: 3 });
      const point = { x: 1, y: 1 };
      assert.isFalse(rectangle.hasPoint(point));
    });
    it('should say true for (0,0) as point on rectangle and on y axis', function() {
      const rectangle = new Rectangle({ x: 0, y: 0 }, { x: 0, y: 3 });
      const point = new Point(0, 0);
      assert.isTrue(rectangle.hasPoint(point));
    });
    it('should say true for (0,0) as point on rectangle and on x axis', function() {
      const rectangle = new Rectangle({ x: 0, y: 0 }, { x: 3, y: 0 });
      const point = new Point(0, 0);
      assert.isTrue(rectangle.hasPoint(point));
    });
    it('should say false for point is not on the rectangle and has negative point', function() {
      const rectangle = new Rectangle({ x: 2, y: -2 }, { x: 4, y: 5 });
      const point = new Point(3, -1);
      assert.isFalse(rectangle.hasPoint(point));
    });
    it('should say true for point is on the rectangle and has negative point', function() {
      const rectangle = new Rectangle({ x: 2, y: -2 }, { x: 4, y: 5 });
      const point = new Point(2, -1);
      assert.isTrue(rectangle.hasPoint(point));
    });
  });
});
