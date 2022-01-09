import type { TokenIndex, OnTokenValuesChange } from '../types/token';
import type { SetTokenActivated } from './useTokenMetas';
import type { HandleTokenInputFocus, HandleTokenInputBlur } from './useTokenInputFocusEffect';
declare type HandleTokenEditStart = (targetIndex: TokenIndex) => void;
declare type HandleTokenEditEnd<TokenValue> = (targetIndex: TokenIndex) => (newTokenValue?: TokenValue) => void;
declare type ParameterType<ValueType, ErrorType> = {
    tokenValues: ValueType[];
    onTokenValuesChange: OnTokenValuesChange<ValueType>;
    setTokenActivated: SetTokenActivated<ErrorType>;
    handleTokenInputFocus: HandleTokenInputFocus;
    handleTokenInputBlur: HandleTokenInputBlur;
};
declare function useTokenEdit<TokenValue, ErrorType>({ tokenValues, onTokenValuesChange, setTokenActivated, handleTokenInputFocus, handleTokenInputBlur, }: ParameterType<TokenValue, ErrorType>): {
    handleTokenEditStart: HandleTokenEditStart;
    handleTokenEditEnd: HandleTokenEditEnd<TokenValue>;
};
export default useTokenEdit;
