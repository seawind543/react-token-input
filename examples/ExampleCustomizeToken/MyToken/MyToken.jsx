/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import keyDownHandlerProxy from '../../../src/utils/keyDownHandlerProxy.ts';
import DeleteButton from './DeleteButton';

import styles from '../myToken.scss';

const handleTokenClick = (e) => {
  // console.log('handleTokenClick');
  e.stopPropagation();
};

const MyToken = ({
  tokenValue,
  tokenMeta,
  onEditStart,
  onEditEnd,
  onDelete,

  /**
   * Could ignore below props(Replace by self implementation)
   * when override build-in Token component.
   *
   * Because basically they are as same as what you passed into the TokenInput.
   * That is, you already know what is their implementation.
   */
  readOnly,
  onGetClassName,
  onGetDisplayLabel,
  onRenderDeleteButtonContent,
  onGetIsEditable,
  onGetEditableValue,
  onBuildTokenValue,
  onGetErrorMessage,
}) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const { activated, error } = tokenMeta;

  // Could use self implementation and ignore props `readOnly`
  const isReadOnlyToken = useMemo(() => {
    return tokenValue === 'Example: ReadOnly Token';
  }, [tokenValue]);

  const displayLabel = useMemo(() => {
    return tokenValue;

    // Could use self implementation and ignore props `onGetDisplayLabel`
    // return onGetDisplayLabel(tokenValue, tokenMeta);
  }, [tokenValue]);

  const handleEditStart = useCallback(() => {
    // Could use self implementation and ignore props `onGetEditableValue`
    // const tokenEditableValue = onGetEditableValue(tokenValue, tokenMeta);
    const tokenEditableValue = tokenValue;

    setInputValue(tokenEditableValue);
    onEditStart();
  }, [setInputValue, tokenValue, onEditStart]);
  useEffect(() => {
    if (activated && inputRef.current) {
      inputRef.current.focus();
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

      // Could use self implementation and ignore props `onBuildTokenValue`
      // const newTokenValue = onBuildTokenValue(inputValue);
      const newTokenValue = inputValue.trim();

      onEditEnd(newTokenValue);
    },
    [inputValue, onEditEnd]
  );

  /*
   * Event handlers
   */
  const handleEditIconClick = useCallback(
    (e) => {
      e.stopPropagation();

      const { target } = e;
      const isDeleteButton =
        target.getAttribute('data-component-name') === 'DeleteButton';
      if (isDeleteButton) {
        onDelete();
        return;
      }

      handleEditStart();
    },
    [onDelete, handleEditStart]
  );

  const handleTokenDelete = useCallback(
    (e) => {
      e.stopPropagation();

      onDelete();
    },
    [onDelete]
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
    handleEditEnd();
  }, [handleEditEnd]);

  const className = useMemo(() => {
    return classNames(
      // Could use self implementation and ignore props `onGetClassName`
      // onGetClassName(tokenValue, tokenMeta),
      styles['customize-token'],
      {
        [styles.error]: error,
        [styles.pass]: !error,
      }
    );
  }, [error]);

  const errorMessage = useMemo(() => {
    if (error === undefined) {
      return undefined;
    }

    return tokenMeta.error;

    // Could use self implementation and ignore props `onGetErrorMessage`
    // return `Error: ${onGetErrorMessage(tokenValue, tokenMeta)}`;
  }, [error, tokenMeta]);

  return (
    <div className={className} role="presentation" onClick={handleTokenClick}>
      {!activated && (
        <div className={styles['token-body']}>
          {!isReadOnlyToken && <DeleteButton onClick={handleTokenDelete} />}

          <div className={styles['display-label']}>{displayLabel}</div>

          {!isReadOnlyToken && (
            <span
              className={classNames(
                'material-icons',
                styles['button-icon'],
                styles['edit-icon']
              )}
              role="button"
              aria-hidden="true"
              onClick={handleEditIconClick}
            >
              mode_edit
            </span>
          )}
        </div>
      )}

      {activated && (
        <div className={styles['token-body']}>
          <input
            ref={inputRef}
            className={styles.input}
            value={inputValue}
            onChange={handleInputValueChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </div>
      )}

      <div className={styles.message}>
        {errorMessage && (
          <>
            <span
              className={classNames('material-icons', styles['status-icon'])}
            >
              highlight_off
            </span>
            {errorMessage}
          </>
        )}

        {!errorMessage && (
          <>
            <span
              className={classNames('material-icons', styles['status-icon'])}
            >
              check_circle
            </span>
            Valid
          </>
        )}
      </div>
    </div>
  );
};

MyToken.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  tokenValue: PropTypes.any.isRequired,
  tokenMeta: PropTypes.object.isRequired,

  onGetClassName: PropTypes.func,

  onGetDisplayLabel: PropTypes.func.isRequired,

  onRenderDeleteButtonContent: PropTypes.func,

  onGetIsEditable: PropTypes.func.isRequired,
  onGetEditableValue: PropTypes.func.isRequired,
  onBuildTokenValue: PropTypes.func.isRequired,
  onGetErrorMessage: PropTypes.func.isRequired,

  onEditStart: PropTypes.func.isRequired,
  onEditEnd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MyToken;
