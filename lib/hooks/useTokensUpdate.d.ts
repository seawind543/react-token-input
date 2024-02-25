import type { OnTokenValueValidate } from '../types/interfaces';
interface Params<VT, ET> {
    tokenValues: VT[];
    onTokenValueValidate: OnTokenValueValidate<VT, ET>;
}
declare function useTokensUpdate<VT, ET>(params: Params<VT, ET>): {
    hasInvalidToken: boolean;
    internalTokenValues: VT[];
    tokenMetas: import("../types/token").TokenMeta<ET>[];
    setTokenActivated: import("./useTokenMetas").SetTokenActivated<ET>;
};
export default useTokensUpdate;
