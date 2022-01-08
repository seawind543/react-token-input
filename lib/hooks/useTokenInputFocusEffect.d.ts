declare type HandleTokenInputFocus = () => void;
declare type HandleTokenInputBlur = () => void;
declare function useTokenInputFocus(): {
    isTokenInputFocused: boolean;
    handleTokenInputFocus: HandleTokenInputFocus;
    handleTokenInputBlur: HandleTokenInputBlur;
};
export default useTokenInputFocus;
