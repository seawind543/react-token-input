import type { OnTokenValueValidate } from '../types/interfaces';
declare type Params<ValueType, ErrorType> = {
    tokenValues: ValueType[];
    onTokenValueValidate: OnTokenValueValidate<ValueType, ErrorType>;
};
declare function useTokensUpdate<ValueType, ErrorType>({ tokenValues, onTokenValueValidate, }: Params<ValueType, ErrorType>): {
    hasInvalidToken: boolean;
    internalTokenValues: ValueType[];
    tokenMetas: import("../types/token").TokenMeta<ErrorType>[];
    setTokenActivated: import("./useTokenMetas").SetTokenActivated<ErrorType>;
};
export default useTokensUpdate;
