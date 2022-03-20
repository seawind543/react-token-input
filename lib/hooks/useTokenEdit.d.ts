import type { OnTokenValuesChange } from '../types/interfaces';
import type { TokenIndex } from '../types/token';
import type { SetTokenActivated } from './useTokenMetas';
import type { HandleTokenInputFocus, HandleTokenInputBlur } from './useTokenInputFocusEffect';
declare type HandleTokenEditStart = (targetIndex: TokenIndex) => () => void;
declare type HandleTokenEditEnd<ValueType> = (targetIndex: TokenIndex) => (newTokenValue?: ValueType) => void;
declare type ParameterType<ValueType, ErrorType> = {
    tokenValues: ValueType[];
    onTokenValuesChange?: OnTokenValuesChange<ValueType>;
    setTokenActivated: SetTokenActivated<ErrorType>;
    handleTokenInputFocus: HandleTokenInputFocus;
    handleTokenInputBlur: HandleTokenInputBlur;
};
declare function useTokenEdit<ValueType, ErrorType>({ tokenValues, onTokenValuesChange, setTokenActivated, handleTokenInputFocus, handleTokenInputBlur, }: ParameterType<ValueType, ErrorType>): {
    handleTokenEditStart: HandleTokenEditStart;
    handleTokenEditEnd: HandleTokenEditEnd<ValueType>;
};
export default useTokenEdit;
