import { IsEqual } from "type-fest";
import { Expand, ExpandDeep } from "./Expand";
import { NonComplexType } from "./NonComplexType";


/**
   Same as ReplacePropTypeStrictDeep, but only affects direct children properties. 
 */
export type ReplacePropTypeStrict<TType, TOldType, TNewType> = {
    [K in keyof TType]: IsEqual<TType[K], TOldType> extends true ? TNewType : TType[K]
}

/**
Deeply replaces all property types of one type with another.
Type match is done via exact equivalence, that is,
`ReplacePropTypeDeepStrict<MyType, Date, string>`
will replace type of all Date properties, with string,
but will not touch properties like `Date | string` or `Date | null`:
@example
```
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

You can chain multiple replacements together.
@example
```
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

type r1 = ReplacePropTypeDeepStrict<Subject, Date, 'replaced Date'>;
type r2 = ReplacePropTypeDeepStrict<r1, null | Date, 'replaced null | Date'>;
type r3 = ReplacePropTypeDeepStrict<r2, undefined | Date, 'replaced undefined | Date'>;
type MappedSubject = ExpandDeep<r3>;
```
 */
export type ReplacePropTypeDeepStrict<TType, TOldType, TNewType> = {
    [K in keyof TType]: 
        IsEqual<TType[K],TOldType> extends true 
            ? TNewType
            : TType[K] extends object 
                ? ReplacePropTypeDeepStrict<TType[K], TOldType, TNewType>
                : TType[K] extends (infer U)[] 
                    ? IsEqual<U, TOldType> extends true 
                        ? TNewType[]
                        : U extends object
                            ? ReplacePropTypeDeepStrict<U, TOldType, TNewType>[]
                            : U[]
                    : TType[K];
}

/**
   Same as ReplacePropTypeDeep, but only affects direct children properties. 
 */
export type ReplacePropType<TType, TOldType, TNewType> = {
    [K in keyof TType]: TOldType extends TType[K] ? TNewType : TType[K]
}

/**
Deeply replaces all property types of one type with another.
Type match is done via 'TypeToReplace extends TypeBeingChecked', that is,
`ReplacePropTypeDeep<MyType, Date, string>`
will replace type of all properties, 
into which you could assign Date, with string:
@example
```
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

You can chain multiple replacements together.

@example
```
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

type r1 = ReplacePropTypeDeep<Subject, Date, 'replaced Date'>;
type r2 = ReplacePropTypeDeep<r1, string, 'replaced string'>;
type r3 = ReplacePropTypeDeep<r2, number, 'replaced number'>;
type MappedSubject = ExpandDeep<r3>;
```
 */
export type ReplacePropTypeDeep<TType, TOldType, TNewType> = {
    [K in keyof TType]: 
        TOldType extends TType[K] 
            ? TNewType
            : TType[K] extends object 
                ? ReplacePropTypeDeep<TType[K], TOldType, TNewType>
                : TType[K] extends (infer U)[] 
                    ? TOldType extends U 
                        ? TNewType[]
                        : U extends object
                            ? ReplacePropTypeDeep<U, TOldType, TNewType>[]
                            : U[]
                    : TType[K];
}