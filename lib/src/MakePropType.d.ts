export declare type MakeProp<TKey extends string, TType> = Pick<{
    [key: string]: TType;
}, TKey>;
