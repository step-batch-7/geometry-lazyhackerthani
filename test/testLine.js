const assert = require('assert');
const Line = require('../src/line.js');

describe('Line', function() {
  describe('toString in Line class', function() {
    it('should give features of a line', function() {
      const myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const actual = myLine.toString();
      const expected = `line (${2},${3}), (${3},${4})`;
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('isEqualTo in Line class', function() {
    it('should give true if given object is a instance of line have same properties', function() {
      const myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const myNewLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const actual = myLine.isEqualTo(myNewLine);
      assert.strictEqual(actual, true);
    });
    it('should give false if given object is a instance of line but have different values', function() {
      const myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const myNewLine = new Line({ x: 2, y: 3 }, { x: 4, y: 4 });
      const actual = myLine.isEqualTo(myNewLine);
      assert.strictEqual(actual, false);
    });
    it('should give false if given object is not a instance of line', function() {
      const myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const myNewLine = { x: 2, y: 3 };
      const actual = myLine.isEqualTo(myNewLine);
      assert.strictEqual(actual, false);
    });
  });

  describe('length', function() {
    it('should give length of the line when both the points are not same and have integer value', function() {
      const myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 3 });
      assert.strictEqual(myLine.length, 1);
    });
    it('should give length as 0 when the line is actually a point', function() {
      const myLine = new Line({ x: 3, y: 3 }, { x: 3, y: 3 });
      assert.strictEqual(myLine.length, 0);
    });
  });
  it('should give length of the line when both the points are not same and have fractional value', function() {
    let myLine = new Line({ x: 2, y: 3 }, { x: 3.5, y: 3 });
    assert.strictEqual(myLine.length, 1.5);
    myLine = new Line({ x: 2, y: 3 }, { x: 3.5, y: 4.5 });
    assert.strictEqual(myLine.length, 2.1213203435596424);
  });
});
