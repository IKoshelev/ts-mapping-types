import * as mocha from 'mocha';
import { narrowArrayElemProp, narrowArrayElement } from "../src/index";
import { expect } from "chai";

type Subject = {
    a1: {
        b1: (number | string)[],
        b2: number | string,
        control: string     
    }[],
    control: string
}

const controlMarker = 'controll-marker';

const getFreshSubject = () => ({
    a1: [{
        control: controlMarker
    }],
    control: controlMarker
} as Subject)

const isNumber = (i: string | number | undefined): i is number => typeof i === 'number';

describe('narrowArrayElemProp', () => {

    it('can adapt simple type guard to narrow down type of property of array element', () => {
        const subject = getFreshSubject();

        subject.a1[0].b2 = (8 as  string | number);
        if (narrowArrayElemProp(subject.a1, 'b2', isNumber)) {

             // this line checks that compiler has narrowed type of a1 to number
            const narrow: number = subject.a1[0].b2;
            expect(narrow).to.equal(8);

            // this lines check that compiler has not narrowed type of  to number
            const control1: string = subject.control;   
            expect(control1).to.equal(controlMarker);

            const control2: string = subject.a1[0].control;   
            expect(control2).to.equal(controlMarker);
        } else {
            throw new Error('Should not get here.');
        }
    });

    it('when not every element passes the test, returns false', () => {

        const subject = getFreshSubject();
        subject.a1[0].b2 = ('a' as  string | number);

        if (narrowArrayElemProp(subject.a1, 'b2', isNumber)) {
            throw new Error('Should not get here.');
        } else {
            const control: string = subject.control;   // this line checks that compiler has not narrowed type of control to number
            expect(control).to.equal(controlMarker);
        }
    });
});

describe('narrowArrayElemProp + narrowArrayElement', () => {

    it('can narrow down array element property that is itself array', () => {
        const subject = getFreshSubject();

        subject.a1[0].b1 = [(8 as  string | number)];
        if (narrowArrayElemProp(subject.a1, 'b1', narrowArrayElement(isNumber))) {

             // this line checks that compiler has narrowed type of a1 to number
            const narrow: number = subject.a1[0].b1[0];
            expect(narrow).to.equal(8);

            // this lines check that compiler has not narrowed type of  to number
            const control1: string = subject.control;   
            expect(control1).to.equal(controlMarker);

            const control2: string = subject.a1[0].control;   
            expect(control2).to.equal(controlMarker);
        } else {
            throw new Error('Should not get here.');
        }
    });

    it('when not every inner element of every outer elemnt passes the test, returns false', () => {

        const subject = getFreshSubject();
        subject.a1[0].b1 = [(8 as  string | number)];

        if (narrowArrayElemProp(subject.a1, 'b1', narrowArrayElement(isNumber))) {
            expect(true).to.equal(true);
       } else {
           // can't just throw here, because clever compiler 
           // deduces that execution can only continue on successfull type check
           // and extends narrowing to the rest of the method
            expect(false).to.equal(true);
       }

        subject.a1[1] = {
            b1: [('a' as  string | number)],
            b2: '',
            control: controlMarker
        };

        if (narrowArrayElemProp(subject.a1, 'b1', narrowArrayElement(isNumber))) {
            throw new Error('Should not get here.');
        } else {
            const control: string = subject.control;   // this line checks that compiler has not narrowed type of control to number
            expect(control).to.equal(controlMarker);
        }
    });
});