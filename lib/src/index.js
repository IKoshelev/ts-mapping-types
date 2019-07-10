"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function narrowArrayElement(check) {
    return function (i) { return i.every(check); };
}
exports.narrowArrayElement = narrowArrayElement;
function narrowArrayElemProp(arr, keyInElem, check) {
    return arr.every(function (e) { return check(e[keyInElem]); });
}
exports.narrowArrayElemProp = narrowArrayElemProp;
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
//# sourceMappingURL=index.js.map