"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
var chai_1 = require("chai");
var controlMarker = 'controll-marker';
var getFreshSubject = function () { return ({
    a2: {
        control: controlMarker
    },
    control: controlMarker
}); };
var isNumber = function (i) { return typeof i === 'number'; };
describe('narrowPropTypeGuard ', function () {
    it('when prop passes type guard, returns true and narrows it down', function () {
        var subject = getFreshSubject();
        subject.a1 = 8;
        if (index_1.narrowPropTypeGuard(subject, 'a1', isNumber)) {
            var narrow = subject.a1; // this line checks that compiler has narrowed type of a1 to number
            var control = subject.control; // this line checks that compiler has not narrowed type of  to number
            chai_1.expect(narrow).to.equal(8);
            chai_1.expect(control).to.equal(controlMarker);
        }
        else {
            throw new Error('Should not get here.');
        }
    });
    it('when prop does not pass type guard, returns false', function () {
        var subject = getFreshSubject();
        subject.a1 = 'str';
        if (index_1.narrowPropTypeGuard(subject, 'a1', isNumber)) {
            throw new Error('Should not get here.');
        }
        else {
            var control = subject.control; // this line checks that compiler has not narrowed type of control to number
            chai_1.expect(subject.a1).to.equal('str');
            chai_1.expect(control).to.equal(controlMarker);
        }
    });
});
describe('narrowPropPropTypeGuard ', function () {
    it('when prop passes type guard, returns true and narrows it down', function () {
        var subject = getFreshSubject();
        subject.a2.b1 = 8;
        if (index_1.narrowPropPropTypeGuard(subject, 'a2', 'b1', isNumber)) {
            var narrow = subject.a2.b1; // this line checks that compiler has narrowed type of a1 to number
            var control1 = subject.a2.control; // this line checks that compiler has not narrowed type of control to number
            var control2 = subject.control;
            chai_1.expect(narrow).to.equal(8);
            chai_1.expect(control1).to.equal(controlMarker);
            chai_1.expect(control2).to.equal(controlMarker);
        }
        else {
            throw new Error('Should not get here.');
        }
    });
    it('when prop does not pass type guard, returns false', function () {
        var subject = getFreshSubject();
        subject.a2.b1 = 'str';
        if (index_1.narrowPropPropTypeGuard(subject, 'a2', 'b1', isNumber)) {
            throw new Error('Should not get here.');
        }
        else {
            var control1 = subject.a2.control; // this line checks that compiler has not narrowed type of control to number
            var control2 = subject.control;
            chai_1.expect(subject.a2.b1).to.equal('str');
            chai_1.expect(control1).to.equal(controlMarker);
            chai_1.expect(control2).to.equal(controlMarker);
        }
    });
});
//# sourceMappingURL=intex.test.js.map