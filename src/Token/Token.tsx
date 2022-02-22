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

import type { TokenValue, TokenMeta } from '../types/token';
import type {
  OnBuildTokenValue,
  OnGetTokenClassName,
  OnGetTokenDisplayLabel,
  OnRenderTokenDeleteButtonContent,
  OnIsTokenEditable,
  OnGetTokenEditableValue,
  OnGetTokenErrorMessage,
} from '../types/interfaces';

const handleInlineEditClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

type Props<ValueType, ErrorType> = {
  readOnly: boolean;
  tokenValue: TokenValue<ValueType>;
  tokenMeta: TokenMeta<ErrorType>;

  onGetClassName: OnGetTokenClassName<ValueType, ErrorType>;
  onGetDisplayLabel: OnGetTokenDisplayLabel<ValueType, ErrorType>;
  onRenderDeleteButtonContent?: OnRenderTokenDeleteButtonContent;

  onIsEditable?: OnIsTokenEditable<ValueType, ErrorType>;
  onGetEditableValue: OnGetTokenEditableValue<ValueType, ErrorType>;
  onBuildTokenValue: OnBuildTokenValue<ValueType>;
  onGetErrorMessage: OnGetTokenErrorMessage<ValueType, ErrorType>;

  onEditStart: () => void;
  onEditEnd: (newTokenValue?: TokenValue<ValueType>) => void;
  onDelete: () => void;
};

const Token = <ValueType, ErrorType>({
  readOnly,
  tokenValue,
  tokenMeta,
  onGetClassName,
  onGetDisplayLabel,
  onRenderDeleteButtonContent,
  onIsEditable,
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
    return onIsEditable?.(tokenValue, tokenMeta) ?? true;
  }, [onIsEditable, tokenValue, tokenMeta]);

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
      onGetClassName(tokenValue, tokenMeta),
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
