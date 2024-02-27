import type { Index } from '../types/token';
import type { OnTokenValuesChange } from '../types/interfaces';
interface Params<VT> {
    tokenValues: VT[];
    onTokenValuesChange?: OnTokenValuesChange<VT>;
    focusTokenCreator: HTMLInputElement['focus'];
}
declare function useTokenDelete<VT>(params: Params<VT>): {
    handleTokenDelete: (targetIndex: Index) => () => void;
    handleLastTokenDelete: () => void;
};
export default useTokenDelete;
