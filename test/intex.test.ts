import * as mocha from 'mocha';
import { narrowPropTypeGuard, narrowPropPropTypeGuard } from "../src/index";
import { expect } from "chai";

type Subject = {
    a1: string | number | undefined,
    a2: {
        b1: string | number | undefined,
        control: string
    },
    control: string,
}

const controlMarker = 'controll-marker';

const getFreshSubject = () => ({
    a2: {
        control: controlMarker
    }, 
    control: controlMarker
} as Subject)

const isNumber = (i: string | number | undefined): i is number => typeof i === 'number';

describe('narrowPropTypeGuard ', () => {

    it('when prop passes type guard, returns true and narrows it down', () => {
        const subject = getFreshSubject();

        subject.a1 = (8 as  string | number | undefined);
        if (narrowPropTypeGuard(subject, 'a1', isNumber)) {
            const narrow: number = subject.a1;          // this line checks that compiler has narrowed type of a1 to number
            const control: string = subject.control;   // this line checks that compiler has not narrowed type of  to number
            expect(narrow).to.equal(8);
            expect(control).to.equal(controlMarker);
        } else {
            throw new Error('Should not get here.');
        }
    });

    it('when prop does not pass type guard, returns false', () => {
        const subject = getFreshSubject();
        subject.a1 = ('str' as  string | number | undefined);
        if (narrowPropTypeGuard(subject, 'a1', isNumber)) {
            throw new Error('Should not get here.');
        } else {
            const control: string = subject.control;   // this line checks that compiler has not narrowed type of control to number
            expect(subject.a1).to.equal('str');
            expect(control).to.equal(controlMarker);
        }
    });
});

describe('narrowPropPropTypeGuard ', () => {

    it('when prop passes type guard, returns true and narrows it down', () => {
        const subject = getFreshSubject();
        subject.a2.b1 = (8 as  string | number | undefined);
        if (narrowPropPropTypeGuard(subject, 'a2','b1', isNumber)) {
            const narrow: number = subject.a2.b1;       // this line checks that compiler has narrowed type of a1 to number
            const control1: string = subject.a2.control;   // this line checks that compiler has not narrowed type of control to number
            const control2: string = subject.control;
            expect(narrow).to.equal(8);
            expect(control1).to.equal(controlMarker);
            expect(control2).to.equal(controlMarker);
        } else {
            throw new Error('Should not get here.');
        }
    });

    it('when prop does not pass type guard, returns false', () => {
        const subject = getFreshSubject();
        subject.a2.b1 = ('str' as  string | number | undefined);
        if (narrowPropPropTypeGuard(subject, 'a2','b1', isNumber)) {
            throw new Error('Should not get here.');
        } else {
            const control1: string = subject.a2.control;   // this line checks that compiler has not narrowed type of control to number
            const control2: string = subject.control;
            expect(subject.a2.b1).to.equal('str');
            expect(control1).to.equal(controlMarker);
            expect(control2).to.equal(controlMarker);
        }
    });
});