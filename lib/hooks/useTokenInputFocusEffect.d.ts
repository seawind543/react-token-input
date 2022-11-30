/// <reference types="react" />
export interface TokenInputFocusHandler {
    (e?: React.FocusEvent<HTMLInputElement>): void;
}
declare function useTokenInputFocus(): {
    isTokenInputFocused: boolean;
    handleTokenInputFocus: TokenInputFocusHandler;
    handleTokenInputBlur: TokenInputFocusHandler;
};
export default useTokenInputFocus;
