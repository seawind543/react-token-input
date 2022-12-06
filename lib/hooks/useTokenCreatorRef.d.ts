import type { TokenCreatorRef } from '../TokenCreator';
declare function useTokenCreatorRef(): {
    tokenCreatorRef: import("react").RefObject<TokenCreatorRef>;
    focusTokenCreator: (options?: FocusOptions | undefined) => void;
    setCreatorValue: (value: string) => void;
};
export default useTokenCreatorRef;
