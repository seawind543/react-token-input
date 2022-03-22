import type { TokenIndex } from '../types/token';
import type { OnTokenValuesChange } from '../types/interfaces';
declare type Params<ValueType> = {
    tokenValues: ValueType[];
    onTokenValuesChange?: OnTokenValuesChange<ValueType>;
    focusTokenCreator: () => void;
};
declare function useTokenDelete<ValueType>({ tokenValues, onTokenValuesChange, focusTokenCreator, }: Params<ValueType>): {
    handleTokenDelete: (targetIndex: TokenIndex) => () => void;
    handleLastTokenDelete: () => void;
};
export default useTokenDelete;
