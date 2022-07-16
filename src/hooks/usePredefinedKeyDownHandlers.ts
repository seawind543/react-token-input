import { useCallback } from 'react';
import {
  KEY_DOWN_HANDLER_CONFIG_OPTION,
  DEFAULT_SPECIAL_KEY_DOWN_CONFIG,
} from '../constants';

import type { InputString } from '../types/mix';
import type {
  SpecialKeyDownConfig,
  KeyDownHandlerConfigOption,
} from '../types/specialKeyDown';

interface Params {
  specialKeyDownConfig: SpecialKeyDownConfig;
  inputInitValue: InputString;
  inputValue: InputString;
  onLastTokenDelete: () => void;
  handleInputValueUpdate: (newInputValue: InputString) => void;
  handleTokensCreate: (inputValue: InputString) => void;
}

interface HandleKeyDownParams {
  keyDownHandlerConfig: KeyDownHandlerConfigOption;
  predefinedHandler: () => void;
}

const handleKeyDown = ({
  keyDownHandlerConfig,
  predefinedHandler,
}: HandleKeyDownParams): void => {
  // TODO: Support customize keyDownHandler
  switch (true) {
    case keyDownHandlerConfig === KEY_DOWN_HANDLER_CONFIG_OPTION.ON:
      predefinedHandler();
      break;

    // case keyDownHandlerConfig === KEY_DOWN_HANDLER_CONFIG_OPTION.OFF:
    default:
    // Do nothing
  }
};

function usePredefinedKeyDownHandlers({
  specialKeyDownConfig,
  inputInitValue,
  inputValue,
  onLastTokenDelete,
  handleInputValueUpdate,
  handleTokensCreate,
}: Params) {
  // console.log('specialKeyDownConfig', specialKeyDownConfig);
  const {
    onBackspace,
    onTab,
    onEnter,
    onEscape,
  }: Required<SpecialKeyDownConfig> = {
    ...DEFAULT_SPECIAL_KEY_DOWN_CONFIG,
    ...specialKeyDownConfig,
  };
  const handleBackspaceKeyDown = useCallback(() => {
    handleKeyDown({
      keyDownHandlerConfig: onBackspace,
      predefinedHandler: () => {
        if (inputValue.length === 0) {
          // Delete the latest token when `Backspace`
          onLastTokenDelete();
        }
      },
    });
  }, [onBackspace, inputValue, onLastTokenDelete]);

  const handleTabKeyDown = useCallback(
    (keyDownEvent: React.KeyboardEvent) => {
      handleKeyDown({
        keyDownHandlerConfig: onTab,
        predefinedHandler: () => {
          keyDownEvent.preventDefault();
          handleTokensCreate(inputValue);
        },
      });
    },
    [onTab, inputValue, handleTokensCreate]
  );

  const handleEnterKeyDown = useCallback(() => {
    handleKeyDown({
      keyDownHandlerConfig: onEnter,
      predefinedHandler: () => {
        handleTokensCreate(inputValue);
      },
    });
  }, [onEnter, inputValue, handleTokensCreate]);

  const handleEscapeKeyDown = useCallback(() => {
    handleKeyDown({
      keyDownHandlerConfig: onEscape,
      predefinedHandler: () => {
        // Reset the input value
        handleInputValueUpdate(inputInitValue);
      },
    });
  }, [onEscape, inputInitValue, handleInputValueUpdate]);

  return {
    handleBackspaceKeyDown,
    handleTabKeyDown,
    handleEnterKeyDown,
    handleEscapeKeyDown,
  };
}

export default usePredefinedKeyDownHandlers;
