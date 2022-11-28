import type { Nullish } from './mix';
export declare type TokenIndex = number;
export interface TokenMeta<ErrorType = string> {
    key: string;
    activated: boolean;
    error: Nullish | ErrorType;
}
