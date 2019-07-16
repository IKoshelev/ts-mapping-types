export type PartialDeep<TType> = {
    [key in keyof TType]?:        
        TType[key] extends readonly object[] ? PartialDeep<TType[key]> :
        TType[key] extends object ? PartialDeep<TType[key]> : 
        TType[key];
}

export type RequiredDeep<TType> = {
    [key in keyof TType]-?:
    TType[key] extends readonly object[] ?  RequiredDeep<TType[key]> :
    TType[key] extends object ? RequiredDeep<TType[key]> : 
    TType[key];
}

export type ReadonlyDeep<TType> = {
    readonly [key in keyof TType]:
        TType[key] extends readonly object[] ? ReadonlyDeep<TType[key]> :
        TType[key] extends object ? ReadonlyDeep<TType[key]> : 
        TType[key];
}

export type LiftReadonlyDeep<TType> = {
    -readonly [key in keyof TType]:
        TType[key] extends readonly object[] ? LiftReadonlyDeep<TType[key]> :
        TType[key] extends object ? LiftReadonlyDeep<TType[key]> : 
        TType[key];
}