import { PartialDeep } from "./MappedDeepTypes";
import { ElementType } from "./ElementType";
import { NonComplexType } from "./NonComplexType";

export type NarrowPropTypeByKey<TTarget,
    TKey extends keyof TTarget,
    TNarrow extends TTarget[TKey]> = {
        [key in keyof TTarget]:
        key extends TKey
        /**/ ? TNarrow extends TTarget[key]
        /*  */ ? TNarrow
        /*  */ : TTarget[key]
        /**/ : TTarget[key]
    };

export function narrowArrayElement<TWide, TNarrow extends TWide>(check:(i: TWide) => i is TNarrow ){
    return (i: TWide[]) : i is TNarrow[] => i.every(check); 
}

// type guards, when used on object properties, don't narrow down the type of the whole object
// https://github.com/microsoft/TypeScript/issues/32595
// https://github.com/microsoft/TypeScript/issues/31755#issuecomment-498669080
// so, this special guard is needed
export function narrowPropType<
    T, 
    TKey extends keyof T, 
    TNarrowedPropType extends T[TKey]>
        (inst: T, key: TKey, guard: (wide:  T[TKey]) => wide is TNarrowedPropType): inst is NarrowPropTypeByKey<T, TKey, TNarrowedPropType> {
    
            const val = inst[key];

    if(guard(val)) {
        return true;
    }

    return false;
}

export function narrowArrayElemProp<
    TOuterArrElem,
    TKey extends  keyof TOuterArrElem,
    TNarrowArr extends TOuterArrElem[TKey]>(
        arr: TOuterArrElem[], 
        keyInElem: TKey, 
        check:(i: TOuterArrElem[TKey]) => i is TNarrowArr ): arr is NarrowPropTypeByKey<TOuterArrElem,TKey,TNarrowArr>[] {

    return arr.every(e => check(e[keyInElem]));
}

// force-override any property types

export type SetType<T> = {
    __36d95b8851d0__to: T 
};

export type OverridePropTypes<TOriginal, TOverrides> = {
    [key in keyof TOriginal]: 
        key extends keyof TOverrides // override for key found
        ?
            //unconditional override
            TOverrides[key] extends SetType<infer TNewType> ? TNewType :

            //types not expected to have their own properties
            TOverrides[key] extends NonComplexType ?  TOverrides[key] :       
            TOverrides[key] extends readonly NonComplexType[] ? TOverrides[key]:

            //apply array element from override to array element of otiginal (recursive )
            //todo tuples will cause problems?
            TOverrides[key] extends object[] ? OverridePropTypes<ElementType<TOriginal[key]>, ElementType<TOverrides[key]>>[] :
            TOverrides[key] extends readonly object[] ? readonly OverridePropTypes<ElementType<TOriginal[key]>, ElementType<TOverrides[key]>>[] :     
            
            //overrides has complex type for this key - apply recursively
            OverridePropTypes<TOriginal[key], TOverrides[key]>

        //key not found in overrides
        :TOriginal[key];   
}

export type NarrowPropTypes<TOriginal, TOverrides extends PartialDeep<TOriginal>> 
                                            = OverridePropTypes<TOriginal, TOverrides>;

export function genericNarrow<TOriginal, TOverrides extends PartialDeep<TOriginal>>
    (inst: TOriginal, 
    check: (i:TOriginal) => boolean): inst is TOriginal & NarrowPropTypes<TOriginal, TOverrides> {

    return check(inst);
}