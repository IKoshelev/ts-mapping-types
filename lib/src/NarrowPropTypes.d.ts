import { PartialDeep } from "./MappedDeepTypes";
import { ElementType } from "./ElementType";
export declare type NarrowPropTypeByKey<TTarget, TKey extends keyof TTarget, TNarrow extends TTarget[TKey]> = {
    [key in keyof TTarget]: key extends TKey ? TNarrow extends TTarget[key] ? TNarrow : TTarget[key] : TTarget[key];
};
export declare function narrowArrayElement<TWide, TNarrow extends TWide>(check: (i: TWide) => i is TNarrow): (i: TWide[]) => i is TNarrow[];
export declare function narrowArrayElemProp<TOuterArrElem, TKey extends keyof TOuterArrElem, TNarrowArr extends TOuterArrElem[TKey]>(arr: TOuterArrElem[], keyInElem: TKey, check: (i: TOuterArrElem[TKey]) => i is TNarrowArr): arr is NarrowPropTypeByKey<TOuterArrElem, TKey, TNarrowArr>[];
export declare type SetType<T> = {
    __36d95b8851d0__to: T;
};
export declare type OverridePropTypes<TOriginal, TOverrides> = {
    [key in keyof TOriginal]: key extends keyof TOverrides ? TOverrides[key] extends SetType<infer TNewType> ? TNewType : TOverrides[key] extends readonly object[] ? readonly OverridePropTypes<ElementType<TOriginal[key]>, ElementType<TOverrides[key]>>[] : TOverrides[key] extends object[] ? OverridePropTypes<ElementType<TOriginal[key]>, ElementType<TOverrides[key]>>[] : TOverrides[key] extends readonly unknown[] ? TOverrides[key] : TOverrides[key] extends object ? OverridePropTypes<TOriginal[key], TOverrides[key]> : TOverrides[key] : TOriginal[key];
};
export declare type NarrowPropTypes<TOriginal, TOverrides extends PartialDeep<TOriginal>> = OverridePropTypes<TOriginal, TOverrides>;
export declare function genericNarrow<TOriginal, TOverrides extends PartialDeep<TOriginal>>(inst: TOriginal, check: (i: TOriginal) => boolean): inst is TOriginal & NarrowPropTypes<TOriginal, TOverrides>;
