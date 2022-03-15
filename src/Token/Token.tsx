import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import type { MouseEvent } from 'react';
import classNames from 'classnames';
import AutosizeInput from 'react-input-autosize';
import keyDownHandlerProxy from '../utils/keyDownHandlerProxy';

import DeleteButton from './DeleteButton';

import {
  DEFAULT_INPUT_INIT_VALUE,
  JS__TOKEN__DELETE_BUTTON__CLASS_NAME,
} from '../constants';

import styles from '../styles.scss';

import type { TokenValue, TokenMeta } from '../types/token';
import type {
  OnBuildTokenValue,
  OnGetTokenClassName,
  OnGetTokenDisplayLabel,
  OnRenderTokenDeleteButtonContent,
  OnGetIsTokenEditable,
  OnGetTokenEditableValue,
  OnGetTokenErrorMessage,
} from '../types/interfaces';

const handleInlineEditClick = (e: MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

export type Props<ValueType, ErrorType> = {
  // Same as props of TokenInput
  readOnly: boolean;
  // tokenValue of the token
  tokenValue: TokenValue<ValueType>;
  // tokenMeta of the token
  tokenMeta: TokenMeta<ErrorType>;

  // Same as props `onGetTokenClassName` of TokenInput
  onGetClassName?: OnGetTokenClassName<ValueType, ErrorType>;
  // Same as props `onGetTokenDisplayLabel` of TokenInput
  onGetDisplayLabel: OnGetTokenDisplayLabel<ValueType, ErrorType>;
  // Same as props `onRenderTokenDeleteButtonContent` of TokenInput
  onRenderDeleteButtonContent?: OnRenderTokenDeleteButtonContent;

  // Same as props `onGetIsTokenEditable` of TokenInput
  onGetIsEditable: OnGetIsTokenEditable<ValueType, ErrorType>;
  // Same as props `onGetTokenEditableValue` of TokenInput
  onGetEditableValue: OnGetTokenEditableValue<ValueType, ErrorType>;
  // Same as props `onBuildTokenValue` of TokenInput
  onBuildTokenValue: OnBuildTokenValue<ValueType>;
  // Same as props `onGetTokenErrorMessage` of TokenInput
  onGetErrorMessage: OnGetTokenErrorMessage<ValueType, ErrorType>;

  /**
   * A callback function, which should be `invoked`
   * when end-user `start editing`
   *
   * Note:
   * Call this function to tell TokenInput it is start to editing the token.
   * As result, TokenInput will set `tokenMeta.activate` to `true`
   *
   * onEditStart()
   *
   * @ return
   * Type: void
   */
  onEditStart: () => void;

  /**
   * A callback function, which should be `invoked`
   * when end-user `end editing`
   *
   * Note:
   * Call this function to tell TokenInput to finish the `editing` of the token.
   * As result, TokenInput will set `tokenMeta.activate` to `false`.
   *
   * Also, TokenInput will based on the value of the parameter newTokenValue to
   * update the tokenValue of the token,
   * and call `onTokenValuesChange`
   *
   * onEditEnd(newTokenValue?)
   *
   * @ newTokenValue
   * Type: undefined | TokenValue<ValueType>
   * Description:
   * The new tokenValue build by `onBuildTokenValue.
   *
   * Note:
   * if `newTokenValue` is `undefined`,
   * TokenInput will treat as `Cancel` (Edit will end without update the tokenValue).
   * The `onTokenValuesChange` will also not be called.
   *
   * @ return
   * Type: void
   */
  onEditEnd: (newTokenValue?: TokenValue<ValueType>) => void;

  /**
   * A callback function, which should be `invoked`
   * when end-user `delete` the token
   *
   * Note:
   * Call this function to tell TokenInput to delete the token.
   * As result, TokenInput will remove the token,
   * and call `onTokenValuesChange` to update tokenValues.
   *
   * onDelete()
   *
   * @ return
   * Type: void
   */
  onDelete: () => void;
};

const Token = <ValueType, ErrorType>({
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
}: Props<ValueType, ErrorType>) => {
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
    [inputValue, onBuildTokenValue, onEditEnd]
  );

  /*
   * Event handlers
   */
  const handleTokenClick = useCallback(
    (e) => {
      // console.log('handleTokenClick');
      e.stopPropagation();

      if (readOnly) {
        return;
      }

      /**
       * Check does the click on the delete button
       * That is, the Element or its parents matched the `selector`
       */
      const isOnDeleteButton = !!e.target.closest(
        `.${styles.token} .${JS__TOKEN__DELETE_BUTTON__CLASS_NAME}`
      );
      if (isOnDeleteButton) {
        onDelete();
        return;
      }

      if (isEditable) {
        handleEditStart();
      }
    },
    [readOnly, isEditable, onDelete, handleEditStart]
  );

  const handleInputValueChange = useCallback(
    (e) => {
      const { value } = e.target;
      setInputValue(value);
    },
    [setInputValue]
  );

  const handleKeyDown = useCallback(
    (e) => {
      keyDownHandlerProxy(e, {
        onEscape: () => handleEditEnd({ reset: true }),
        onEnter: () => handleEditEnd(),
      });
    },
    [handleEditEnd]
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
      }
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
    return onGetErrorMessage(tokenValue, tokenMeta);
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
      title={typeof errorMessage === 'string' ? errorMessage : undefined}
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
