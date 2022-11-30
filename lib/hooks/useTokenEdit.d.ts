import type { OnTokenValuesChange } from '../types/interfaces';
import type { TokenIndex } from '../types/token';
import type { SetTokenActivated } from './useTokenMetas';
import type { TokenInputFocusHandler } from './useTokenInputFocusEffect';
interface HandleTokenEditStart {
    (targetIndex: TokenIndex): () => void;
}
interface HandleTokenEditEnd<ValueType> {
    (targetIndex: TokenIndex): (newTokenValue?: ValueType) => void;
}
interface Params<ValueType, ErrorType> {
    tokenValues: ValueType[];
    onTokenValuesChange?: OnTokenValuesChange<ValueType>;
    setTokenActivated: SetTokenActivated<ErrorType>;
    handleTokenInputFocus: TokenInputFocusHandler;
    handleTokenInputBlur: TokenInputFocusHandler;
}
declare function useTokenEdit<ValueType, ErrorType>({ tokenValues, onTokenValuesChange, setTokenActivated, handleTokenInputFocus, handleTokenInputBlur, }: Params<ValueType, ErrorType>): {
    handleTokenEditStart: HandleTokenEditStart;
    handleTokenEditEnd: HandleTokenEditEnd<ValueType>;
};
export default useTokenEdit;
