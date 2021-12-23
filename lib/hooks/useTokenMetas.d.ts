import { TokenMeta, TokenIndex } from '../types/token';
declare function useTokenMetas(): {
    buildTokenMeta: (customizeError: any, tokenValue: any, tokenIndex: number) => TokenMeta;
    tokenMetas: TokenMeta[];
    setTokenMetas: import("react").Dispatch<import("react").SetStateAction<TokenMeta[]>>;
    setTokenActivated: (targetIndex: TokenIndex, activated: TokenMeta['activated']) => void;
};
export default useTokenMetas;
