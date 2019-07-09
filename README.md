# ts-narrow-prop-type-guard

Turns out type guards work on individual properties too....


This is an extension on Type Guards ( https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types ),
that lets you guard against specific properties on a type and thus narrow them down individually. 

```typescript
import { narrowPropTypeGuard } from 'ts-narrow-prop-type-guard';

type Subject = {
    a1: string | number | undefined,
    /// more props
}

const isNumber = (i: string | number | undefined): i is number => typeof i === 'number';

let subject: Subject; // class instance that we got somwhere

const w: number = subject.a1; // error, type is to wide to be assigned into variable of type number; 
if (narrowPropTypeGuard(subject, 'a1', isNumber)) {
    const narrow: number = subject.a1; // success, we only get inside if 'a1' passed the type guard 'isNumber', and compile is content
}
```

Scenario with custom types:

```typescript
type Owner = {
    name: string;
    pet: Animal;
}

//We use tagged type https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
const isCat = (i: Animal) i is Cat => i.kind === 'Cat';

if(narrowPropTypeGuard(owner, 'pet', isCat)){
    let cat: Cat = onwer.pet;
}
```

You may be asking, how is this usefull, if we could just guard agains 



Available via NPM:

`npm install  ts-narrow-prop-type-guard`


