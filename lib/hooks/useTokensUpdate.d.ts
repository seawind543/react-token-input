import type { OnTokenValueValidate, OnGenTokenMetaKey } from '../types/interfaces';
interface Params<ValueType, ErrorType> {
    tokenValues: ValueType[];
    onTokenValueValidate: OnTokenValueValidate<ValueType, ErrorType>;
    onGenTokenMetaKey: OnGenTokenMetaKey<ValueType>;
}
declare function useTokensUpdate<ValueType, ErrorType>({ tokenValues, onTokenValueValidate, onGenTokenMetaKey, }: Params<ValueType, ErrorType>): {
    hasInvalidToken: boolean;
    internalTokenValues: ValueType[];
    tokenMetas: import("../types/token").TokenMeta<ErrorType>[];
    setTokenActivated: import("./useTokenMetas").SetTokenActivated<ErrorType>;
};
export default useTokensUpdate;
