"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function narrowPropTypeGuard(target, key, check) {
    var inst = target[key];
    var isExpectedType = check(inst);
    return isExpectedType;
}
exports.narrowPropTypeGuard = narrowPropTypeGuard;
function narrowPropPropTypeGuard(target, key1, key2, check) {
    var outer = target[key1];
    if (!outer) {
        return false;
    }
    var inner = outer[key2];
    var isExpectedType = check(inner);
    return isExpectedType;
}
exports.narrowPropPropTypeGuard = narrowPropPropTypeGuard;
//# sourceMappingURL=index.js.map