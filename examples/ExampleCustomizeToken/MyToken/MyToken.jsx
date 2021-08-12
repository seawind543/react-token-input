import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import keyDownHandler from '../../../src/utils/keyDownHandler';
import DeleteButton from './DeleteButton';

import styles from '../myToken.styl';

const MyToken = ({
  readOnly,
  tokenValue,
  tokenMeta,
  onGetClassName,
  onGetDisplayLabel,
  onGetEditableValue,
  onGetErrorMessage,
  onBuildTokenValue,
  onEditStart,
  onEditEnd,
  onDelete,
}) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const { activated, error } = tokenMeta;

  const handleEditStart = useCallback(() => {
    const tokenEditableValue = onGetEditableValue(tokenValue, tokenMeta);
    setInputValue(tokenEditableValue);
    onEditStart();
  }, [setInputValue, tokenValue, tokenMeta, onGetEditableValue, onEditStart]);
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

      const { target } = e;
      const isDeleteButton =
        target.getAttribute('data-component-name') === 'DeleteButton';
      if (isDeleteButton) {
        onDelete();
        return;
      }

      handleEditStart();
    },
    [readOnly, onDelete, handleEditStart]
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
      keyDownHandler(e, {
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
      onGetClassName(tokenValue, tokenMeta),
      styles['customize-token'],
      {
        [styles.active]: activated,
        [styles.error]: error && !activated,
        [styles['read-only']]: readOnly,
      }
    );
  }, [readOnly, onGetClassName, tokenValue, tokenMeta, error, activated]);

  const errorMessage = useMemo(() => {
    if (error === undefined) {
      return undefined;
    }

    return `Error: ${onGetErrorMessage(tokenValue, tokenMeta)}`;
  }, [onGetErrorMessage, error, tokenValue, tokenMeta]);

  if (activated) {
    return (
      <div
        role="presentation"
        className={className}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputValueChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      </div>
    );
  }

  return (
    <div className={className} onClick={handleTokenClick} role="presentation">
      <DeleteButton onClick={handleTokenDelete} />
      {onGetDisplayLabel(tokenValue, tokenMeta)}
      <div>{errorMessage && errorMessage}</div>
    </div>
  );
};

MyToken.propTypes = {
  readOnly: PropTypes.bool.isRequired,
  tokenValue: PropTypes.any.isRequired,
  tokenMeta: PropTypes.object.isRequired,
  onGetClassName: PropTypes.func.isRequired,
  onGetDisplayLabel: PropTypes.func.isRequired,
  onGetEditableValue: PropTypes.func.isRequired,
  onGetErrorMessage: PropTypes.func.isRequired,
  onEditStart: PropTypes.func.isRequired,
  onEditEnd: PropTypes.func.isRequired,
  onBuildTokenValue: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MyToken;
