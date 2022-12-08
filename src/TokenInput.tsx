import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  type CSSProperties,
  type ReactElement,
} from 'react';
import classNames from 'classnames';
import TokenCreator, { type TokenCreatorRef } from './TokenCreator';
import Token, { type TokenProps } from './Token';

import useTokenInputFocusEffect from './hooks/useTokenInputFocusEffect';
import useTokenCreatorRef from './hooks/useTokenCreatorRef';
import useTokensUpdate from './hooks/useTokensUpdate';
import useTokenEdit from './hooks/useTokenEdit';
import useTokenDelete from './hooks/useTokenDelete';

// The built-in default props
import defaultTokenValueValidate from './utils/defaultTokenValueValidate';
import defaultBuildTokenValue from './utils/defaultBuildTokenValue';
import defaultGetIsTokenEditable from './utils/defaultGetIsTokenEditable';
import defaultGetTokenEditableValue from './utils/defaultGetTokenEditableValue';
import defaultGetTokenErrorMessage from './utils/defaultGetTokenErrorMessage';

import {
  DEFAULT_SEPARATORS,
  DEFAULT_SPECIAL_KEY_DOWN_CONFIG,
} from './constants';

import styles from './styles.scss';

import type { InputString, TokenSeparator } from './types/mix';
import type { SpecialKeyDownConfig } from './types/specialKeyDown';
import type {
  OnInputValueChange,
  OnPreprocess,
  OnBuildTokenValue,
  OnTokenValueValidate,
  OnTokenValuesChange,
  OnGetTokenClassName,
  OnGetTokenDisplayLabel,
  OnRenderTokenDeleteButtonContent,
  OnGetIsTokenEditable,
  OnGetTokenEditableValue,
  OnGetTokenErrorMessage,
} from './types/interfaces';

/**
 * @typedef {Object} TokenInputRef
 */
export interface TokenInputRef {
  /**
   * @prop {TokenCreatorRef['focus']} focus
   * @description
   * Set focus on TokenCreator
   *
   * @example
   * ```js
   * tokenInputRef.current?.focus();
   * ```
   *
   * @param {FocusOptions} [options]
   * The focus options
   *
   * @returns {void}
   */
  focus: TokenCreatorRef['focus'];

  /**
   * @prop {TokenCreatorRef['setValue']} setCreatorValue
   * @description
   * Set value of TokenCreator
   *
   * @example
   * ```js
   * tokenInputRef.current?.setCreatorValue('example');
   * ```
   *
   * @param {InputString} value
   * The value to set
   *
   * @returns {void}
   */
  setCreatorValue: TokenCreatorRef['setValue'];

  /**
   * @prop {function} getCreatorValue
   * @description
   * Get value of TokenCreator
   *
   * @example
   * ```js
   * tokenInputRef.current?.getCreatorValue();
   * ```
   *
   * @returns {InputString}
   */
  getCreatorValue: () => InputString;

  /**
   * @prop {function} createTokens
   * @description
   * Trigger tokens create
   *
   * @param {InputString} [value]
   * The value for create tokens.
   * If undefined, then apply the value of TokenCreator directly.
   *
   * @returns {void}
   */
  createTokens: (value?: InputString) => void;
}

/**
 * @template VT, ErrorType
 * @typedef {Object} TokenInputProps
 */
export interface TokenInputProps<VT = string, ErrorType = string> {
  /**
   * @prop {CSSProperties} [style]
   * @description An optional prop, for assigning style to TokenInput
   */
  style?: CSSProperties;

  /**
   * @prop {string} [className]
   * @description An optional prop, for assigning class name to TokenInput
   */
  className?: string;

  /**
   * @prop {string} [placeholder]
   * @description An optional prop, for assigning placeholder to TokenInput
   */
  placeholder?: string;

  /**
   * @prop {boolean} [readOnly = false]
   * @description An optional prop, to control TokenInput is `readOnly mode`
   */
  readOnly?: boolean;

  /**
   * @prop {boolean} [disableCreateOnBlur]
   * @description An optional prop, to control TokenInput creates a new token when blurring on the creator
   */
  disableCreateOnBlur?: boolean;

  /**
   * @prop {boolean} [autoFocus = false]
   * @description
   * An optional prop, to control TokenInput is `autoFocus mode`.
   * Will be deprecated in the next major release. Took ref.current.focus() instead.
   */
  autoFocus?: boolean;

  /**
   * @template VT
   * @prop {VT[]} tokenValues
   * @description
   * The array of tokenValue of TokenInput.
   * This array will be used to render the tokens.
   *
   * Type: VT
   * Description:
   * Customize data structure data
   * Could be string | number | object | customized data structure...etc.
   */
  tokenValues: VT[];

  // TokenCreator props

  /**
   * @prop {TokenSeparator[]} [separators=DEFAULT_SEPARATORS]
   * @description
   * An array of characters to split the user input string into array.
   * For example,
   * Split the user input string `abc;def` into `['abc', 'def']`
   * by separators `[';']`
   *
   * @see {@link TokenSeparator}
   * @see DEFAULT_SEPARATORS for the default
   */
  separators?: TokenSeparator[];

  /**
   * @prop {SpecialKeyDownConfig} [specialKeyDown=DEFAULT_SPECIAL_KEY_DOWN_CONFIG]
   * @description
   * [Beta; Might be change in the future version]
   * Current only apply to the `TokenCreator`
   *
   * The settings to control the behavior of specials keyDown's event handler.
   * Recommend to use the built-in constant `KEY_DOWN_HANDLER_CONFIG_OPTION` to config the setting.
   *
   * @see KEY_DOWN_HANDLER_CONFIG_OPTION for the accepted config values
   * @see DEFAULT_SPECIAL_KEY_DOWN_CONFIG for the default settings
   */
  specialKeyDown?: SpecialKeyDownConfig;

  /**
   * @prop {OnInputValueChange} [onInputValueChange]
   * @description
   * A callback function invoked when end-user typing but not become token yet
   *
   * @example
   * ```js
   * onInputValueChange(newValue, previousValue)
   * ```
   *
   * @param {InputString} newValue
   * The end-user's input string
   *
   * @param {InputString} previousValue
   * The previous input string
   *
   * @returns {void}
   */
  onInputValueChange?: OnInputValueChange;

  /**
   * @prop {OnPreprocess} [onPreprocess]
   * @description
   * A callback function to `preprocessing` the user input string.
   *
   * Note: This function execute after `split by TokenSeparator[]` but before `onBuildTokenValue`
   * inputString -> spilt(inputString) -> preprocess(spilt(inputString)) -> onBuildTokenValue(preprocess(spilt(inputString)))
   *
   * [Use case 1]
   *  Make your normalize process in this function, such as `String.prototype.trim()`.
   *
   * [Use case 2]
   * Sometimes, we will want to auto-fit the user input, this function could help with it.
   * For example, the user input string is `www.google.com`,
   * and we want to auto-fit it into `http://www.google.com` and `https://www.google.com`.
   *
   * @example
   * ```js
   * onPreprocess(inputStringValues)
   * ```
   *
   * @param {InputString[]} inputStringValues
   * The user input string values
   * (An array of string, which split from the original input string via the `separators`)
   *
   * @returns {InputString[]}
   * An array of string
   */
  onPreprocess?: OnPreprocess;

  /**
   * @template VT, ErrorType
   * @prop {OnTokenValueValidate<VT, ErrorType>} [onTokenValueValidate=defaultTokenValueValidate]
   * @description
   * A callback function to validate a tokenValue
   * (The returned result will be set into the TokenMeta & pass to `onGetTokenErrorMessage`)
   *
   * @example
   * ```js
   * onTokenValueValidate(tokenValue, tokenIndex, tokenValues)
   * ```
   *
   * @param {VT} tokenValue
   * The tokenValue built by `onBuildTokenValue`
   *
   * @param {TokenIndex} tokenIndex
   * The array index of this tokenValue in tokenValues
   *
   * @param {VT[]} tokenValues
   * The array of tokenValue of TokenInput
   *
   * @returns {TokenMeta<ErrorType>['error']}
   * The customized error.
   * Specific the token's validate status or errorMessage.
   * Could be `an error message` to display, or an error object for further operations.
   *
   * @see TokenMeta for more information about TokenMeta<ErrorType>['error']
   *
   * Note: Return `Nullish` types means the token is valid.
   * @see Nullish
   */
  onTokenValueValidate?: OnTokenValueValidate<VT, ErrorType>;

  // Token related props

  /**
   * @template VT
   * @prop {OnTokenValuesChange<VT>} [onTokenValuesChange]
   * @description
   * A callback function invoked when tokenValues update
   *
   * @example
   * ```js
   * onTokenValuesChange(modifiedTokenValues)
   * ```
   *
   * @param {VT[]} modifiedTokenValues
   * The new tokenValues
   *
   * @returns {void}
   */
  onTokenValuesChange?: OnTokenValuesChange<VT>;

  /**
   * @template VT
   * @prop {OnBuildTokenValue<VT>} [onBuildTokenValue=defaultBuildTokenValue]
   * @description
   * A callback function to build `user input string value` into
   * the `tokenValue` (customized data structure).
   *
   * Note: You could make your normalize process in this function too.
   *
   * @example
   * ```js
   * onBuildTokenValue(inputString)
   * ```
   *
   * @param {InputString} inputString
   * The user input value // (A value split by TokenSeparator[])
   * Example:
   * - Input string "ABC, DEF" and separators is `,`
   * - The `onBuildTokenValue` will be called twice as
   * ```
   * onBuildTokenValue('ABC') and onBuildTokenValue('DEF')
   * ```
   *
   * @returns {VT}
   * The customized data structure data
   * Could be string | number | object | customized data structure...etc.
   */
  onBuildTokenValue?: OnBuildTokenValue<VT>;

  /**
   * @prop {Component} [customizeTokenComponent]
   * A customize react component to rendering a token
   * Apply this to customize all token function.
   *
   * @example
   * ```js
   * customizeTokenComponent={MyToken}
   * ```
   *
   * @returns {ReactElement | null}
   */
  customizeTokenComponent?: (
    props: TokenProps<VT, ErrorType>,
  ) => ReactElement | null;

  /**
   * @template VT, ErrorType
   * @prop {OnGetTokenClassName<VT, ErrorType>} [onGetTokenClassName]
   * @description
   * A callback function to getting customizes `className` to set on a `token`
   *
   * ```js
   * onGetTokenClassName(tokenValue, tokenMeta)
   * ```
   *
   * @param {VT} tokenValue
   * The tokenValue built by `onBuildTokenValue`
   *
   * @param {TokenMeta<ErrorType>} tokenMeta
   * The token's meta data
   *
   * @returns {undefined | string}
   * The customizes className
   */
  onGetTokenClassName?: OnGetTokenClassName<VT, ErrorType>;

  /**
   * @template VT, ErrorType
   * @prop  {OnGetTokenDisplayLabel<VT, ErrorType>} [onGetTokenDisplayLabel=defaultGetTokenEditableValue]
   * @description
   * A callback function to getting displayable `label` of a token
   * Apply this to customize the token's content
   * For example, render token with `icon` or `Additional text`
   *
   * @example
   * ```js
   * onGetTokenDisplayLabel(tokenValue, tokenMeta)
   * ```
   *
   * @param {VT} tokenValue
   * The tokenValue built by `onBuildTokenValue`
   *
   * @param {TokenMeta<ErrorType>} tokenMeta
   * The token's meta data
   *
   * @returns {InputString | ReactNode}
   * The token's display content.
   */
  onGetTokenDisplayLabel?: OnGetTokenDisplayLabel<VT, ErrorType>;

  /**
   * @prop {OnRenderTokenDeleteButtonContent} [onRenderTokenDeleteButtonContent]
   * @description
   * A callback function to render content of the delete button of token
   * Apply this to customize the token's content of the delete button.
   * For example, replace the built-in `x` by Google font material-icons
   *
   * @example
   * ```js
   * onRenderTokenDeleteButtonContent()
   * ```
   *
   * @returns {ReactNode}
   * The content of the delete button of the token.
   * By default, TokenInput render a built-in `x` icon
   */
  onRenderTokenDeleteButtonContent?: OnRenderTokenDeleteButtonContent;

  /**
   * @template VT, ErrorType
   * @prop {OnGetIsTokenEditable<VT, ErrorType>} [onGetIsTokenEditable=defaultGetIsTokenEditable]
   * @description
   * A callback function to determine whether the token is `inline editable`.
   *
   * @example
   * ```js
   * onGetIsTokenEditable(tokenValue, tokenMeta)
   * ```
   *
   * @param {VT} tokenValue
   * The tokenValue built by `onBuildTokenValue`
   *
   * @param {TokenMeta<ErrorType>} tokenMeta
   * The token's meta data
   *
   * @returns {boolean}
   * - `true`: Editable.
   * - `false`: Not editable.
   */
  onGetIsTokenEditable?: OnGetIsTokenEditable<VT, ErrorType>;

  /**
   * @template VT, ErrorType
   * @prop {OnGetTokenEditableValue<VT, ErrorType>} [onGetTokenEditableValue=defaultGetTokenEditableValue]
   * @description
   * A callback function to getting `string input value`
   * from `tokenValue` for the end-user to perform `inline edit`
   *
   * @example
   * ```js
   * onGetTokenEditableValue(tokenValue, tokenMeta)
   * ```
   *
   * @param {VT} tokenValue
   * The tokenValue built by `onBuildTokenValue`
   *
   * @param {TokenMeta<ErrorType>} tokenMeta
   * The token's meta data
   *
   * @returns {InputString}
   * The value for end-user to `edit` in an input field
   */
  onGetTokenEditableValue?: OnGetTokenEditableValue<VT, ErrorType>;

  /**
   * @template VT, ErrorType
   * @prop {OnGetTokenErrorMessage<VT, ErrorType>} [onGetTokenErrorMessage=defaultGetTokenErrorMessage]
   * @description
   * A callback function to getting the `Error Message` to
   * apply into the `title` attribute of the built-in Token Component
   *
   * @example
   * ```js
   * onGetTokenErrorMessage(tokenValue, tokenMeta)
   * ```
   *
   * @param {VT} tokenValue
   * The tokenValue built by `onBuildTokenValue`
   *
   * @param {TokenMeta<ErrorType>} tokenMeta
   * The token's meta data
   *
   * @returns {string | Nullish}
   * The `Error Message` of the token.
   * Return `string type` will let the built-in Token component apply the message
   * into the `title` attribute. Otherwise, will simply be ignored
   */
  onGetTokenErrorMessage?: OnGetTokenErrorMessage<VT, ErrorType>;

  /**
   * @prop {React.FocusEventHandler<HTMLInputElement>} [onCreatorFocus]
   * @description
   * A callback function invoked on TokenCreator focused
   *
   * @example
   * ```js
   * onCreatorFocus(e)
   * ```
   *
   * @param {React.FocusEvent<HTMLInputElement>} event
   * The FocusEvent of the input of TokenCreator
   *
   * @returns {void}
   */
  onCreatorFocus?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * @prop {React.FocusEventHandler<HTMLInputElement>} [onCreatorBlur]
   * @description
   * A callback function invoked on TokenCreator blur
   *
   * @example
   * ```js
   * onCreatorBlur(e)
   * ```
   *
   * @param {React.FocusEvent<HTMLInputElement>} event
   * The FocusEvent of the input of TokenCreator
   *
   * @returns {void}
   */
  onCreatorBlur?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * @prop {React.KeyboardEventHandler<HTMLInputElement>} [onCreatorKeyDown]
   * @description
   * A callback function invoked when keyDown on TokenCreator
   *
   * @example
   * ```js
   * onCreatorKeyDown(e)
   * ```
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   * The KeyboardEvent of the input of TokenCreator
   *
   * @returns {void}
   */
  onCreatorKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;

  // TODO: Consider add more callback
  // onFocus
  // onBlur
}

const TokenInput = <VT, ErrorType>(
  props: TokenInputProps<VT, ErrorType>,
  ref?: React.ForwardedRef<TokenInputRef>,
) => {
  const {
    className,
    placeholder,
    readOnly = false,
    autoFocus = false,
    disableCreateOnBlur,

    tokenValues,

    // TokenCreator props
    separators = DEFAULT_SEPARATORS,
    specialKeyDown = DEFAULT_SPECIAL_KEY_DOWN_CONFIG,

    onInputValueChange,
    onPreprocess,

    onTokenValueValidate = defaultTokenValueValidate,

    // Token props

    // FixMe: ReadOnly mode do not need onTokenValuesChange, but others need
    onTokenValuesChange,

    onBuildTokenValue = defaultBuildTokenValue,

    customizeTokenComponent,

    onGetTokenClassName,

    onGetTokenDisplayLabel = defaultGetTokenEditableValue,

    onRenderTokenDeleteButtonContent,

    onGetIsTokenEditable = defaultGetIsTokenEditable,

    onGetTokenEditableValue = defaultGetTokenEditableValue,

    onGetTokenErrorMessage = defaultGetTokenErrorMessage,

    onCreatorFocus,
    onCreatorBlur,
    onCreatorKeyDown,

    // Rest
    ...restProps
  } = props;

  const {
    isTokenInputFocused,
    handleTokenInputFocus,
    handleTokenInputBlur,
    handleCreatorFocus,
    handleCreatorBlur,
  } = useTokenInputFocusEffect({
    onCreatorFocus,
    onCreatorBlur,
  });
  const {
    tokenCreatorRef,
    focusTokenCreator,
    setCreatorValue,
    getCreatorValue,
    createTokens,
  } = useTokenCreatorRef();

  const {
    hasInvalidToken,
    internalTokenValues,
    tokenMetas,
    setTokenActivated,
  } = useTokensUpdate({
    tokenValues,
    onTokenValueValidate,
  });

  // TODO: Handle cursor focus after end of editing (typing)
  // Support keyboard operator + selected of token
  const { handleTokenEditStart, handleTokenEditEnd } = useTokenEdit({
    tokenValues,
    onTokenValuesChange,
    setTokenActivated,
    handleTokenInputFocus,
    handleTokenInputBlur,
  });

  const { handleTokenDelete, handleLastTokenDelete } = useTokenDelete({
    tokenValues,
    onTokenValuesChange,
    focusTokenCreator,
  });

  const handleNewTokenValuesAppend = useCallback(
    (appendTokenValues: VT[]) => {
      if (appendTokenValues.length === 0) {
        // Avoid meaningless update
        return;
      }

      const newTokenValues = [...tokenValues, ...appendTokenValues];
      onTokenValuesChange?.(newTokenValues);
    },
    [tokenValues, onTokenValuesChange],
  );

  const handleInputValuesPreprocess = useCallback(
    (inputValues: InputString[]) => {
      // console.log('handleInputValuesPreprocess', inputValues);
      if (typeof onPreprocess !== 'function') {
        return inputValues;
      }

      const processedValues = onPreprocess(inputValues);
      if (Array.isArray(processedValues) !== true) {
        throw new Error('onPreprocess should return an array of values');
      }
      return processedValues;
    },
    [onPreprocess],
  );

  const handleClick = useCallback(
    () => focusTokenCreator(),
    [focusTokenCreator],
  );

  const TokenComponent = customizeTokenComponent || Token;

  useImperativeHandle(
    ref,
    () => ({
      focus: focusTokenCreator,
      setCreatorValue,
      getCreatorValue,
      createTokens,
    }),
    [focusTokenCreator, setCreatorValue, getCreatorValue, createTokens],
  );

  return (
    <div
      data-component-name="TokenInput" // FIXME: This is a hack to get the component name.
      {...restProps}
      className={classNames(className, styles.container, {
        [styles['container--focused']]: isTokenInputFocused,
        [styles['container--errors']]: hasInvalidToken,
      })}
      onClick={handleClick}
      role="presentation"
    >
      <div className={styles['token-list']}>
        {internalTokenValues.map((tokenValue, index) => {
          const tokenMeta = tokenMetas[index];
          const { key } = tokenMeta;

          return (
            <TokenComponent
              key={key}
              readOnly={readOnly}
              tokenValue={tokenValue}
              tokenMeta={tokenMeta}
              onGetClassName={onGetTokenClassName}
              onGetDisplayLabel={onGetTokenDisplayLabel}
              onRenderDeleteButtonContent={onRenderTokenDeleteButtonContent}
              onGetIsEditable={onGetIsTokenEditable}
              onGetEditableValue={onGetTokenEditableValue}
              onGetErrorMessage={onGetTokenErrorMessage}
              onBuildTokenValue={onBuildTokenValue}
              onEditStart={handleTokenEditStart(index)}
              onEditEnd={handleTokenEditEnd(index)}
              onDelete={handleTokenDelete(index)}
            />
          );
        })}
      </div>

      {!readOnly && (
        <TokenCreator
          ref={tokenCreatorRef}
          placeholder={placeholder}
          autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
          disableCreateOnBlur={disableCreateOnBlur}
          onFocus={handleCreatorFocus}
          onBlur={handleCreatorBlur}
          onKeyDown={onCreatorKeyDown}
          separators={separators}
          specialKeyDown={specialKeyDown}
          onInputValueChange={onInputValueChange}
          onPreprocess={handleInputValuesPreprocess}
          onBuildTokenValue={onBuildTokenValue}
          onNewTokenValuesAppend={handleNewTokenValuesAppend}
          onLastTokenDelete={handleLastTokenDelete}
        />
      )}
    </div>
  );
};

const WrappedTokenInput = forwardRef(TokenInput) as <
  VT = string,
  ErrorType = string,
>(
  p: TokenInputProps<VT, ErrorType> & {
    ref?: React.ForwardedRef<TokenInputRef>;
  },
) => ReturnType<typeof TokenInput>;
// Apply Type assertion to allow TypeScript type the generic type `VT` and `ErrorType`
// https://fettblog.eu/typescript-react-generic-forward-refs/

export default WrappedTokenInput;
