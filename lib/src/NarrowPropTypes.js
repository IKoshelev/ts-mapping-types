"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function narrowArrayElement(check) {
    return function (i) { return i.every(check); };
}
exports.narrowArrayElement = narrowArrayElement;
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