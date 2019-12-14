`use strict`;
const assert = require('chai').assert;
const Point = require('../src/point.js');

describe('Point', function() {
  describe('toString', function() {
    it('should give string representation of point when it has x and y', function() {
      const myPoint = new Point(1, 2);
      assert.strictEqual(myPoint.toString(), '[Point @(1,2)]');
    });
    it('should give string representation of point with undefined when x or y is not given', function() {
      const myPoint = new Point(2);
      assert.strictEqual(myPoint.toString(), '[Point @(2,undefined)]');
    });
  });
  describe('visit', function() {
    it('should give result of operation done on the function given', function() {
      let myPoint = new Point(1, 2);
      assert.strictEqual(
        myPoint.visit((x, y) => x + y),
        3
      );
      myPoint = new Point(1, 2);
      assert.strictEqual(
        myPoint.visit((x, y) => x * y),
        2
      );
    });
  });
});
