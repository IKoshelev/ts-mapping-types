"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function narrowArrayElement(check) {
    return function (i) { return i.every(check); };
}
exports.narrowArrayElement = narrowArrayElement;
// type guards, when used on object properties, don't narrow down the type of the whole object
// https://github.com/microsoft/TypeScript/issues/32595
// https://github.com/microsoft/TypeScript/issues/31755#issuecomment-498669080
// so, this special guard is needed
function narrowPropType(inst, key, guard) {
    var val = inst[key];
    if (guard(val)) {
        return true;
    }
    return false;
}
exports.narrowPropType = narrowPropType;
function narrowArrayElemProp(arr, keyInElem, check) {
    return arr.every(function (e) { return check(e[keyInElem]); });
}
exports.narrowArrayElemProp = narrowArrayElemProp;
function genericNarrow(inst, check) {
    return check(inst);
}
exports.genericNarrow = genericNarrow;
//# sourceMappingURL=NarrowPropTypes.js.map