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
                        ? TBase[K] extends (infer UBase)[] ? Patch<UBase, UPatch>[] 
                        : never : never
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

      type TypeReplaced = 'TypeReplaced';
      type PropAdded = 'PropAdded';

      type PersonPatch = {
        name: Prop<TypeReplaced>,
        pet: {
            //names: Prop<TypeReplaced>[],
            favoriteSnack: Prop<PropAdded>,
            toys: {
                model: RemoveProp,
                age: Prop<TypeReplaced>,
                color: Prop<PropAdded>
            }[]
        }[],
        employment: RemoveProp,
        favoriteNumber: Prop<PropAdded>,
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