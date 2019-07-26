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

export type MakeProp<TKey extends string , TType> =  {
    [key in TKey]: TType
}

/*This lets you make new poperties from keys and types in your mapped types and generics
Imagine you want to go from
type A = {
  foo: {
      a: number;
  }
}
to
type B = {
    foo: {
        a: number;
        foo: ?
    }
}
use
type AddEachKeyToItsPropType<T> = {
    [key in keyof T]: key extends string
                            ? T[key] & MakeProp<key, undefined> 
                            : T[key];
}

type B = AddEachKeyToItsPropType<A>;
*/