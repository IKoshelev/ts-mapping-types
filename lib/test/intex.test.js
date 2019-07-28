"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var chai_1 = require("chai");
var controlMarker = 'controll-marker';
var getFreshSubject = function () { return ({
    a1: [{
            control: controlMarker
        }],
    control: controlMarker
}); };
var isNumber = function (i) { return typeof i === 'number'; };
describe('narrowPropType, narrowArrayElement', function () {
    it('can narrow type of array and narrow a whole type', function () {
        var subject = getFreshSubject();
        subject.a3 = [8];
        if (src_1.narrowPropType(subject, 'a3', src_1.narrowArrayElement(isNumber))) {
            //success
            var narrow = subject.a3[0];
            var narrowAssign = subject;
            chai_1.expect(narrow).to.equal(8);
            chai_1.expect(narrowAssign).to.equal(subject);
        }
        else {
            throw new Error('Should not get here.');
        }
    });
});
describe('narrowArrayElemProp', function () {
    it('can adapt simple type guard to narrow down type of property of array element', function () {
        var subject = getFreshSubject();
        subject.a1[0].b2 = 8;
        if (src_1.narrowArrayElemProp(subject.a1, 'b2', isNumber)) {
            // this line checks that compiler has narrowed type of a1 to number
            var narrow = subject.a1[0].b2;
            chai_1.expect(narrow).to.equal(8);
            // this lines check that compiler has not narrowed type of  to number
            var control1 = subject.control;
            chai_1.expect(control1).to.equal(controlMarker);
            var control2 = subject.a1[0].control;
            chai_1.expect(control2).to.equal(controlMarker);
        }
        else {
            throw new Error('Should not get here.');
        }
    });
    it('when not every element passes the test, returns false', function () {
        var subject = getFreshSubject();
        subject.a1[0].b2 = 'a';
        if (src_1.narrowArrayElemProp(subject.a1, 'b2', isNumber)) {
            throw new Error('Should not get here.');
        }
        else {
            var control = subject.control; // this line checks that compiler has not narrowed type of control to number
            chai_1.expect(control).to.equal(controlMarker);
        }
    });
});
describe('narrowArrayElemProp + narrowArrayElement', function () {
    it('can narrow down array element property that is itself array', function () {
        var subject = getFreshSubject();
        subject.a1[0].b1 = [8];
        if (src_1.narrowArrayElemProp(subject.a1, 'b1', src_1.narrowArrayElement(isNumber))) {
            // this line checks that compiler has narrowed type of a1 to number
            var narrow = subject.a1[0].b1[0];
            chai_1.expect(narrow).to.equal(8);
            // this lines check that compiler has not narrowed type of  to number
            var control1 = subject.control;
            chai_1.expect(control1).to.equal(controlMarker);
            var control2 = subject.a1[0].control;
            chai_1.expect(control2).to.equal(controlMarker);
        }
        else {
            throw new Error('Should not get here.');
        }
    });
    it('when not every inner element of every outer elemnt passes the test, returns false', function () {
        var subject = getFreshSubject();
        subject.a1[0].b1 = [8];
        if (src_1.narrowArrayElemProp(subject.a1, 'b1', src_1.narrowArrayElement(isNumber))) {
            chai_1.expect(true).to.equal(true);
        }
        else {
            // can't just throw here, because clever compiler 
            // deduces that execution can only continue on successfull type check
            // and extends narrowing to the rest of the method
            chai_1.expect(false).to.equal(true);
        }
        subject.a1[1] = {
            b1: ['a'],
            b2: '',
            control: controlMarker
        };
        if (src_1.narrowArrayElemProp(subject.a1, 'b1', src_1.narrowArrayElement(isNumber))) {
            throw new Error('Should not get here.');
        }
        else {
            var control = subject.control; // this line checks that compiler has not narrowed type of control to number
            chai_1.expect(control).to.equal(controlMarker);
        }
    });
});
describe('genericNarrow', function () {
    it('lets you map multiple properties at once', function () {
        var subject = getFreshSubject();
        if (src_1.genericNarrow(subject, function (i) { return true; })) {
            var n1 = subject.a1[0].b1;
            var n2 = subject.a1[0].b2;
            var n3 = subject.a2;
            // this test only tests compiler (you will get compilation errors if it fails)
            chai_1.expect(true).to.equal(true);
        }
    });
});
//# sourceMappingURL=intex.test.js.map