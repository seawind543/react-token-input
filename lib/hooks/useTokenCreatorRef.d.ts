import type { TokenCreatorRef } from '../TokenCreator';
declare function useTokenCreatorRef(): {
    tokenCreatorRef: import("react").RefObject<TokenCreatorRef>;
    focusTokenCreator: () => void;
};
export default useTokenCreatorRef;
