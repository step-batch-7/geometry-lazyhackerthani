const assert = require('chai').assert;
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
    let actual = myLine.length;
    assert.strictEqual(myLine.length, 2.1213203435596424);
  });
});

describe('slope property', function() {
  it('should set a property called slope', function() {
    const myLine = new Line({ x: 3, y: 5 }, { x: 4, y: 6 });
    assert.strictEqual(myLine.slope, 1);
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
