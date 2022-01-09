import { TokenMeta, TokenIndex } from '../types/token';
declare type TokenMetaActivated<ErrorType> = TokenMeta<ErrorType>['activated'];
export declare type SetTokenActivated<ErrorType> = (targetIndex: TokenIndex, activated: TokenMetaActivated<ErrorType>) => void;
declare function useTokenMetas<ErrorType>(): {
    tokenMetas: TokenMeta<ErrorType>[];
    setTokenMetas: import("react").Dispatch<import("react").SetStateAction<TokenMeta<ErrorType>[]>>;
    setTokenActivated: SetTokenActivated<ErrorType>;
};
export default useTokenMetas;
