import type { OnTokenValuesChange } from '../types/interfaces';
import type { Index } from '../types/token';
import type { SetTokenActivated } from './useTokenMetas';
import type { TokenInputFocusHandler } from './useTokenInputFocusEffect';
interface HandleTokenEditStart {
    (targetIndex: Index): () => void;
}
interface HandleTokenEditEnd<VT> {
    (targetIndex: Index): (newTokenValue?: VT) => void;
}
interface Params<VT, ET> {
    tokenValues: VT[];
    onTokenValuesChange?: OnTokenValuesChange<VT>;
    setTokenActivated: SetTokenActivated<ET>;
    handleTokenInputFocus: TokenInputFocusHandler;
    handleTokenInputBlur: TokenInputFocusHandler;
}
declare function useTokenEdit<VT, ET>(params: Params<VT, ET>): {
    handleTokenEditStart: HandleTokenEditStart;
    handleTokenEditEnd: HandleTokenEditEnd<VT>;
};
export default useTokenEdit;
