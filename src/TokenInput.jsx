import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TokenCreator from './TokenCreator.tsx';
import Token from './Token/index.ts';

import useTokenInputFocusEffect from './hooks/useTokenInputFocusEffect.ts';
import useTokenCreatorRef from './hooks/useTokenCreatorRef.ts';
import useTokensUpdate from './hooks/useTokensUpdate.ts';
import useTokenEdit from './hooks/useTokenEdit.ts';
import useTokenDelete from './hooks/useTokenDelete.ts';

import dummyFunction from './utils/dummyFunction.ts';
import buildDefaultTokenValue from './utils/buildDefaultTokenValue.ts';
import getDefaultTokenEditableValue from './utils/getDefaultTokenEditableValue.ts';
import getDefaultTokenErrorMessage from './utils/getDefaultTokenErrorMessage.ts';

import { DEFAULT_SEPARATORS } from './constants.ts';

import styles from './styles.scss';

const TokenInput = ({
  className,
  readOnly,
  autoFocus,
  placeholder,

  tokenValues,
  onTokenValuesChange,
  onBuildTokenValue,

  // Token
  customizeTokenComponent,
  onGetTokenClassName,
  onGetTokenDisplayLabel,
  onRenderTokenDeleteButtonContent,
  onIsTokenEditable,
  onGetTokenEditableValue,
  onGetTokenErrorMessage,

  // TokenCreator
  separators,
  specialKeyDown,
  onPreprocess,
  onInputValueChange,
  onTokenValueValidate,

  // Rest
  ...props
}) => {
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
      onTokenValuesChange(newTokenValues);
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
              onIsEditable={onIsTokenEditable}
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

TokenInput.propTypes = {
  // Assign style to the TokenInput
  style: PropTypes.object,

  // Assign className to the TokenInput
  className: PropTypes.string,

  // Specific TokenInput is `readOnly` or not
  readOnly: PropTypes.bool,

  // Specific TokenInput should be autoFocus or not
  autoFocus: PropTypes.bool,

  // Placeholder of TokenInput
  placeholder: PropTypes.string,

  /**
   * An array of characters for split the user input string.
   * For example,
   * Split the user input string `abc;def` into `['abc', 'def']`
   * by separators `[';']`
   *
   * Note:
   * It take the `String.prototype.split()` and `RegExp` to split the user input string.
   * Make sure your customized separators could be used with `RegExp`.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
   */
  separators: PropTypes.array,

  // [Required] An array of tokenValue of TokenInput
  tokenValues: PropTypes.array.isRequired,

  /**
   * A callback function invoked when tokenValues update
   *
   * onTokenValuesChange(modifiedTokenValues)
   *
   * @ modifiedTokenValues
   * Type: An array of tokenValue of TokenInput
   * Description: Updated tokenValues
   */
  onTokenValuesChange: PropTypes.func,

  /**
   * A callback function for preprocessing the user input string
   * (after it is split into `array of value`).
   *
   * Note: This function execute after `split` but before `onBuildTokenValue`
   *
   * [Use case 1]
   *  Make your normalize process in this function, such as `String.prototype.trim()`.
   *
   * [Use case 2]
   * Sometimes, we will want to auto-fit user input, this function could help with it.
   * For example, the user input string is `www.google.com`,
   * and we want to auto-fit it into `http://www.google.com` and `https://www.google.com`.
   *
   *
   * onPreprocess(inputStringValues)
   *
   * @ inputStringValues
   * Type: An array of string values
   * Description:
   * The user input string values // (split from the user input string by the `separators`)
   *
   * @ return
   * Type: An array of string values
   * Description: The values after preprocess
   */
  onPreprocess: PropTypes.func,

  /**
   * A callback function for building `user input string value` into
   * the `tokenValue` (customize data structure).
   *
   * Note: You could make your normalize process in this function too.
   *
   * onBuildTokenValue(stringValue)
   *
   * @ stringValue
   * Type: string
   * Description: The user input value // (A value split by separators)
   *
   * @ return
   * Type: any (string | number | object | customize data structure)
   * Description: customize data structure
   */
  onBuildTokenValue: PropTypes.func,

  /**
   * A callback function invoked when end-user typing but not become token yet
   *
   * onInputValueChange(newValue, previousValue)
   *
   * @ newValue
   * Type: string
   * Description: end-user input string
   *
   * @ previousValue
   * Type: string
   * Description: previous end-user input string
   */
  onInputValueChange: PropTypes.func,

  /**
   * A callback function for validate tokenValue
   *
   * onTokenValueValidate(tokenValue, tokenIndex, tokenValues)
   *
   * @ tokenValue
   * Type: any (string | number | object | customize data structure)
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenIndex
   * Type: number
   * Description: The array index for this tokenValue in tokenValues
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
  onTokenValueValidate: PropTypes.func,

  /**
   * A callback function for getting customizes `className` for a token
   *
   * onGetTokenClassName(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: any (string | number | object | customize data structure)
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Description: token's meta data
   *  {
   *    // A private key for render
   *    key: string,
   *
   *    // Specific the token is activated for `edit` or not
   *    activated: boolean,
   *
   *    // Customize data structure built by `onTokenValue Validate`
   *    // Specific the token's validate status or errorMessage
   *    error: any,
   *  }
   *
   * @ return
   * Type: string
   * Description: The customizes className
   */
  onGetTokenClassName: PropTypes.func,

  /**
   * A callback function for getting displayable `label` for a token
   * Apply this to customize the token's content
   * For example, render token with `icon` or `Additional text`
   *
   * onGetTokenDisplayLabel(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: any (string | number | object | customize data structure)
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Description: token's meta data
   *  {
   *    // A private key for render
   *    key: string,
   *
   *    // Specific the token is activated for `edit` or not
   *    activated: boolean,
   *
   *    // Customize data structure built by `onTokenValue Validate`
   *    // Specific the token's validate status or errorMessage
   *    error: any,
   *  }
   *
   * @ return
   * Type: string || react node
   * Description: The token's content.
   * By default, will apply `getDefaultTokenEditableValue`
   */
  onGetTokenDisplayLabel: PropTypes.func,

  /**
   * A callback function for render content of the delete button for a token
   * Apply this to customize the token's content of delete button
   * For example, replace the build-in x by Google font material-icons
   *
   * onRenderTokenDeleteButtonContent()
   *
   * @ return
   * Type: react node
   * Description: The content of the delete button of the token.
   * By default, TokenInput render a build-in x icon
   */
  onRenderTokenDeleteButtonContent: PropTypes.func,

  /**
   * A callback function for determine whether the token is inline editable.
   *
   * onIsTokenEditable(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: any (string | number | object | customize data structure)
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Description: token's meta data
   *  {
   *    // A private key for render
   *    key: string,
   *
   *    // Specific the token is activated for `edit` or not
   *    activated: boolean,
   *
   *    // Customize data structure built by `onTokenValue Validate`
   *    // Specific the token's validate status or errorMessage
   *    error: any,
   *  }
   *
   * @ return
   * Type: boolean
   * Description: `true` if editable. `false` if not.
   */
  onIsTokenEditable: PropTypes.func,

  /**
   * A callback function for getting `string input value`
   * from `tokenValue` for the end-user to perform `edit`
   *
   * onGetTokenEditableValue(tokenValue)
   *
   * @ tokenValue
   * Type: any (string | number | object | customize data structure)
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ return
   * Type: string
   * Description: The value for end-user to `edit` in an input field
   */
  onGetTokenEditableValue: PropTypes.func,

  /**
   * A callback function for getting the error message from the customize error
   * The `customize error` is generate by `onTokenValueValidate`
   *
   * onGetTokenErrorMessage(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: any (string | number | object | customize data structure)
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Description: token's meta data
   *  {
   *    // A private key for render
   *    key: string,
   *
   *    // Specific the token is activated for `edit` or not
   *    activated: boolean,
   *
   *    // Customize data structure built by `onTokenValue Validate`
   *    // Specific the token's validate status or errorMessage
   *    error: any,
   *  }
   *
   * @ return
   * Type: string | any
   * Description: The error message to describe an invalid token
   */
  onGetTokenErrorMessage: PropTypes.func,

  /**
   * A customize react functional component for rendering a token
   * Apply this to customize all token function.
   *
   * customizeTokenComponent={MyToken}
   */
  customizeTokenComponent: PropTypes.func,

  /**
   * [Beta; Might be change in the future version]
   * Current only apply to Token Create
   *
   * The settings to control the behavior of specials keyDown's event handler.
   * Recommend to use the build-in constant `KEY_DOWN_HANDLER_CONFIG_OPTION` to config the setting.
   *
   * `KEY_DOWN_HANDLER_CONFIG_OPTION.OFF` means turn off (Took native browser behavior. TokenInput should NOT handle it).
   * `KEY_DOWN_HANDLER_CONFIG_OPTION.ON` means apply TokenInput predefined event handler.
   *
   * Default setting as below.
   * specialKeyDown: {
   *   onBackspace: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
   *   onTab: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF,
   *   onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
   *   onEscape: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
   * },
   *
   * Reference section below for Predefined event handlers.
   * `Predefined KeyDown Event Handlers`
   */
  specialKeyDown: PropTypes.object,
};

TokenInput.defaultProps = {
  className: '',
  readOnly: false,
  autoFocus: false,
  placeholder: '',

  // TokenCreator
  separators: DEFAULT_SEPARATORS,
  specialKeyDown: {
    onBackspace: 1,
    onTab: 0,
    onEnter: 1,
    onEscape: 1,
  },

  onBuildTokenValue: buildDefaultTokenValue,
  onInputValueChange: dummyFunction,
  onTokenValueValidate: dummyFunction,

  // FixMe: ReadOnly mode do not need onTokenValuesChange, but for others need
  onTokenValuesChange: dummyFunction,

  // Token
  onGetTokenClassName: dummyFunction,
  onGetTokenDisplayLabel: getDefaultTokenEditableValue,
  onIsTokenEditable: () => true,
  onGetTokenEditableValue: getDefaultTokenEditableValue,
  onGetTokenErrorMessage: getDefaultTokenErrorMessage,

  // TODO: Consider add more callback
  // onFocus
  // onBlur
};

export default TokenInput;
