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
  });
  describe('covers', function() {
    it('should say true if point is inside the rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 2 });
      const point = new Point(1, 1);
      assert.isTrue(rectangle.covers(point));
    });
    it('should say false if point is not inside the rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 2 });
      const point = new Point(1, 3);
      assert.isFalse(rectangle.covers(point));
    });
  });
});
