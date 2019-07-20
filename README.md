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

## Swap values of 2 keys, with compile time type check for compatibility

```typescript
import { swap } from 'ts-typing-util'
  const t = {
    a: 1,
    b: 2,
    c: '',
    c1: '',
    d: { a: 5 },
    e: { a: 6 },
    f: { b: 7 },
    g: { a: '' }
  }
 
 swap(t, 'a', 'b');
 swap(t, 'a', 'c'); //error
 swap(t, 'b', 'c'); //error
 swap(t, 'a', 'a'); //error
 swap(t, 'c', 'c1');
 swap(t, 'd','e');
 swap(t, 'd','f'); //error
 swap(t, 'd','g'); //error
```

...more to come