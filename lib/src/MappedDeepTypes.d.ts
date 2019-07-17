import { NonComplexType } from "./NonComplexType";
export declare type PartialDeep<TType> = {
    [key in keyof TType]?: TType[key] extends readonly NonComplexType[] ? TType[key] : TType[key] extends readonly object[] ? PartialDeep<TType[key]> : TType[key] extends NonComplexType ? TType[key] : TType[key] extends object ? PartialDeep<TType[key]> : TType[key];
};
export declare type RequiredDeep<TType> = {
    [key in keyof TType]-?: TType[key] extends readonly NonComplexType[] ? TType[key] : TType[key] extends readonly object[] ? RequiredDeep<TType[key]> : TType[key] extends NonComplexType ? TType[key] : TType[key] extends object ? RequiredDeep<TType[key]> : TType[key];
};
export declare type ReadonlyDeep<TType> = {
    readonly [key in keyof TType]: TType[key] extends readonly NonComplexType[] ? TType[key] : TType[key] extends readonly object[] ? ReadonlyDeep<TType[key]> : TType[key] extends NonComplexType ? TType[key] : TType[key] extends object ? ReadonlyDeep<TType[key]> : TType[key];
};
export declare type LiftReadonlyDeep<TType> = {
    -readonly [key in keyof TType]: TType[key] extends readonly NonComplexType[] ? TType[key] : TType[key] extends readonly object[] ? LiftReadonlyDeep<TType[key]> : TType[key] extends NonComplexType ? TType[key] : TType[key] extends object ? LiftReadonlyDeep<TType[key]> : TType[key];
};
