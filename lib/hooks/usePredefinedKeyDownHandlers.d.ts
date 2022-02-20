import type { InputString } from '../types/mix';
import type { SpecialKeyDownConfig } from '../types/specialKeyDown';
declare type ParameterType = {
    specialKeyDownConfig: SpecialKeyDownConfig;
    inputInitValue: InputString;
    inputValue: InputString;
    onLastTokenDelete: () => void;
    handleInputValueUpdate: (newInputValue: InputString) => void;
    handleTokensCreate: (inputValue: InputString) => void;
};
declare function usePredefinedKeyDownHandlers({ specialKeyDownConfig, inputInitValue, inputValue, onLastTokenDelete, handleInputValueUpdate, handleTokensCreate, }: ParameterType): {
    handleBackspaceKeyDown: () => void;
    handleTabKeyDown: (keyDownEvent: KeyboardEvent) => void;
    handleEnterKeyDown: () => void;
    handleEscapeKeyDown: () => void;
};
export default usePredefinedKeyDownHandlers;
