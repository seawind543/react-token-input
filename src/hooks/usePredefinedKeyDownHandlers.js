import { useCallback } from 'react';
import {
  KEY_DOWN_HANDLER_CONFIG_OPTION,
  DEFAULT_SPECIAL_KEY_DOWN,
} from '../constants.ts';

const handleKeyDown = ({
  keyDownEvent,
  keyDownHandlerConfig,
  predefinedHandler,
}) => {
  switch (true) {
    case keyDownHandlerConfig === KEY_DOWN_HANDLER_CONFIG_OPTION.ON:
      predefinedHandler(keyDownEvent);
      break;

    // case keyDownHandlerConfig === KEY_DOWN_HANDLER_CONFIG_OPTION.OFF:
    default:
    // Do nothing
  }
};

function usePredefinedKeyDownHandlers({
  specialKeyDown,
  inputInitValue,
  inputValue,
  onLastTokenDelete,
  handleInputValueUpdate,
  handleTokensCreate,
}) {
  // console.log('specialKeyDown', specialKeyDown);
  const { onBackspace, onTab, onEnter, onEscape } = {
    ...DEFAULT_SPECIAL_KEY_DOWN,
    ...specialKeyDown,
  };
  const handleBackspaceKeyDown = useCallback(
    (keyDownEvent) => {
      handleKeyDown({
        keyDownEvent,
        keyDownHandlerConfig: onBackspace,
        predefinedHandler: () => {
          if (inputValue.length === 0) {
            // Delete the latest token when `Backspace`
            onLastTokenDelete();
          }
        },
      });
    },
    [onBackspace, inputValue, onLastTokenDelete]
  );

  const handleTabKeyDown = useCallback(
    (keyDownEvent) => {
      handleKeyDown({
        keyDownEvent,
        keyDownHandlerConfig: onTab,
        predefinedHandler: (keyDownEvent) => {
          keyDownEvent.preventDefault();
          handleTokensCreate(inputValue);
        },
      });
    },
    [onTab, inputValue, handleTokensCreate]
  );

  const handleEnterKeyDown = useCallback(
    (keyDownEvent) => {
      handleKeyDown({
        keyDownEvent,
        keyDownHandlerConfig: onEnter,
        predefinedHandler: () => {
          handleTokensCreate(inputValue);
        },
      });
    },
    [onEnter, inputValue, handleTokensCreate]
  );

  const handleEscapeKeyDown = useCallback(
    (keyDownEvent) => {
      handleKeyDown({
        keyDownEvent,
        keyDownHandlerConfig: onEscape,
        predefinedHandler: () => {
          // Reset the input value
          handleInputValueUpdate(inputInitValue);
        },
      });
    },
    [onEscape, inputInitValue, handleInputValueUpdate]
  );

  return {
    handleBackspaceKeyDown,
    handleTabKeyDown,
    handleEnterKeyDown,
    handleEscapeKeyDown,
  };
}

export default usePredefinedKeyDownHandlers;
