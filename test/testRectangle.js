`use strict`;
const assert = require('chai').assert;
const Rectangle = require('../src/rectangle.js');

describe('Rectangle', function() {
  describe('toString', function() {
    it('should give string representation of a rectangle', function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 2, y: 3 });
      assert.strictEqual(rectangle.toString(), `[Rectangle (1,1) to (2,3)]`);
    });
  });
});
