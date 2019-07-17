import { MakeProp } from "./MakePropType";
/**
 * Union type of all values of a given key.
 * type Before = {
 *  square: {
 *       kind: 'sqr';
 *      side: number;
 *    },
 *    circle: {
 *        kind: 'cir';
 *        radius: number;
 *    }
 * }
 *
 * // 'sqr' | 'cir'
 * type AllValuesOfKind = AllValuesOfSubKey<Before, 'kind'>;
 * */
declare type AllValuesOfSubKey<T, TSubKey> = {
    [key in keyof T]: TSubKey extends keyof T[key] ? T[key][TSubKey] : never;
}[keyof T];
/**
 * Choose type where subkey matches certain type
 * type Before = {
 *  square: {
 *       kind: 'sqr';
 *      side: number;
 *    },
 *    circle: {
 *        kind: 'cir';
 *        radius: number;
 *    }
 * }
 *
 * // {
 * //     kind: 'cir';
 * //     radius: number;
 * // }
 * type matchVal = ValueWhereTSubKey<Before, 'kind', 'sqr'>;
 * */
declare type ValueWhereTSubKey<T, TSubKey, TTypeToMatch> = {
    [key in keyof T]: TSubKey extends keyof T[key] ? T[key][TSubKey] extends TTypeToMatch ? T[key] : never : never;
}[keyof T];
/**
 * Choose key where subkey matches certain type
 * type Before = {
 *  square: {
 *       kind: 'sqr';
 *      side: number;
 *    },
 *    circle: {
 *        kind: 'cir';
 *        radius: number;
 *    }
 * }
 *
 * // 'square'
 * type matchKey = KeyWhereTSubKey<Before, 'kind', 'sqr'>;
 * */
declare type KeyWhereTSubKey<T, TSubKey, TTypeToMatch> = {
    [key in keyof T]: TSubKey extends keyof T[key] ? T[key][TSubKey] extends TTypeToMatch ? key : never : never;
}[keyof T];
/**
 * Switch original key with one of the subkeys, preserving original in a prop.
 * type Before = {
 *  square: {
 *       kind: 'sqr';
 *      side: number;
 *    },
 *    circle: {
 *        kind: 'cir';
 *        radius: number;
 *    }
 * }
 *
 * // {
 * // sqr: {
 * //   kind: 'sqr';
 * //   side: number;
 * //   originalKey: 'square';
 * // },
 * // cir: {
 * //     kind: 'cir';
 * //     radius: number;
 * //     originalKey: 'circle';
 * // }
 * type Rotated = RotateSubKey<Before, 'kind', 'originalKey'>;
 * */
export declare type RotateSubKey<T, TSubKey, TOriginalKeyNewName extends string = 'originalKey'> = {
    [key in AllValuesOfSubKey<T, TSubKey> & (string | string)]: ValueWhereTSubKey<T, TSubKey, key> & MakeProp<TOriginalKeyNewName, KeyWhereTSubKey<T, TSubKey, key>>;
};
export {};
