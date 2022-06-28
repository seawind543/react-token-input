import type { Nullish } from './mix';
export declare type TokenIndex = number;
export interface TokenMeta<ErrorType> {
    key: string;
    activated: boolean;
    error: Nullish | ErrorType;
}
