import React, { useCallback } from 'react';
import type { CSSProperties, FunctionComponent } from 'react';
import classNames from 'classnames';
import TokenCreator from './TokenCreator';
import Token from './Token';
import type { Props as TokenProps } from './Token';

import useTokenInputFocusEffect from './hooks/useTokenInputFocusEffect';
import useTokenCreatorRef from './hooks/useTokenCreatorRef';
import useTokensUpdate from './hooks/useTokensUpdate';
import useTokenEdit from './hooks/useTokenEdit';
import useTokenDelete from './hooks/useTokenDelete';

// Build-in default props
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

import type { TokenSeparator } from './types/mix';
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
import type { TokenValue } from './types/token';

type Props<ValueType, ErrorType> = {
  // Assign style to the TokenInput
  style?: CSSProperties;

  // Assign className to the TokenInput
  className?: string;

  // Specific TokenInput is `readOnly` or not
  readOnly?: boolean;

  // Specific TokenInput should be autoFocus or not
  autoFocus?: boolean;

  // Placeholder of TokenInput
  placeholder?: string;

  // The array of tokenValue of TokenInput
  tokenValues: TokenValue<ValueType>[];

  /**
   * TokenCreator props
   */

  /**
   * An array of characters to split the user input string into array.
   * For example,
   * Split the user input string `abc;def` into `['abc', 'def']`
   * by separators `[';']`
   *
   * Note:
   * It take the `String.prototype.split()` and `RegExp` to split the user input string.
   * Make sure your customized separators could be used with `RegExp`.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
   */
  separators?: TokenSeparator[];

  /**
   * [Beta; Might be change in the future version]
   * Current only apply to the `TokenCreator`
   *
   * The settings to control the behavior of specials keyDown's event handler.
   * Recommend to use the build-in constant `KEY_DOWN_HANDLER_CONFIG_OPTION` to config the setting.
   *
   * `KEY_DOWN_HANDLER_CONFIG_OPTION.OFF` means turn `off`
   * (Took native browser behavior. The TokenInput should NOT handle it).
   *
   * `KEY_DOWN_HANDLER_CONFIG_OPTION.ON` means apply TokenInput predefined event handler.
   *
   * Default setting as below.
   * specialKeyDown: {
   *   onBackspace: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
   *   onTab: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF,
   *   onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
   *   onEscape: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
   * },
   */
  specialKeyDown?: SpecialKeyDownConfig;

  /**
   * A callback function invoked when end-user typing but not become token yet
   *
   * onInputValueChange(newValue, previousValue)
   *
   * @ newValue
   * Type: InputString
   * Description: end-user's input string
   *
   * @ previousValue
   * Type: InputString
   * Description: previous end-user's input string
   */
  onInputValueChange?: OnInputValueChange;

  /**
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
   * onPreprocess(inputStringValues)
   *
   * @ inputStringValues
   * Type: InputString[]
   * Description:
   * The user input string values // (split by the `separators`)
   *
   * @ return
   * Type: InputString[]
   * Description: The values after preprocess
   */
  onPreprocess?: OnPreprocess;

  /**
   * A callback function to validate tokenValue
   *
   * onTokenValueValidate(tokenValue, tokenIndex, tokenValues)
   *
   * @ tokenValue
   * Type: any (string | number | object | customize data structure)
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenIndex
   * Type: number
   * Description: The array index of this tokenValue in tokenValues
   *
   * @ tokenValues
   * Type: array
   * Description: The array of tokenValue of TokenInput
   *
   * @ return
   * Type: any (string | number | object | customize data structure)
   * Description:
   * The customize error.
   * Specific the token's validate status or errorMessage.
   * Could be an error message to display or error object
   *
   * Will be use by `onGetTokenErrorMessage`
   */
  onTokenValueValidate?: OnTokenValueValidate<ValueType, ErrorType>;

  /**
   * Token props
   */

  /**
   * A callback function invoked when tokenValues update
   *
   * onTokenValuesChange(modifiedTokenValues)
   *
   * @ modifiedTokenValues
   * Type: TokenValue<ValueType>[]
   * Description: the new tokenValues
   */
  onTokenValuesChange?: OnTokenValuesChange<ValueType>;

  /**
   * A callback function to building `user input string value` into
   * the `tokenValue` (customize data structure).
   *
   * Note: You could make your normalize process in this function too.
   *
   * onBuildTokenValue(inputString)
   *
   * @ inputString
   * Type: InputString
   * Description: The user input value // (A value split by TokenSeparator[])
   *
   * @ return
   * Type: TokenValue<ValueType>
   * Description: customize data structure TokenValue
   */
  onBuildTokenValue?: OnBuildTokenValue<ValueType>;

  /**
   * A customize react functional component to rendering a token
   * Apply this to customize all token function.
   *
   * customizeTokenComponent={MyToken}
   */
  // TODO: make detail type for props
  customizeTokenComponent?: FunctionComponent<TokenProps<ValueType, ErrorType>>;

  /**
   * A callback function to getting customizes `className` to set on a `token`
   *
   * onGetTokenClassName(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: TokenValue<ValueType>
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Type: TokenMeta<ErrorType>
   * Description: token's meta data
   *
   * @ return
   * Type: string
   * Description: The customizes className
   */
  onGetTokenClassName?: OnGetTokenClassName<ValueType, ErrorType>;

  /**
   * A callback function to getting displayable `label` of a token
   * Apply this to customize the token's content
   * For example, render token with `icon` or `Additional text`
   *
   * onGetTokenDisplayLabel(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: TokenValue<ValueType>
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Type: TokenMeta<ErrorType>
   * Description: token's meta data
   *
   * @ return
   * Type: InputString | ReactNode
   * Description: The token's content.
   * By default, will apply `getDefaultTokenEditableValue`
   */
  onGetTokenDisplayLabel?: OnGetTokenDisplayLabel<ValueType, ErrorType>;

  /**
   * A callback function to render content of the delete button of token
   * Apply this to customize the token's content of the delete button
   * For example, replace the build-in `x` by Google font material-icons
   *
   * onRenderTokenDeleteButtonContent()
   *
   * @ return
   * Type: ReactNode
   * Description: The content of the delete button of the token.
   * By default, TokenInput render a build-in `x` icon
   */
  onRenderTokenDeleteButtonContent?: OnRenderTokenDeleteButtonContent;

  /**
   * A callback function to determine whether the token is `inline editable`.
   * By default, TokenInput will render a `inline editable` token.
   *
   * onGetIsTokenEditable(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: TokenValue<ValueType>
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Type: TokenMeta<ErrorType>
   * Description: token's meta data
   *
   * @ return
   * Type: boolean
   * Description: `true` if editable. `false` if not.
   */
  onGetIsTokenEditable?: OnGetIsTokenEditable<ValueType, ErrorType>;

  /**
   * A callback function to getting `string input value`
   * from `tokenValue` for the end-user to perform `inline edit`
   *
   * onGetTokenEditableValue(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: TokenValue<ValueType>
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Type: TokenMeta<ErrorType>
   * Description: token's meta data
   *
   * @ return
   * Type: InputString
   * Description: The value for end-user to `edit` in an input field
   */
  onGetTokenEditableValue?: OnGetTokenEditableValue<ValueType, ErrorType>;

  /**
   * A callback function to getting the error message from the customize error
   * The `customize error` is generate by `onTokenValueValidate`
   *
   * onGetTokenErrorMessage(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: TokenValue<ValueType>
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Type: TokenMeta<ErrorType>
   * Description: token's meta data
   *
   * @ return
   * Type: undefined | DefaultErrorType | ErrorType
   * Description: The error message to describe an invalid token
   */
  onGetTokenErrorMessage?: OnGetTokenErrorMessage<ValueType, ErrorType>;

  // TODO: Consider add more callback
  // onFocus
  // onBlur
};

const TokenInput = <ValueType, ErrorType>({
  className,
  readOnly = false,
  autoFocus = false,
  placeholder,

  tokenValues,

  /**
   * TokenCreator props
   */
  separators = DEFAULT_SEPARATORS,
  specialKeyDown = DEFAULT_SPECIAL_KEY_DOWN_CONFIG,

  onInputValueChange,
  onPreprocess,

  onTokenValueValidate = defaultTokenValueValidate,

  /**
   * Token props
   */

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

  // Rest
  ...props
}: Props<ValueType, ErrorType>) => {
  const { isTokenInputFocused, handleTokenInputFocus, handleTokenInputBlur } =
    useTokenInputFocusEffect();
  const { tokenCreatorRef, focusTokenCreator } = useTokenCreatorRef();

  const {
    hasInvalidToken,
    internalTokenValues,
    tokenMetas,
    setTokenActivated,
  } = useTokensUpdate({
    tokenValues,
    onTokenValueValidate,
  });

  /**
   * TODO: Handle cursor focus after end of editing (typing)
   * Support keyboard operator + selected of token
   */
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
    (appendTokenValues) => {
      if (appendTokenValues.length === 0) {
        // Avoid meaningless update
        return;
      }

      const newTokenValues = [...tokenValues, ...appendTokenValues];
      onTokenValuesChange?.(newTokenValues);
    },
    [tokenValues, onTokenValuesChange]
  );

  const handleInputValuesPreprocess = useCallback(
    (inputValues) => {
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
    [onPreprocess]
  );

  const TokenComponent = customizeTokenComponent || Token;

  return (
    <div
      data-component-name="TokenInput" // FIXME: This is a hack to get the component name.
      {...props}
      className={classNames(className, styles.container, {
        [styles['container--focused']]: isTokenInputFocused,
        [styles['container--errors']]: hasInvalidToken,
      })}
      onClick={focusTokenCreator}
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
          onFocus={handleTokenInputFocus}
          onBlur={handleTokenInputBlur}
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

export default TokenInput;
