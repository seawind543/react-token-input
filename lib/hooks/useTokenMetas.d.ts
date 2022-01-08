import { TokenMeta, TokenIndex } from '../types/token';
declare function useTokenMetas<ErrorType>(): {
    tokenMetas: TokenMeta<ErrorType>[];
    setTokenMetas: import("react").Dispatch<import("react").SetStateAction<TokenMeta<ErrorType>[]>>;
    setTokenActivated: (targetIndex: TokenIndex, activated: boolean) => void;
};
export default useTokenMetas;
