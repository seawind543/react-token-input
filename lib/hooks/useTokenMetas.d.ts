import { TokenMeta, TokenIndex } from '../types/token';
export declare type SetTokenActivated<ErrorType> = (targetIndex: TokenIndex, activated: TokenMeta<ErrorType>['activated']) => void;
declare function useTokenMetas<ErrorType>(): {
    tokenMetas: TokenMeta<ErrorType>[];
    setTokenMetas: import("react").Dispatch<import("react").SetStateAction<TokenMeta<ErrorType>[]>>;
    setTokenActivated: SetTokenActivated<ErrorType>;
};
export default useTokenMetas;
