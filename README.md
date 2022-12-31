# ts-mapping-types

Typescript types and utility functions utilizing more advanced aspects of the typing system. 

Available via NPM:

`npm install ts-mapping-types`

*This package deals with several advanced scenarios. If you are looking for more general utility types - checkout [type-fest](https://github.com/sindresorhus/type-fest)*

## Surgically changing specific properties in a given type via Patch

```typescript
import { ExpandDeep, Patch, Prop, RemoveProp } from 'ts-mapping-util';

type Person = {
    name: string,
    surname: string,
    pet: {
        names: string[],
        age: number,
        species: string,
        toys: {
            model: string,
            age: number
        }[]
    }[],
    employment: {
        companyName: string,
        position: string
    },
}

type Replaced = 'Replaced';
type Added = 'Added';

type PatchedPerson = ExpandDeep<Patch<Person, {
    name: Prop<Replaced>,
    pet: {
        names: Prop<Replaced[]>,
        favoriteSnack: Prop<Added>,
        toys: {
            model: RemoveProp,
            age: Prop<Replaced>,
            color: Prop<Added>
        }[]
    }[],
    employment: RemoveProp,
    favoriteNumber: Prop<Added>
}>>;

// type PatchedPerson = {
//     name: "Replaced";
//     surname: string;
//     pet: {
//         names: "Replaced"[];
//         age: number;
//         species: string;
//         toys: {
//             age: "Replaced";
//             color: "Added";
//         }[];
//         favoriteSnack: "Added";
//     }[];
//     favoriteNumber: "Added";
// }
```

## Mass-replacing all instances of type A with type B in a given type

### With strict match via ReplacePropTypeDeepStrict
```typescript
import { ExpandDeep, ReplacePropTypeDeepStrict } from 'ts-mapping-util';

type Subject = {
    prop1: string, 
    prop2: Date,
    prop3: string | Date,
    prop4: null | string | Date,
    prop5: null | Date,
    prop6?: undefined | Date,
    prop7:  Date[],
    prop8: {
        prop1: Date
    },
    prop9: {
        prop1: Date
    }[]
}

type MappedSubject = ExpandDeep<ReplacePropTypeDeepStrict<Subject, 
        Date, 'replaced Date'>>;

// type MappedSubject = {
//     prop1: string;
//     prop2: "replaced Date";
//     prop3: string | Date;
//     prop4: null | string | Date;
//     prop5: null | Date;
//     prop6?: undefined | Date;
//     prop7: "replaced Date"[];
//     prop8: {
//         prop1: "replaced Date";
//     };
//     prop9: {
//         prop1: "replaced Date";
//     }[];
// }
```

### With loose match via ReplacePropTypeDeep

```typescript
import { ExpandDeep, ReplacePropTypeDeep } from 'ts-mapping-util';

type Subject = {
    prop1: string, 
    prop2: Date,
    prop3: string | Date,
    prop4: null | string | Date,
    prop5: string | Date,
    prop6?: string | Date,
    prop7:  (string | Date)[],
    prop8: {
        prop1:  string | Date
    },
    prop9: {
        prop1: string | Date
    }[]
}

type MappedSubject = ExpandDeep<ReplacePropTypeDeep<Subject, 
        Date, 'replaced Date'>>;

// type MappedSubject = {
//     prop1: string;
//     prop2: "replaced Date";
//     prop3: "replaced Date";
//     prop4: "replaced Date";
//     prop5: "replaced Date";
//     prop6?: "replaced Date" | undefined;
//     prop7: "replaced Date"[];
//     prop8: {
//         prop1: "replaced Date";
//     };
//     prop9: {
//         prop1: "replaced Date";
//     }[];
// }
```

## Guarding types of individual properties of array elements

Typeguard, that lets you guard on individual properties of array elements

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

import { narrowArrayElemProp } from 'ts-mapping-util';

if (narrowArrayElemProp(subject.a1, 'b2', isNumber)) {
    // success!
    const narrow: number = subject.a1[1].b2;
}

```