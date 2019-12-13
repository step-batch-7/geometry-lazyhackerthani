const assert = require('assert');
const Line = require('../src/line.js');

describe('Line', function() {
  describe('toString in Line class', function() {
    it('should give features of a line', function() {
      let myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      let actual = myLine.toString();
      let expected = `line (${2},${3}), (${3},${4})`;
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('isEqualTo in Line class', function() {
    it('should give true if given object is a instance of line have same properties', function() {
      let myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      let myNewLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      let actual = myLine.isEqualTo(myNewLine);
      assert.strictEqual(actual, true);
    });
    it('should give false if given object is a instance of line but have different values', function() {
      let myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      let myNewLine = new Line({ x: 2, y: 3 }, { x: 4, y: 4 });
      let actual = myLine.isEqualTo(myNewLine);
      assert.strictEqual(actual, false);
    });
    it('should give false if given object is not a instance of line', function() {
      let myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      let myNewLine = { x: 2, y: 3 };
      let actual = myLine.isEqualTo(myNewLine);
      assert.strictEqual(actual, false);
    });
  });
});
