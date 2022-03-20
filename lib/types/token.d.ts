import type { Nullish } from './mix';
export declare type TokenIndex = number;
export declare type TokenMeta<ErrorType> = {
    key: string;
    activated: boolean;
    error: Nullish | ErrorType;
};
