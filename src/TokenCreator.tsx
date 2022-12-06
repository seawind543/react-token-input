import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
  useCallback,
} from 'react';
import AutosizeInput from 'react-input-autosize';

import keyDownHandlerProxy from './utils/keyDownHandlerProxy';
import usePredefinedKeyDownHandlers from './hooks/usePredefinedKeyDownHandlers';

import { DEFAULT_INPUT_INIT_VALUE } from './constants';

import styles from './styles.scss';

import type { InputString, TokenSeparator } from './types/mix';
import type { SpecialKeyDownConfig } from './types/specialKeyDown';
import type {
  OnInputValueChange,
  OnPreprocess,
  OnBuildTokenValue,
} from './types/interfaces';

/**
 * @typedef {Object} TokenCreatorRef
 */
export interface TokenCreatorRef {
  /**
   * @prop {HTMLInputElement['focus']} [focus]
   * @description
   * Set focus on TokenCreator
   *
   * @param {FocusOptions} options
   * The focus options
   *
   * @returns {void}
   */
  focus: HTMLInputElement['focus'];
}

/**
 * @template ValueType
 * @typedef {Object} TokenCreatorProps
 */
interface TokenCreatorProps<ValueType = string> {
  /**
   * @prop {string} [placeholder]
   * @description
   * Same as TokenInputProps {@see TokenInputProps[placeholder]}
   */
  placeholder?: string;

  /**
   * @prop {boolean} autoFocus
   * @description
   * Same as TokenInputProps {@see TokenInputProps[autoFocus]}
   */
  autoFocus: boolean;

  /**
   * @prop {React.FocusEventHandler<HTMLInputElement>} onFocus
   * @description
   * A callback function, which should be `called`
   * when end-user `focus` on the TokenCreator
   *
   * Note:
   * Call this function to tell TokenInput to set the `focused` CSS effect
   */
  onFocus: React.FocusEventHandler<HTMLInputElement>;

  /**
   * @prop {React.FocusEventHandler<HTMLInputElement>} onBlur
   * @description
   * A callback function, which should be `called`
   * when end-user `blur` on the TokenCreator
   *
   * Note:
   * Call this function to tell TokenInput to remove the `focused` CSS effect
   */
  onBlur: React.FocusEventHandler<HTMLInputElement>;

  /**
   * @prop {React.KeyboardEventHandler<HTMLInputElement>} onKeyDown
   * @description
   * A callback function, which should be `called`
   * when end-user `keyDown` on the TokenCreator
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;

  // Token

  /**
   * @prop {TokenSeparator[]} separators
   * @description
   * Same as TokenInputProps {@see TokenInputProps[separators]}
   */
  separators: TokenSeparator[];

  /**
   * @prop {SpecialKeyDownConfig} specialKeyDown
   * @description
   * Same as TokenInputProps {@see TokenInputProps[specialKeyDown]}
   */
  specialKeyDown: SpecialKeyDownConfig;

  /**
   * @prop {OnInputValueChange} [onInputValueChange]
   * @description
   * Same as TokenInputProps {@see TokenInputProps[specialKeyDown]}
   */
  onInputValueChange?: OnInputValueChange;

  /**
   * @prop {SpecialKeyDownConfig} onPreprocess
   * @description
   * Same as TokenInputProps {@see TokenInputProps[onPreprocess]}
   */
  onPreprocess: OnPreprocess;
  /**
   * @prop {OnBuildTokenValue<ValueType>} onBuildTokenValue
   * @description
   * Same as TokenInputProps {@see TokenInputProps[onBuildTokenValue]}
   */
  onBuildTokenValue: OnBuildTokenValue<ValueType>;

  /**
   * @prop {function} onNewTokenValuesAppend
   * @description
   * A callback function, which should be `called`
   * when want to append a new token to the end of the token list.
   *
   * @returns {void}
   */
  onNewTokenValuesAppend: (appendTokenValues: ValueType[]) => void;

  /**
   * @prop {function} onLastTokenDelete
   * @description
   * A callback function, which should be `called`
   * when want to `delete` the last token from the token list.
   *
   * @returns {void}
   */
  onLastTokenDelete: () => void;
}

const TokenCreator = <ValueType,>(
  props: TokenCreatorProps<ValueType>,
  ref: React.ForwardedRef<TokenCreatorRef>
) => {
  const {
    placeholder,
    autoFocus,
    onFocus,
    onBlur,
    onKeyDown,

    separators,
    specialKeyDown,
    onInputValueChange,
    onPreprocess,
    onBuildTokenValue,
    onNewTokenValuesAppend,
    onLastTokenDelete,
  } = props;
  // Cannot set AutosizeInput as ref, because it get error when ref={inputRef}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputRef = useRef<any>(null);

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

      onInputValueChange?.(newValue, inputValue);
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
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // console.log('TokenCreator > handleKeyDown');
      keyDownHandlerProxy(e, {
        onBackspace: handleBackspaceKeyDown,
        onTab: handleTabKeyDown,
        onEnter: handleEnterKeyDown,
        onEscape: handleEscapeKeyDown,
      });

      onKeyDown?.(e);
    },
    [
      onKeyDown,
      handleBackspaceKeyDown,
      handleTabKeyDown,
      handleEnterKeyDown,
      handleEscapeKeyDown,
    ]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      // console.log('TokenCreator > handleBlur');
      handleTokensCreate(inputValue);
      onBlur(e);
    },
    [handleTokensCreate, inputValue, onBlur]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      // console.log('TokenCreator > handlePaste');
      e.preventDefault();
      const pastedText = e.clipboardData.getData('text');
      handleTokensCreate(pastedText);
    },
    [handleTokensCreate]
  );

  useImperativeHandle(
    ref,
    () => ({
      focus: (options) => inputRef.current?.getInput().focus(options),
    }),
    []
  );

  return (
    <div className={styles['autosized-wrapper']}>
      <AutosizeInput
        ref={inputRef}
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
};

const WrappedTokenCreator = forwardRef(TokenCreator) as <ValueType = string>(
  p: TokenCreatorProps<ValueType> & {
    ref: React.ForwardedRef<TokenCreatorRef>;
  }
) => ReturnType<typeof TokenCreator>;
// Apply Type assertion to allow TypeScript type the generic type `ValueType`
// https://fettblog.eu/typescript-react-generic-forward-refs/

export default WrappedTokenCreator;
