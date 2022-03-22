declare function useTokenCreatorRef(): {
    tokenCreatorRef: import("react").MutableRefObject<null>;
    focusTokenCreator: () => void;
};
export default useTokenCreatorRef;
