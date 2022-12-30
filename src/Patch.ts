import { Expand, ExpandDeep } from "./Expand"


type ReplaceType<T> = {
    marker: "__SpecialType:ReplaceType:c923872d6c75"
    value: T
}

type NewProp<T> = {
    marker: "__SpecialType:NewProp:c923872d6c75"
    value: T
}

type RemoveProp = {
    marker: "__SpecialType:RemoveProp:c923872d6c75"
}

type MappingError = {
    marker: "__SpecialType:MappingError:c923872d6c75"
}

type KeysToRemove<T> = {
    [K in keyof T]: T[K] extends RemoveProp ? K: never;
}[keyof T];

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
export type Patch<TBase, TPatch> = {
    [K in keyof Exclude<keyof TBase, KeysToRemove<TPatch>>]: K extends keyof TPatch ? 
        TPatch[K] extends ReplaceType<infer TReplaceType> ? TReplaceType :
        TPatch[K] extends never ? never : 
        Patch<TBase[K], TPatch[K]>
    : TBase[K]
}


type Person = {
    name: string, 
    surname: string,
    pet: {
        name: string,
        age: number,
        species: string,
    },
    employment: {
        companyName: string,
        position: string
    }
}

type a = KeysToRemove<{
    name: ReplaceType<string[]>,
    pet: {
        name: ReplaceType<string[]>,
        favoriteSnack: NewProp<string>,
    },
    employment: RemoveProp,
    favoriteNumber: NewProp<number>,
}>;

type p = Expand<keyof Person>;

type b = Expand<Exclude<p, a>>;

type PatchedPerson = ExpandDeep<Patch<Person, {
    name: ReplaceType<string[]>,
    pet: {
        name: ReplaceType<string[]>,
        favoriteSnack: NewProp<string>,
    },
    employment: RemoveProp,
    favoriteNumber: NewProp<number>,
}>>;