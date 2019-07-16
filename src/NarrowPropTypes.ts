import { PartialDeep } from "./MappedDeepTypes";
import { ElementType } from "./ElementType";

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
            //overides has array for this key - apply array element from override to array element of otiginal
            //todo tuples may cause problems?
            TOverrides[key] extends readonly object[] ? readonly OverridePropTypes<ElementType<TOriginal[key]>, ElementType<TOverrides[key]>>[] :
            TOverrides[key] extends object[] ? OverridePropTypes<ElementType<TOriginal[key]>, ElementType<TOverrides[key]>>[] :
            //overides has array of primitives for type (since object[] was captured by previous type)         
            TOverrides[key] extends readonly unknown[] ? TOverrides[key]:
            //overrides has object for this array - apply recursively
            TOverrides[key] extends object ? OverridePropTypes<TOriginal[key], TOverrides[key]> :
            //override is primitive - use it
            TOverrides[key]
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