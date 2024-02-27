/// <reference types="react" />
import type { TokenMeta, Index } from '../types/token';
export interface SetTokenActivated<ET> {
    (targetIndex: Index, activated: TokenMeta<ET>['activated']): void;
}
declare function useTokenMetas<ET>(): {
    tokenMetas: TokenMeta<ET>[];
    setTokenMetas: import("react").Dispatch<import("react").SetStateAction<TokenMeta<ET>[]>>;
    setTokenActivated: SetTokenActivated<ET>;
};
export default useTokenMetas;
