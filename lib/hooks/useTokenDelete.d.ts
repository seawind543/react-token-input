import type { TokenValue, TokenIndex } from '../types/token';
import type { OnTokenValuesChange } from '../types/interfaces';
declare type ParameterType<ValueType> = {
    tokenValues: TokenValue<ValueType>[];
    onTokenValuesChange?: OnTokenValuesChange<ValueType>;
    focusTokenCreator: () => void;
};
declare function useTokenDelete<ValueType>({ tokenValues, onTokenValuesChange, focusTokenCreator, }: ParameterType<ValueType>): {
    handleTokenDelete: (targetIndex: TokenIndex) => () => void;
    handleLastTokenDelete: () => void;
};
export default useTokenDelete;
