import type { TokenCreatorRef } from '../TokenCreator';
declare function useTokenCreatorRef(): {
    tokenCreatorRef: import("react").RefObject<TokenCreatorRef>;
    focusTokenCreator: (options?: FocusOptions) => void;
    setCreatorValue: (value: import("../types/mix").InputString) => void;
    getCreatorValue: () => import("../types/mix").InputString;
    createTokens: (value?: import("../types/mix").InputString) => void;
};
export default useTokenCreatorRef;
