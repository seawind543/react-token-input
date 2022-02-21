import React, { useState, useMemo, useCallback, forwardRef } from 'react';
import AutosizeInput from 'react-input-autosize';

import keyDownHandlerProxy from './utils/keyDownHandlerProxy';
import usePredefinedKeyDownHandlers from './hooks/usePredefinedKeyDownHandlers';

import { DEFAULT_INPUT_INIT_VALUE } from './constants';

import styles from './styles.scss';

import type {
  HandleTokenInputFocus,
  HandleTokenInputBlur,
} from './hooks/useTokenInputFocusEffect';

import type { InputString, TokenSeparator } from './types/mix';
import type { SpecialKeyDownConfig } from './types/specialKeyDown';
import type { TokenValue } from './types/token';
import type {
  OnInputValueChange,
  OnPreprocess,
  OnBuildTokenValue,
} from './types/interfaces';

type Props<ValueType> = {
  placeholder: string;
  autoFocus: boolean;
  onFocus: HandleTokenInputFocus;
  onBlur: HandleTokenInputBlur;

  /**
   * Token
   */
  separators: TokenSeparator[];
  specialKeyDown: SpecialKeyDownConfig;

  onInputValueChange: OnInputValueChange;
  onPreprocess: OnPreprocess;
  onBuildTokenValue: OnBuildTokenValue<ValueType>;
  onNewTokenValuesAppend: (appendTokenValues: TokenValue<ValueType>[]) => void;
  onLastTokenDelete: () => void;
};

const TokenCreator = forwardRef(function TokenCreator<ValueType>(
  props: Props<ValueType>,

  // Cannot set AutosizeInput as ref, because it get error when ref={ref}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.Ref<any>
) {
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
    (newValue: InputString) => {
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
    (inputString: InputString) => {
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
        .filter((value) => value.trim().length > 0);
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

  const {
    handleBackspaceKeyDown,
    handleTabKeyDown,
    handleEnterKeyDown,
    handleEscapeKeyDown,
  } = usePredefinedKeyDownHandlers({
    specialKeyDownConfig: specialKeyDown,
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
        onTab: handleTabKeyDown,
        onEnter: handleEnterKeyDown,
        onEscape: handleEscapeKeyDown,
      });
    },
    [
      handleBackspaceKeyDown,
      handleTabKeyDown,
      handleEnterKeyDown,
      handleEscapeKeyDown,
    ]
  );

  const handleBlur = useCallback(() => {
    // console.log('TokenCreator > handleBlur');
    handleTokensCreate(inputValue);
    onBlur();
  }, [handleTokensCreate, inputValue, onBlur]);

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
}) as <ValueType>(
  p: Props<ValueType> & { ref: React.Ref<HTMLInputElement> }
) => React.ReactElement | null;

export default TokenCreator;
