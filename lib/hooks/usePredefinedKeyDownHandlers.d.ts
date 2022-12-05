import type { InputString } from '../types/mix';
import type { SpecialKeyDownConfig } from '../types/specialKeyDown';
interface Params {
    specialKeyDownConfig: SpecialKeyDownConfig;
    inputInitValue: InputString;
    inputValue: InputString;
    onLastTokenDelete: () => void;
    handleInputValueUpdate: (newInputValue: InputString) => void;
    handleTokensCreate: (inputValue: InputString) => void;
}
declare function usePredefinedKeyDownHandlers(params: Params): {
    handleBackspaceKeyDown: () => void;
    handleTabKeyDown: (keyDownEvent: React.KeyboardEvent) => void;
    handleEnterKeyDown: () => void;
    handleEscapeKeyDown: () => void;
};
export default usePredefinedKeyDownHandlers;
