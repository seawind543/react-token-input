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
declare function usePredefinedKeyDownHandlers({ specialKeyDownConfig, inputInitValue, inputValue, onLastTokenDelete, handleInputValueUpdate, handleTokensCreate, }: Params): {
    handleBackspaceKeyDown: () => void;
    handleTabKeyDown: (keyDownEvent: KeyboardEvent) => void;
    handleEnterKeyDown: () => void;
    handleEscapeKeyDown: () => void;
};
export default usePredefinedKeyDownHandlers;
