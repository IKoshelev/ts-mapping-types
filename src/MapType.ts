import { IsEqual } from "type-fest";
import { Expand } from "./Expand";
import { NonComplexType } from "./NonComplexType";


/**
 * Replaces all property types of one type with another.
 * Type match is EXACT
 * @example
 *
 * type Person = {
 *       name: string, 
 *       surname: string,
 *       birthDate: string | Date,
 *       employmentDate: null | string | Date,
 *       someOtherDate: undefined | string | Date,
 *       anotherDate?: string | Date,
 * }
 * 
 * type MappedPerson = MapType<MapType<MapType<Person,
 *                        undefined | string | Date, undefined | Date>,
 *                        null | string | Date, null | Date>,
 *                        string | Date, Date>;
 * 
 * //type MappedPerson = {
 * //    name: string;
 * //    surname: string;
 * //    birthDate: Date;
 * //    employmentDate: Date | null;
 * //    someOtherDate: Date | undefined;
 * //    anotherDate?: Date | undefined;
 * //}
 */
export type MapType<TType, TOldProp, TNewProp> = {
    [K in keyof TType]: IsEqual<TType[K], TOldProp> extends true ? TNewProp : TType[K]
}

export type MapTypeDeep<TType, TOldProp, TNewProp> = {
    [K in keyof TType]: IsEqual<TType[K],TOldProp> extends true ? TNewProp
                      : TType[K] extends NonComplexType ? TType[K]
                      : MapTypeDeep<TType, TOldProp, TNewProp>
}