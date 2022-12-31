import { IsEqual } from "type-fest";
import { Expand, ExpandDeep } from "./Expand";
import { NonComplexType } from "./NonComplexType";


/**
 * Replaces all property types of one type with another.
 * Type match is EXACT
 * @example
 *
 
 */
export type ReplacePropTypeStrict<TType, TOldProp, TNewProp> = {
    [K in keyof TType]: IsEqual<TType[K], TOldProp> extends true ? TNewProp : TType[K]
}

export type ReplacePropTypeDeepStrict<TType, TOldProp, TNewProp> = {
    [K in keyof TType]: 
        IsEqual<TType[K],TOldProp> extends true 
            ? TNewProp
            : TType[K] extends object 
                ? ReplacePropTypeDeepStrict<TType[K], TOldProp, TNewProp>
                : TType[K] extends (infer U)[] 
                    ? IsEqual<U, TOldProp> extends true 
                        ? TNewProp[]
                        : U extends object
                            ? ReplacePropTypeDeepStrict<U, TOldProp, TNewProp>[]
                            : U[]
                    : TType[K];
}

export type ReplacePropType<TType, TOldProp, TNewProp> = {
    [K in keyof TType]: TOldProp extends TType[K] ? TNewProp : TType[K]
}

export type ReplacePropTypeDeep<TType, TOldProp, TNewProp> = {
    [K in keyof TType]: 
        TOldProp extends TType[K] 
            ? TNewProp
            : TType[K] extends object 
                ? ReplacePropTypeDeep<TType[K], TOldProp, TNewProp>
                : TType[K] extends (infer U)[] 
                    ? TOldProp extends U 
                        ? TNewProp[]
                        : U extends object
                            ? ReplacePropTypeDeep<U, TOldProp, TNewProp>[]
                            : U[]
                    : TType[K];
}


    type Subject = {
          prop1: string, 
          prop2: string,
          prop3: string | Date,
          prop4: null | string | Date,
          prop5: string | Date,
          prop6?: string | Date,
          prop7:  (string | Date)[],
          prop8: {
            prop1:  string | Date
          },
          prop9: {
            prop1: string | Date
          }[]
    }
    
    type MappedSubject = ExpandDeep<ReplacePropTypeDeep<Subject, 
            Date, 'replaced Date'>>;

    type a = MappedSubject['prop8'];
    type b = MappedSubject['prop9']
    
    //type MappedPerson = {
    //    name: string;
    //    surname: string;
    //    birthDate: Date;
    //    employmentDate: Date | null;
    //    someOtherDate: Date | undefined;
    //    anotherDate?: Date | undefined;
    //}