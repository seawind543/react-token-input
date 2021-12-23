import { TokenMeta, TokenIndex } from '../types/token';
declare function useTokenMetas<ErrorType>(): {
    buildTokenMeta: <ValueType, ErrorType_1>(customizeError: ErrorType_1, tokenValue: ValueType, tokenIndex: number) => TokenMeta<ErrorType_1>;
    tokenMetas: TokenMeta<ErrorType>[];
    setTokenMetas: import("react").Dispatch<import("react").SetStateAction<TokenMeta<ErrorType>[]>>;
    setTokenActivated: (targetIndex: TokenIndex, activated: boolean) => void;
};
export default useTokenMetas;
