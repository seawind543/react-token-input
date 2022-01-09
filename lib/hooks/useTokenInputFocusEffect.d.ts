export declare type HandleTokenInputFocus = () => void;
export declare type HandleTokenInputBlur = () => void;
declare function useTokenInputFocus(): {
    isTokenInputFocused: boolean;
    handleTokenInputFocus: HandleTokenInputFocus;
    handleTokenInputBlur: HandleTokenInputBlur;
};
export default useTokenInputFocus;
