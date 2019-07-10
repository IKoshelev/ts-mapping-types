export declare type NarrowPropType<TTarget, TKey extends keyof TTarget, TNarrow extends TTarget[TKey]> = {
    [key in keyof TTarget]: key extends TKey ? TNarrow extends TTarget[key] ? TNarrow : TTarget[key] : TTarget[key];
};
export declare function narrowArrayElement<TWide, TNarrow extends TWide>(check: (i: TWide) => i is TNarrow): (i: TWide[]) => i is TNarrow[];
export declare function narrowArrayElemProp<TOuterArrElem, TKey extends keyof TOuterArrElem, TNarrowArr extends TOuterArrElem[TKey]>(arr: TOuterArrElem[], keyInElem: TKey, check: (i: TOuterArrElem[TKey]) => i is TNarrowArr): arr is NarrowPropType<TOuterArrElem, TKey, TNarrowArr>[];
