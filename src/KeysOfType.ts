
export type KeysOfType<T, TType> = {
    [K in keyof T]: T[K] extends TType ? K: never;
}[keyof T];