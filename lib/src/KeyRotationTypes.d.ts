declare type Before = {
    square: {
        kind: 'sqr';
        side: number;
    };
    circle: {
        kind: 'cir';
        radius: number;
    };
};
/**
 * Creates an instance of Circle.
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
declare type ValueWhereTSubKey<T, TSubKey, TTypeToMatch> = {
    [key in keyof T]: TSubKey extends keyof T[key] ? T[key][TSubKey] extends TTypeToMatch ? T[key] : never : never;
}[keyof T];
declare type KeyWhereTSubKey<T, TSubKey, TTypeToMatch> = {
    [key in keyof T]: TSubKey extends keyof T[key] ? T[key][TSubKey] extends TTypeToMatch ? key : never : never;
}[keyof T];
declare type matchVal = ValueWhereTSubKey<Before, 'kind', 'sqr'>;
declare type matchKey = KeyWhereTSubKey<Before, 'kind', 'sqr'>;
declare type RotateSubKey<T, TSubKey> = {
    [key in AllValuesOfSubKey<T, TSubKey> & string]: ValueWhereTSubKey<T, TSubKey, key> & {
        originalKey: KeyWhereTSubKey<T, TSubKey, key>;
    };
};
declare type Rotated = RotateSubKey<Before, 'kind'>;
declare type RotateSubKeyWithOriginalKeyNameChoice<T, TSubKey, TOriginalKeyNewName extends string> = {
    [key in AllValuesOfSubKey<T, TSubKey> & string]: ValueWhereTSubKey<T, TSubKey, key> & Pick<{
        [k: string]: KeyWhereTSubKey<T, TSubKey, key>;
    }, TOriginalKeyNewName>;
};
declare type Rotated2 = RotateSubKeyWithOriginalKeyNameChoice<Before, 'kind', 'fooBar'>;
declare type RotatedExample = RotateSubKey<Before, 'kind'>;
