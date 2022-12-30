import { KeysOfType } from "./KeysOfType";

/**
 * Special marker type used with Patch
 * */
export type ReplaceType<T> = {
    marker: "__SpecialType:ReplaceType:c923872d6c75"
    value: T
}

/**
 * Special marker type used with Patch
 * */
export type AddProp<T> = {
    marker: "__SpecialType:AddProp:c923872d6c75"
    value: T
}

/**
 * Special marker type used with Patch
 * */
export type RemoveProp = {
    marker: "__SpecialType:RemoveProp:c923872d6c75"
}

type SelectNewProps<TPatch> = {
    [K in Exclude<keyof TPatch, KeysOfType<TPatch, RemoveProp> | KeysOfType<TPatch, ReplaceType<any>>>]:
        // TPatch[K] extends ReplaceType<infer TReplaceType> ? unknown :
        // TPatch[K] extends RemoveProp ? unknown : 
        TPatch[K] extends AddProp<infer TReplaceType> ? TReplaceType : 
        SelectNewProps<TPatch[K]>
}

/**
 * Allows you to surgically change parts of type by adding properties,
 * removing properties and changing property types 
 * @example
 * type Person = {
 *   name: string, 
 *   surname: string,
 *   pet: {
 *       name: string,
 *       age: number,
 *       species: string,
 *   },
 *   employment: {
 *       companyName: string,
 *       position: string
 *   }
 *  }
 *
 * type PatchedPerson = Patch<Person, {
 *   name: ReplaceType<string[]>,
 *   pet: {
 *       name: ReplaceType<string[]>,
 *       favoriteSnack: AddProp<string>,
 *   },
 *   employment: RemoveProp,
 *   favoriteNumber: AddProp<number>,
 * }>;
 * 
 * // type PatchedPerson = {
 * //    name: string[];
 * //    surname: string;
 * //    pet: {
 * //        name: string[];
 * //        age: number;
 * //        species: string;
 * //        favoriteSnack: string;
 * //    };
 * //    favoriteNumber: number;
 * // }
 */
export type Patch<TBase, TPatch> = {
    [K in Exclude<keyof TBase, KeysOfType<TPatch, RemoveProp>>]: K extends keyof TPatch ? 
        TPatch[K] extends ReplaceType<infer TReplaceType> ? TReplaceType :
        Patch<TBase[K], TPatch[K]>
    : TBase[K]
} & SelectNewProps<TPatch>;