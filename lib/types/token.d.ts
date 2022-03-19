import type { Nullish } from './mix';
export declare type DefaultValueType = string;
export declare type TokenValue<ValueType> = DefaultValueType | ValueType;
export declare type TokenIndex = number;
export declare type TokenMeta<ErrorType> = {
    key: string;
    activated: boolean;
    error: Nullish | ErrorType;
};
