import React, { useState, useMemo, useCallback, forwardRef } from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';
import keyDownHandlerProxy from './utils/keyDownHandlerProxy';

import usePredefinedKeyDownHandlers from './hooks/usePredefinedKeyDownHandlers';

import { DEFAULT_INPUT_INIT_VALUE } from './constants';

import styles from './styles.styl';

const TokenCreator = forwardRef((props, ref) => {
  const {
    placeholder,
    autoFocus,
    onFocus,
    onBlur,

    separators,
    specialKeyDown,
    onInputValueChange,
    onPreprocess,
    onBuildTokenValue,
    onNewTokenValuesAppend,
    onLastTokenDelete,
  } = props;
  const [inputValue, setInputValue] = useState(DEFAULT_INPUT_INIT_VALUE);

  const splitPattens = useMemo(
    () => new RegExp(separators.join('|')),
    [separators]
  );

  const handleInputValueUpdate = useCallback(
    (newValue) => {
      // console.log(
      //   'handleInputValueUpdate; newValue',
      //   `${newValue}`,
      //   'previousValue',
      //   `${inputValue}`
      // );
      setInputValue(newValue);
      onInputValueChange(newValue, inputValue);
    },
    [onInputValueChange, inputValue, setInputValue]
  );

  const handleTokensCreate = useCallback(
    (inputString) => {
      // console.log('handleTokensCreate', `${inputString}`);

      /**
       * Do not change inputString by `trim`.
       * Leave customize to decide how to handle the blank.
       * Note: The trim could be handled by either `onPreprocess` or `onBuildTokenValue`
       */
      if (inputString.trim().length === 0) {
        // Skip the empty
        return;
      }

      // Split string into values by `separators`
      const inputValues = inputString
        .split(splitPattens)
        // Filter out empty
        .filter((inputValue) => inputValue.trim().length > 0);
      const processedValues = onPreprocess(inputValues);
      const appendTokenValues = processedValues.map((value) => {
        return onBuildTokenValue(value);
      });
      onNewTokenValuesAppend(appendTokenValues);

      // Rest the input value after token created
      handleInputValueUpdate(DEFAULT_INPUT_INIT_VALUE);
    },
    [
      splitPattens,
      onPreprocess,
      onBuildTokenValue,
      onNewTokenValuesAppend,
      handleInputValueUpdate,
    ]
  );

  /*
   * Event handlers
   */
  const handleInputValueChange = useCallback(
    (e) => {
      // console.log('TokenCreator > handleInputValueChange');
      const { value: newInputValue } = e.target;
      const lastChar = newInputValue.substring(newInputValue.length - 1);

      const isTypingSeparators = splitPattens.test(lastChar);
      if (isTypingSeparators === true) {
        // User input a `Separator`, so create a token
        handleTokensCreate(inputValue);
        return;
      }

      handleInputValueUpdate(newInputValue);
    },
    [splitPattens, handleTokensCreate, inputValue, handleInputValueUpdate]
  );

  const { handleBackspaceKeyDown, handleEnterKeyDown, handleEscapeKeyDown } =
    usePredefinedKeyDownHandlers({
      specialKeyDown,
      inputInitValue: DEFAULT_INPUT_INIT_VALUE,
      inputValue,
      onLastTokenDelete,
      handleInputValueUpdate,
      handleTokensCreate,
    });

  const handleKeyDown = useCallback(
    (e) => {
      // console.log('TokenCreator > handleKeyDown');
      keyDownHandlerProxy(e, {
        onBackspace: handleBackspaceKeyDown,
        onEnter: handleEnterKeyDown,
        onEscape: handleEscapeKeyDown,
      });
    },
    [handleBackspaceKeyDown, handleEnterKeyDown, handleEscapeKeyDown]
  );

  const handleBlur = useCallback(
    (e) => {
      // console.log('TokenCreator > handleBlur');
      handleTokensCreate(inputValue);
      onBlur(e);
    },
    [handleTokensCreate, inputValue, onBlur]
  );

  const handlePaste = useCallback(
    (e) => {
      // console.log('TokenCreator > handlePaste');
      e.preventDefault();
      const pastedText = e.clipboardData.getData('text');
      handleTokensCreate(pastedText);
    },
    [handleTokensCreate]
  );

  return (
    <div className={styles['autosized-wrapper']}>
      <AutosizeInput
        ref={ref}
        autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputValueChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onFocus={onFocus}
        onBlur={handleBlur}
      />
    </div>
  );
});

/**
 * Fix the eslint 'react/display-name' issue with forwardRef
 * https://stackoverflow.com/questions/59716140/using-forwardref-with-proptypes-and-eslint
 */
TokenCreator.displayName = 'TokenCreator';

TokenCreator.propTypes = {
  placeholder: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,

  /**
   * Token
   */
  separators: PropTypes.array.isRequired,
  specialKeyDown: PropTypes.object.isRequired,

  onInputValueChange: PropTypes.func.isRequired,
  onPreprocess: PropTypes.func.isRequired,
  onBuildTokenValue: PropTypes.func.isRequired,
  onNewTokenValuesAppend: PropTypes.func.isRequired,
  onLastTokenDelete: PropTypes.func.isRequired,
};

export default TokenCreator;
