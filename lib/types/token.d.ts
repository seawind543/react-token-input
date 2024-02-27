import type { Nullish } from './mix';
export type Index = number;
export interface TokenMeta<ET = string> {
    key: string;
    activated: boolean;
    error: Nullish | ET;
}
