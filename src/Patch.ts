import { MergeDeep } from "type-fest/source/merge-deep";
import { Primitive } from "type-fest/source/primitive";
import { ExpandDeep } from "./Expand";
import { KeysOfType } from "./KeysOfType";

/**
 * Add new property or change existing property type.
 * Used with Patch type.
 * */
export type Prop<T> = {
    marker: "__SpecialType:Prop:c923872d6c75"
    value: T
}

/**
 * Remove property is exists.
 * Used with Patch type.
 * */
export type RemoveProp = {
    marker: "__SpecialType:RemoveProp:c923872d6c75"
}

/**
 * Allows you to surgically change parts of type by adding properties,
 * removing properties and changing property types 
 * @example
 * 
 */
export type Patch<TBase, TPatch> = {
    [K in Exclude<keyof TBase, KeysOfType<TPatch, RemoveProp>> | Exclude<keyof TPatch, KeysOfType<TPatch, RemoveProp>>]: 
        K extends keyof TPatch 
            ? TPatch[K] extends Prop<infer TReplaceType> 
                ? TReplaceType 
                : TPatch[K] extends (infer UPatch)[] 
                    ? K extends keyof TBase 
                        ? TBase[K] extends (infer UBase)[] 
                            ? Patch<UBase, UPatch>[] 
                            : `ERROR:THIS_PROPERTY_IS_EXPECTED_TO_BE_AN_ARRAY_IN_BASE_TYPE` 
                        : `ERROR:THIS_PROPERTY_IS_EXPECTED_TO_BE_AN_ARRAY_IN_BASE_TYPE`
                    : TPatch[K] extends object
                        ?  K extends keyof TBase 
                                ? TBase[K] extends object
                                    ? Patch<TBase[K], TPatch[K]> 
                                    : `ERROR:THIS_PROPERTY_IS_EXPECTED_TO_BE_AN_OBJECT_IN_BASE_TYPE`
                                : `ERROR:THIS_PROPERTY_IS_EXPECTED_TO_BE_AN_OBJECT_IN_BASE_TYPE`
                        : `ERROR:PATCH_TYPE_CONTAINS_PRIMITIVE_TYPE_THAT_IS_NOT_WRAPPED_IN_Prop<T>`
            : K extends keyof TBase 
                ? TBase[K]
                : 'ERROR:PROPERTY_KEY_NOT_FOUND_IN_EITHER_BASE_TYPE_OR_PATCH_TYPE;THIS_BRANCH_SHOULD_NEVER_BE_REACHED;';
};

type Person = {
    name: string,
    surname: string,
    pet: {
        names: string[],
        age: number,
        species: string,
        toys: {
            model: string,
            age: number
        }[]
    }[],
    employment: {
        companyName: string,
        position: string
    },
}

type Replaced = 'Replaced';
type Added = 'Added';

type PatchedPerson = ExpandDeep<Patch<Person, {
    name: Prop<Replaced>,
    pet: {
        names: Prop<Replaced[]>,
        favoriteSnack: Prop<Added>,
        toys: {
            model: RemoveProp,
            age: Prop<Replaced>,
            color: Prop<Added>
        }[]
    }[],
    employment: RemoveProp,
    favoriteNumber: Prop<Added>
}>>;

// type PatchedPerson = {
//     name: "Replaced";
//     surname: string;
//     pet: {
//         names: "Replaced"[];
//         age: number;
//         species: string;
//         toys: {
//             age: "Replaced";
//             color: "Added";
//         }[];
//         favoriteSnack: "Added";
//     }[];
//     favoriteNumber: "Added";
// }

type ErrorsTest = ExpandDeep<Patch<Person, {
    name: {}[],
    nonexistant1: {}[],
    surname: {},
    nonexistant2: {},
    wrongType: number,

    pet: RemoveProp,
    employment: RemoveProp
}>>;

// type ErrorsTest = {
//     name: "ERROR:THIS_PROPERTY_IS_EXPECTED_TO_BE_AN_ARRAY_IN_BASE_TYPE";
//     surname: "ERROR:THIS_PROPERTY_IS_EXPECTED_TO_BE_AN_OBJECT_IN_BASE_TYPE";
//     nonexistant1: "ERROR:THIS_PROPERTY_IS_EXPECTED_TO_BE_AN_ARRAY_IN_BASE_TYPE";
//     nonexistant2: "ERROR:THIS_PROPERTY_IS_EXPECTED_TO_BE_AN_OBJECT_IN_BASE_TYPE";
//     wrongType: "ERROR:PATCH_TYPE_CONTAINS_PRIMITIVE_TYPE_THAT_IS_NOT_WRAPPED_IN_Prop<T>";
// }




type PatchedPerson2 = ExpandDeep<MergeDeep<Person, {
    name: Replaced,
    pet: {
        names: Replaced[],
        favoriteSnack: Added,
        toys: {
            model: never,
            age: Replaced,
            color: Added
        }[]
    }[],
    employment: {
        foobar: 5
    },
    favoriteNumber: Added
}>>;