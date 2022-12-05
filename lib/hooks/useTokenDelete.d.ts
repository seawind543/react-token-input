import type { TokenIndex } from '../types/token';
import type { OnTokenValuesChange } from '../types/interfaces';
interface Params<ValueType> {
    tokenValues: ValueType[];
    onTokenValuesChange?: OnTokenValuesChange<ValueType>;
    focusTokenCreator: () => void;
}
declare function useTokenDelete<ValueType>(params: Params<ValueType>): {
    handleTokenDelete: (targetIndex: TokenIndex) => () => void;
    handleLastTokenDelete: () => void;
};
export default useTokenDelete;
