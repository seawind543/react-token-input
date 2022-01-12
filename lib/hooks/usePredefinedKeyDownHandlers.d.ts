import type { SpecialKeyDownConfig } from '../constants';
import { InputValue } from '../types/token';
declare type ParameterType = {
    specialKeyDownConfig: SpecialKeyDownConfig;
    inputInitValue: InputValue;
    inputValue: InputValue;
    onLastTokenDelete: () => void;
    handleInputValueUpdate: (newInputValue: InputValue) => void;
    handleTokensCreate: (inputValue: InputValue) => void;
};
declare function usePredefinedKeyDownHandlers({ specialKeyDownConfig, inputInitValue, inputValue, onLastTokenDelete, handleInputValueUpdate, handleTokensCreate, }: ParameterType): {
    handleBackspaceKeyDown: () => void;
    handleTabKeyDown: (keyDownEvent: KeyboardEvent) => void;
    handleEnterKeyDown: () => void;
    handleEscapeKeyDown: () => void;
};
export default usePredefinedKeyDownHandlers;
