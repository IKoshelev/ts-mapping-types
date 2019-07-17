export type MakeProp<TKey extends string , TType> = Pick<{
    [key: string]: TType;
}, TKey>;

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


  

