"use strict";
/**
 * Swap prop values with a check that values have compatible type
 * @example
 * const t = {
 *   a: 1,
 *   b: 2,
 *   c: '',
 *   c1: '',
 *   d: { a: 5 },
 *   e: { a: 6 },
 *   f: { b: 7 },
 *   g: { a: '' }
 * }
 *
 * swap(t, 'a', 'b');
 * swap(t, 'a', 'c'); //error
 * swap(t, 'b', 'c'); //error
 * swap(t, 'a', 'a'); //error
 * swap(t, 'c', 'c1');
 * swap(t, 'd','e');
 * swap(t, 'd','f'); //error
 * swap(t, 'd','g'); //error
 **/
function swap(inst, key1, key2) {
    var buff = inst[key1];
    inst[key1] = inst[key2];
    inst[key2] = buff;
}
//# sourceMappingURL=SwapProps.js.map