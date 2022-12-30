
/**
 * Expands generics and type manipulation operators into the final form
 * @example
 * type A = {
 *  a: number;
 * }
 * 
 * type B = {
 *  b: string
 * }
 * 
 * //without expand: type C = A & B
 * type C = A & B;
 * 
 * //with expand:
 * //type D = {
 * //  a: number;
 * //  b: string;
 * //}
 * type D = Expand<A & B>;
 * */
export type Expand<T> = T extends infer U 
          ? { [K in keyof U]: U[K] } 
          : never;

/**
 * Same as Expand, but Deep
 * */
export type ExpandDeep<T> = T extends object
  ? T extends infer U ? { [K in keyof U]: ExpandDeep<U[K]> } : never
  : T;