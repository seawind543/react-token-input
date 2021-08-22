import { useCallback } from 'react';
import { DEFAULT_SPECIAL_KEY_DOWN_SETTINGS } from '../constants';

const handleKeyDown = ({ keyDownEvent, onKey, predefinedHandler }) => {
  switch (true) {
    case onKey === 1:
      predefinedHandler(keyDownEvent);
      break;

    // case onKey === 0:
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
    ...DEFAULT_SPECIAL_KEY_DOWN_SETTINGS,
    ...specialKeyDown,
  };
  const handleBackspaceKeyDown = useCallback(
    (keyDownEvent) => {
      handleKeyDown({
        keyDownEvent,
        onKey: onBackspace,
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
        onKey: onTab,
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
        onKey: onEnter,
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
        onKey: onEscape,
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
