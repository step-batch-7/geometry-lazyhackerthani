`use strict`;
const assert = require('chai').assert;
const Point = require('../src/point.js');

describe('Point', function() {
  describe('toString', function() {
    it('should give string representation of string', function() {
      const myPoint = new Point(1, 2);
      assert.strictEqual(myPoint.toString(), '[Point @(1,2)]');
    });
  });
});
