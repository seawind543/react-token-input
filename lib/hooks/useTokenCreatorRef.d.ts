declare function useTokenCreatorRef(): {
    tokenCreatorRef: import("react").RefObject<HTMLInputElement>;
    focusTokenCreator: () => void;
};
export default useTokenCreatorRef;
