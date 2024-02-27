import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import classNames from 'classnames';
import AutosizeInput from 'react-input-autosize';
import keyDownHandlerProxy from '../utils/keyDownHandlerProxy';

import DeleteButton from './DeleteButton';

import {
  DEFAULT_INPUT_INIT_VALUE,
  JS__TOKEN__DELETE_BUTTON__CLASS_NAME,
} from '../constants';

import styles from '../styles.scss';

import type { TokenMeta } from '../types/token';
import type {
  OnBuildTokenValue,
  OnGetTokenClassName,
  OnGetTokenDisplayLabel,
  OnRenderTokenDeleteButtonContent,
  OnGetIsTokenEditable,
  OnGetTokenEditableValue,
  OnGetTokenErrorMessage,
} from '../types/interfaces';

const handleInlineEditClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

/**
 * @template VT, ET
 * @typedef {Object} TokenProps
 */
export interface TokenProps<VT = string, ET = string> {
  /**
   * @prop {boolean} readOnly
   * @description
   * Same as TokenInputProps {@see TokenInputProps['readOnly']}
   */
  readOnly: boolean;

  /**
   * @type {VT}
   * @description This token's tokenValue
   */
  tokenValue: VT;

  /**
   * @template ET
   * @type {TokenMeta<ET>} tokenMeta
   * @description This token's meta data
   */
  tokenMeta: TokenMeta<ET>;

  /**
   * @template VT, ET
   * @prop {OnGetTokenClassName<VT, ET>} [onGetClassName]
   * @description
   * Same as TokenInputProps {@see TokenInputProps['onGetTokenClassName']}
   */
  onGetClassName?: OnGetTokenClassName<VT, ET>;

  /**
   * @template VT, ET
   * @prop  {OnGetTokenDisplayLabel<VT, ET>} [onGetTokenDisplayLabel=defaultGetTokenEditableValue]
   * @description
   * Same as TokenInputProps {@see TokenInputProps['onGetTokenDisplayLabel']}
   */
  onGetDisplayLabel: OnGetTokenDisplayLabel<VT, ET>;

  /**
   * @callback OnRenderTokenDeleteButtonContent
   * @description
   * Same as TokenInputProps {@see TokenInputProps['onRenderTokenDeleteButtonContent']}
   */
  onRenderDeleteButtonContent?: OnRenderTokenDeleteButtonContent;

  /**
   * @template VT, ET
   * @callback OnGetIsTokenEditable
   * @description
   * Same as TokenInputProps {@see TokenInputProps['onGetIsTokenEditable']}
   */
  onGetIsEditable: OnGetIsTokenEditable<VT, ET>;

  /**
   * @template VT, ET
   * @callback OnGetTokenEditableValue
   * @description
   * Same as TokenInputProps {@see TokenInputProps['onGetTokenEditableValue']}
   */
  onGetEditableValue: OnGetTokenEditableValue<VT, ET>;

  /**
   * @template VT
   * @callback OnBuildTokenValue
   * @description
   * Same as TokenInputProps {@see TokenInputProps['onBuildTokenValue']}
   */
  onBuildTokenValue: OnBuildTokenValue<VT>;

  /**
   * @template VT, ET
   * @callback OnGetTokenErrorMessage
   * @description
   * Same as TokenInputProps {@see TokenInputProps['onGetTokenErrorMessage']}
   */
  onGetErrorMessage: OnGetTokenErrorMessage<VT, ET>;

  /**
   * @callback
   * @description
   * A callback function, which you should `call`
   * when the end-user `start editing`
   *
   * Note:
   * Call this function to tell TokenInput it is start to editing the token.
   * As result, TokenInput will set `tokenMeta.activate` to `true`
   *
   * @example
   * ```js
   * onEditStart()
   * ```
   *
   * @returns {void}
   */
  onEditStart: () => void;

  /**
   * @callback
   * @description
   * A callback function, which you should `call`
   * when end-user `end the edit`
   *
   * Note:
   * Call this function to tell TokenInput to finish the `editing` of the token.
   * As result, TokenInput will set `tokenMeta.activate` to `false`.
   *
   * Also, TokenInput will based on the value of the parameter newTokenValue to
   * update the tokenValue of the token,
   * and call the callback `onTokenValuesChange`
   *
   * @example
   * ```js
   * onEditEnd(newTokenValue);
   * // or
   * onEditEnd();
   * ```
   *
   * @param {VT} [newTokenValue]
   * The new tokenValue built by `onBuildTokenValue.
   *
   * Note:
   * if `newTokenValue` is `undefined`,
   * TokenInput will treat as `Cancel` (Edit will end without update the tokenValue).
   * The callback `onTokenValuesChange` will also not be called.
   *
   * @returns {void}
   */
  onEditEnd: (newTokenValue?: VT) => void;

  /**
   * @callback
   * @description
   * A callback function, which you should `call`
   * when the end-user `delete` the token
   *
   * Note:
   * Call this function to tell TokenInput to delete the token.
   * As result, TokenInput will remove the token,
   * and call `onTokenValuesChange` to update tokenValues.
   *
   * @example
   * ```js
   * onDelete()
   * ```
   *
   * @returns {void}
   */
  onDelete: () => void;
}

const Token = <VT = string, ET = string>(props: TokenProps<VT, ET>) => {
  const {
    readOnly,
    tokenValue,
    tokenMeta,
    onGetClassName,
    onGetDisplayLabel,
    onRenderDeleteButtonContent,
    onGetIsEditable,
    onGetEditableValue,
    onGetErrorMessage,
    onBuildTokenValue,
    onEditStart,
    onEditEnd,
    onDelete,
  } = props;

  // Cannot set AutosizeInput as ref, because it get error when ref={autosizeInputRef}
  const autosizeInputRef = useRef(null);

  const [inputValue, setInputValue] = useState(DEFAULT_INPUT_INIT_VALUE);
  const { activated, error } = tokenMeta;
  const isEditable = useMemo(() => {
    return onGetIsEditable(tokenValue, tokenMeta);
  }, [onGetIsEditable, tokenValue, tokenMeta]);

  const handleEditStart = useCallback(() => {
    const tokenEditableValue = onGetEditableValue(tokenValue, tokenMeta);
    setInputValue(tokenEditableValue);
    onEditStart();
  }, [setInputValue, tokenValue, tokenMeta, onGetEditableValue, onEditStart]);
  useEffect(() => {
    const autosizeInput = autosizeInputRef.current;
    if (activated && autosizeInput) {
      // cast never type to AutosizeInput
      (autosizeInput as AutosizeInput).getInput().focus();
      // autosizeInputRef.current?.getInput().focus();
    }
  }, [activated]);

  const handleEditEnd = useCallback(
    ({ reset = false } = {}) => {
      // Handle input inputValue length === 0 case: Rest token
      const isValueClear = inputValue.length === 0;
      if (reset || isValueClear) {
        onEditEnd();
        return;
      }

      // TODO: Handle inputValue include `separators`

      const newTokenValue = onBuildTokenValue(inputValue);
      onEditEnd(newTokenValue);
    },
    [inputValue, onBuildTokenValue, onEditEnd],
  );

  /*
   * Event handlers
   */
  const handleTokenClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // console.log('handleTokenClick');
      e.stopPropagation();

      if (readOnly) {
        return;
      }

      // Check does the click on the delete button
      // That is, the Element or its parents matched the `selector`
      const isOnDeleteButton = !!(e.target as Element).closest(
        `.${styles.token} .${JS__TOKEN__DELETE_BUTTON__CLASS_NAME}`,
      );
      if (isOnDeleteButton) {
        onDelete();
        return;
      }

      if (isEditable) {
        handleEditStart();
      }
    },
    [readOnly, isEditable, onDelete, handleEditStart],
  );

  const handleInputValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInputValue(value);
    },
    [setInputValue],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      keyDownHandlerProxy(e, {
        onEscape: () => handleEditEnd({ reset: true }),
        onEnter: () => handleEditEnd(),
      });
    },
    [handleEditEnd],
  );

  const handleBlur = useCallback(() => {
    // console.log('Token handleBlur');
    handleEditEnd();
  }, [handleEditEnd]);

  const tokenClassName = useMemo(() => {
    return classNames(
      // Apply customize className on the token
      onGetClassName?.(tokenValue, tokenMeta),
      styles.token,
      {
        [styles['token--read-only']]: readOnly,
        [styles['token--editable']]: isEditable && !readOnly,
        [styles['token--active']]: activated,
        [styles['token--error']]: error && !activated,
      },
    );
  }, [
    onGetClassName,
    readOnly,
    isEditable,
    activated,
    error,
    tokenValue,
    tokenMeta,
  ]);

  const errorMessage = useMemo(() => {
    const tokenError = onGetErrorMessage(tokenValue, tokenMeta);
    // Avoid set non-string into `title`
    return typeof tokenError === 'string' ? tokenError : undefined;
  }, [onGetErrorMessage, tokenValue, tokenMeta]);

  if (activated) {
    return (
      <div
        data-component-name="Token" // FIXME: This is a hack to get the component name.
        role="presentation"
        className={tokenClassName}
        onClick={handleInlineEditClick}
      >
        <div className={styles['autosized-wrapper']}>
          <AutosizeInput
            ref={autosizeInputRef}
            value={inputValue}
            onChange={handleInputValueChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      data-component-name="Token" // FIXME: This is a hack to get the component name.
      role="presentation"
      className={tokenClassName}
      onClick={handleTokenClick}
      title={errorMessage}
    >
      <div className={styles['token__label-wrapper']}>
        {onGetDisplayLabel(tokenValue, tokenMeta)}
      </div>
      {!readOnly && (
        <DeleteButton onRenderContent={onRenderDeleteButtonContent} />
      )}
    </div>
  );
};

export default Token;
