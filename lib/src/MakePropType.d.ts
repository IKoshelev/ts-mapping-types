/**
 * Equvalent to a type with a signle property with TKey name and TType type
 * @example
 * type equivalent = {
 *      TKey: TType;
 * }
 * // MakeProp<'foo', number>
 * type equivalent1 = {
 *      foo: number;
 * }
 */
export declare type MakeProp<TKey extends string, TType> = {
    [key in TKey]: TType;
};
