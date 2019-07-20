/**
 * Equvalent to a type with a signle property with TKey name and TType type
 * @example
 * type equivalent = {
 *      TKey: TType
 * }
 */
export declare type MakeProp<TKey extends string, TType> = Pick<{
    [key: string]: TType;
}, TKey>;
