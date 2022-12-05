/// <reference types="react" />
export interface TokenInputFocusHandler {
    (e?: React.FocusEvent<HTMLInputElement>): void;
}
interface Params {
    onCreatorFocus?: React.FocusEventHandler<HTMLInputElement>;
    onCreatorBlur?: React.FocusEventHandler<HTMLInputElement>;
}
declare function useTokenInputFocusEffect(params: Params): {
    isTokenInputFocused: boolean;
    handleTokenInputFocus: TokenInputFocusHandler;
    handleTokenInputBlur: TokenInputFocusHandler;
    handleCreatorFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleCreatorBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};
export default useTokenInputFocusEffect;
