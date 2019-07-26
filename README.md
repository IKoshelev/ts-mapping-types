# ts-typing-util

Typescript types and utility functions utilizing more advanced aspects of the typing system. 

Available via NPM:

`npm install ts-typing-util`

## Guarding types of individual properties of array elements

Typeguard, that lets you guard on individual properties of array elements

https://github.com/IKoshelev/ts-typing-util/wiki/Guarding-types-of-individual-properties-of-array-elements 

```typescript 
type Subject = {
    a1: {
        b2: number | string,   
    }[],
}

let subject: Subject; // class instance that we got somewhere

// this does not work...
if (isNumber(subject.a1[0].b2)) {
    //...because guarding on a single element of array
    // does not guard us against the rest if them.
    const narrow: number = subject.a1[1].b2;
}

import { narrowArrayElemProp } from 'ts-typing-util';

if (narrowArrayElemProp(subject.a1, 'b2', isNumber)) {
    // success!
    const narrow: number = subject.a1[1].b2;
}

```

...more to come