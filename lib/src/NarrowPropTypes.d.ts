import { PartialDeep } from "./MappedDeepTypes";
import { ElementType } from "./ElementType";
import { NonComplexType } from "./NonComplexType";
export declare type NarrowPropTypeByKey<TTarget, TKey extends keyof TTarget, TNarrow extends TTarget[TKey]> = {
    [key in keyof TTarget]: key extends TKey ? TNarrow extends TTarget[key] ? TNarrow : TTarget[key] : TTarget[key];
};
export declare function narrowArrayElement<TWide, TNarrow extends TWide>(check: (i: TWide) => i is TNarrow): (i: TWide[]) => i is TNarrow[];
export declare function narrowPropType<T, TKey extends keyof T, TNarrowedPropType extends T[TKey]>(inst: T, key: TKey, guard: (wide: T[TKey]) => wide is TNarrowedPropType): inst is NarrowPropTypeByKey<T, TKey, TNarrowedPropType>;
export declare function narrowArrayElemProp<TOuterArrElem, TKey extends keyof TOuterArrElem, TNarrowArr extends TOuterArrElem[TKey]>(arr: TOuterArrElem[], keyInElem: TKey, check: (i: TOuterArrElem[TKey]) => i is TNarrowArr): arr is NarrowPropTypeByKey<TOuterArrElem, TKey, TNarrowArr>[];
export declare type SetType<T> = {
    __36d95b8851d0__to: T;
};
export declare type OverridePropTypes<TOriginal, TOverrides> = {
    [key in keyof TOriginal]: key extends keyof TOverrides ? TOverrides[key] extends SetType<infer TNewType> ? TNewType : TOverrides[key] extends NonComplexType ? TOverrides[key] : TOverrides[key] extends readonly NonComplexType[] ? TOverrides[key] : TOverrides[key] extends object[] ? OverridePropTypes<ElementType<TOriginal[key]>, ElementType<TOverrides[key]>>[] : TOverrides[key] extends readonly object[] ? readonly OverridePropTypes<ElementType<TOriginal[key]>, ElementType<TOverrides[key]>>[] : OverridePropTypes<TOriginal[key], TOverrides[key]> : TOriginal[key];
};
export declare type NarrowPropTypes<TOriginal, TOverrides extends PartialDeep<TOriginal>> = OverridePropTypes<TOriginal, TOverrides>;
export declare function genericNarrow<TOriginal, TOverrides extends PartialDeep<TOriginal>>(inst: TOriginal, check: (i: TOriginal) => boolean): inst is TOriginal & NarrowPropTypes<TOriginal, TOverrides>;
