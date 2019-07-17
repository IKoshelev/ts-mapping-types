# ts-typing-util

Readme in progress.

This is an extension on Type Guards ( https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types ).

Normally, type-guards work just fine with properties of your type:

```typescript
type Subject = {
    a1: string | number | undefined,
    /// more props
}

const isNumber = (i: string | number | undefined): i is number => typeof i === 'number';

let subject: Subject; // class instance that we got somwhere

// error, type is to wide to be assigned into variable of type number
const w: number = subject.a1; 
if (isNumber(subject.a1)) {
    // success, we only get inside if 'a1' passed the type guard 'isNumber', and compile is content
    const narrow: number = subject.a1; 
}

// you could even go deeper
if(isNumber(differentSubject.a1.b1)){
    //....
}
```

And you can even easily narrow-down types of array elements

```typescript
type Subject = {
    a1: string | number | undefined,
    /// more props
}

export function narrowArrayElement<TWide, TNarrow extends TWide>(check:(i: TWide) => i is TNarrow ){
    return (i: TWide[]) : i is TNarrow[] => i.every(check); 
}

const isNumber = (i: string | number | undefined): i is number => typeof i === 'number';

let subject: Subject; // class instance that we got somwhere

const w: number[] = subject.a1; // error, type is to wide to be assigned into variable of type number[]; 
if (narrowArrayElement(isNumber)(subject.a1)) {
    // success, we only get inside if every element in 'a1' 
    // passed the type guard 'isNumber', and compiler is content
    const narrow: number[] = subject.a1; 
}

```

Problems, however, arise if you need to narrow down specific property types in an array element.

```typescript
type Subject = {
    a1: {
        b2: number | string,   
    }[],
}

let subject: Subject; // class instance that we got somwhere

// this does not work...
if (isNumber(subject.a1[0].b2)) {
    //...because guarding on a single element of array
    // does not guard us against the rest if them.
    const narrow: number = subject.a1[1].b2;
}
```

This library provides a simple method to solve above problem

```typescript
import { narrowPropTypeGuard } from 'ts-narrow-prop-types-of-array-elements';

type Subject = {
    a1: {
        b2: number | string,   
    }[],
}

let subject: Subject; // class instance that we got somwhere

if (narrowArrayElemProp(subject.a1, 'b2', isNumber)) {
    // success!
    const narrow: number = subject.a1[1].b2;
}
```

You can also narrow types of prop of an array element that are themselves arrays.

```typescript
import { narrowPropTypeGuard } from 'ts-narrow-prop-types-of-array-elements';

type Subject = {
    a1: {
        b1: (number | string)[],
    }[],
}

let subject: Subject; // class instance that we got somwhere

if (narrowArrayElemProp(subject.a1, 'b1', narrowArrayElement(isNumber))) {
    // success!
    const narrow: number = subject.a1[0].b1[0];
}
```

Scenario with more real-life types:

```typescript
//Imagine we get data from JSON api, for which have types
type VehiclesOrder = {
    items: {
        engineSystem: DieselEngineSystem | GasEngineSystem | ElectricEngineSystem,
        options: ( GpsOption | FridgeOption | StereoOption )[]
    }[]
}

//And use different type guards on it.

//Check property presence for electric engine
const isElectricEngine = (i: EngineSystem) i is ElectricEngineSystem => 'chargerVoltage' in i;

//Use tagged union for options 
//https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
const isFridgeOption = (i: VehicleOption) i is FridgeOption => i.kind === 'FridgeOption';

//Since these days we 99% of time deal with electric vehicles and only fridges are still optional, 
//we want to narrow the type we get from the API, but pass any rare exceptions for manual processing 
const order: VehiclesOrder;

if(narrowArrayElemProp(order.items, 'engineSystem', isElectricEngine)
    && narrowArrayElemProp(order.items, 'options', narrowArrayElement(isFridgeOption)){

    const guardedOreder: {
        items: {
            engineSystem: ElectricEngineSystem,
            options: FridgeOption[]
        }[]
    } = order; //narrowed succesfully
} else {
    sendToManualProcessing(order);
}
```

Available via NPM:

`npm install ts-narrow-prop-types-of-array-elements`









