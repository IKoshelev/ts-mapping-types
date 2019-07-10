export type NarrowPropType<TTarget,
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
        check:(i: TOuterArrElem[TKey]) => i is TNarrowArr ): arr is NarrowPropType<TOuterArrElem,TKey,TNarrowArr>[] {

    return arr.every(e => check(e[keyInElem]));
}







// export function narrowPropTypeGuard<
//     TTarget,
//     TKey extends keyof TTarget,
//     TWide extends TTarget[TKey],
//     TNarrow extends TWide>(
//         target: TTarget,
//         key: TKey,
//         check: (inst: TWide) => inst is TNarrow
//     ): target is  TTarget & NarrowPropType<TTarget, TKey, TNarrow> {

//     const inst = target[key] as TWide;
//     const isExpectedType = check(inst);
//     return isExpectedType;
// }

// export type NarrowPropPropType<TTarget,
//     TKey1 extends keyof TTarget,
//     TKey2 extends keyof TTarget[TKey1],
//     TNarrow extends TTarget[TKey1][TKey2]> = {
//         [outerKey in keyof TTarget]:
//         outerKey extends TKey1
//     /**/ ? TTarget[TKey1] extends TTarget[outerKey]
//     /*  */ ? {
//     /*   |  */[innerKey in keyof TTarget[outerKey]]:
//     /*   |  */ innerKey extends TKey2
//     /*   |   |  */ ? TNarrow extends TTarget[outerKey][innerKey]
//     /*   |   |   |  */ ? TNarrow
//     /*   |   |   |  */ : TTarget[outerKey][innerKey]
//     /*   |   |  */ : TTarget[outerKey][innerKey]
//     /*   |  */
//     /*  */ }
//     /*  */ : TTarget[outerKey]
//     /**/ : TTarget[outerKey]
//     };

// export function narrowPropPropTypeGuard<
//     TTarget,
//     TKey1 extends keyof TTarget,
//     TKey2 extends keyof TTarget[TKey1],
//     TNarrow extends TTarget[TKey1][TKey2]>(
//         target: TTarget,
//         key1: TKey1,
//         key2: TKey2,
//         check: (inst: TTarget[TKey1][TKey2]) => inst is TNarrow
//     ): target is TTarget & NarrowPropPropType<TTarget, TKey1, TKey2, TNarrow> {

//         const outer: TTarget[TKey1] = target[key1];
//         if(!outer){
//             return false;
//         }
//         const inner: TTarget[TKey1][TKey2] = outer[key2];
//         const isExpectedType = check(inner);
//         return isExpectedType;
// }