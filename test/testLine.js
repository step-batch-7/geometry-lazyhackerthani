`use strict`;
const assert = require('chai').assert;
const Line = require('../src/line.js');

describe('Line', function() {
  describe('toString in Line class', function() {
    it('should give features of a line', function() {
      const myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const actual = myLine.toString();
      const expected = `[Line (2,3) to (3,4)]`;
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe('isEqualTo in Line class', function() {
    it('should give true if given object is a instance of line have same properties', function() {
      const myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const myNewLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const actual = myLine.isEqualTo(myNewLine);
      assert.isTrue(actual);
    });
    it('should give false if given object is a instance of line but have different values', function() {
      const myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const myNewLine = new Line({ x: 2, y: 3 }, { x: 4, y: 4 });
      const actual = myLine.isEqualTo(myNewLine);
      assert.isFalse(actual);
    });
    it('should give false if given object is not a instance of line', function() {
      const myLine = new Line({ x: 2, y: 3 }, { x: 3, y: 4 });
      const myNewLine = { x: 2, y: 3 };
      const actual = myLine.isEqualTo(myNewLine);
      assert.isFalse(actual);
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
  it('should give length of the line when both the points are not same and have floating value', function() {
    let myLine = new Line({ x: 2, y: 3 }, { x: 3.5, y: 3 });
    assert.strictEqual(myLine.length, 1.5);

    myLine = new Line({ x: 2, y: 3 }, { x: 3.5, y: 4.5 });
    assert.approximately(myLine.length, 2.1213, 0.0001);
  });
});

describe('slope property', function() {
  it('should have slope for a line neither parallel to x nor to y axis', function() {
    const myLine = new Line({ x: 3, y: 5 }, { x: 4, y: 6 });
    assert.strictEqual(myLine.slope, 1);
  });
  it('should have slope as -infinity if line is parallel to x axis ', function() {
    const myLine = new Line({ x: 1, y: 2 }, { x: 3, y: 2 });
    assert.strictEqual(myLine.slope, -Infinity);
  });
  it('should have slope as 0 if line is parallel to y axis ', function() {
    const myLine = new Line({ x: 1, y: 2 }, { x: 1, y: 3 });
    assert.strictEqual(myLine.slope, 0);
  });
});

describe('isParallelTo', function() {
  it('should say true if given line are parallel', function() {
    const line1 = new Line({ x: 3, y: 5 }, { x: 4, y: 6 });
    const line2 = new Line({ x: 4, y: 6 }, { x: 6, y: 8 });
    assert.isTrue(line1.isParallelTo(line2));
  });
  it('should say false if given line are not parallel', function() {
    const line1 = new Line({ x: 3, y: 5 }, { x: 4, y: 6 });
    const line2 = new Line({ x: 4, y: 6 }, { x: 6, y: 5 });
    assert.isFalse(line1.isParallelTo(line2));
  });
  it('should say false if given object is not a line', function() {
    const line1 = new Line({ x: 3, y: 5 }, { x: 4, y: 6 });
    const line2 = { endA: { x: 4, y: 6 }, endB: { x: 6, y: 5 }, slope: 1 };
    assert.isFalse(line1.isParallelTo(line2));
  });
});
