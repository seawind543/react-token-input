export interface HandleTokenInputFocus {
    (): void;
}
export interface HandleTokenInputBlur {
    (): void;
}
declare function useTokenInputFocus(): {
    isTokenInputFocused: boolean;
    handleTokenInputFocus: HandleTokenInputFocus;
    handleTokenInputBlur: HandleTokenInputBlur;
};
export default useTokenInputFocus;
