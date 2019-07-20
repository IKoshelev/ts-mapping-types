export declare type SwappableKeys<T, TKey1 extends keyof T> = Exclude<{
    [key in keyof T]: T[key] extends T[TKey1] ? T[TKey1] extends T[key] ? key : never : never;
}[keyof T], TKey1>;
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
export declare function swap<T, TKey1 extends keyof T>(inst: T, key1: TKey1, key2: SwappableKeys<T, TKey1>): void;
