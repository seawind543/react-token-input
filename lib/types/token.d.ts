import type { Nullish } from './mix';
export type TokenIndex = number;
export interface TokenMeta<ErrorType = string> {
    key: string;
    activated: boolean;
    error: Nullish | ErrorType;
}
