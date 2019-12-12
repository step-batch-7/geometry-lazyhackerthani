const assert = require('chai').assert;
const Line = require('../src/smallLine.js');

describe("toString in Line class", function () {
    it("should give features of a line", function () {
        let myLine = new Line(2, 3, 3, 4);
        let actual = myLine.toString();
        let expected = `points(${2},${3}),(${3},${4})`;
        assert.deepStrictEqual(actual, expected);
    });
});

describe("isEqualTo in Line class", function () {
    it("should give true if given object is a instance of line", function () {
        let myLine = new Line(2, 3, 3, 4);
        let myNewLine = new Line(2, 3, 3, 4);
        let actual = myLine.isEqualTo(myNewLine);
        assert.isTrue(actual);
    });
    it("should give false if given object is not a instance of line", function () {
        let myLine = new Line(2, 3, 3, 4);
        let myNewLine = new Line(2, 3, 4, 4);
        let actual = myLine.isEqualTo(myNewLine);
        assert.isFalse(actual);
    });
});