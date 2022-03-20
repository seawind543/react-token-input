import type { OnTokenValueValidate } from '../types/interfaces';
declare type ParameterType<ValueType, ErrorType> = {
    tokenValues: ValueType[];
    onTokenValueValidate: OnTokenValueValidate<ValueType, ErrorType>;
};
declare function useTokensUpdate<ValueType, ErrorType>({ tokenValues, onTokenValueValidate, }: ParameterType<ValueType, ErrorType>): {
    hasInvalidToken: boolean;
    internalTokenValues: ValueType[];
    tokenMetas: import("../types/token").TokenMeta<ErrorType>[];
    setTokenActivated: import("./useTokenMetas").SetTokenActivated<ErrorType>;
};
export default useTokensUpdate;
