import { ElementType } from "./ElementType";
import { ExpandDeep } from "./Expand";
import { KeysOfType } from "./KeysOfType";


/**
 * Special marker type used with Patch
 * */
export type Prop<T> = {
    marker: "__SpecialType:Prop:c923872d6c75"
    value: T
}

/**
 * Special marker type used with Patch
 * */
export type RemoveProp = {
    marker: "__SpecialType:RemoveProp:c923872d6c75"
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
    [K in Exclude<keyof TBase, KeysOfType<TPatch, RemoveProp>> | Exclude<keyof TPatch, KeysOfType<TPatch, RemoveProp>>]: 
        K extends keyof TPatch 
            ? TPatch[K] extends Prop<infer TReplaceType> 
                ? TReplaceType 
                : TPatch[K] extends (infer UPatch)[] 
                    ? K extends keyof TBase 
                        ? TBase[K] extends (infer UBase)[] 
                            ? Patch<UBase, UPatch>[] 
                            : never
                        : never
                    : K extends keyof TBase 
                        ? Patch<TBase[K], TPatch[K]> 
                        : never
            : K extends keyof TBase 
                ? TBase[K]
                : never;
};

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
       },
       cars: {
        model: string,
        make: number,
       }[]
      }

      type TypeReplaced = 'TypeReplaced';
      type PropAdded = 'PropAdded';

      type PersonPatch = {
        name: Prop<TypeReplaced>,
        pet: {
            name: Prop<TypeReplaced>,
            favoriteSnack: Prop<PropAdded>,
        },
        employment: RemoveProp,
        favoriteNumber: Prop<PropAdded>,
        cars: {
            make: RemoveProp
        }[]
      };
    
      //type a = ExpandDeep<SelectNewProps<PersonPatch>>;
      
     type PatchedPerson = ExpandDeep<Patch<Person,PersonPatch >>;
     
     // type PatchedPerson = {
     //    name: string[];
     //    surname: string;
     //    pet: {
     //        name: string[];
     //        age: number;
     //        species: string;
     //        favoriteSnack: string;
     //    };
     //    favoriteNumber: number;
     // }