import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AutosizeInput from 'react-input-autosize';
import keyDownHandler from '../utils/keyDownHandler';
import { DEFAULT_INPUT_INIT_VALUE } from '../constants';

import DeleteButton from './DeleteButton';

import styles from '../styles.styl';

const handleInlineEditClick = (e) => {
  e.stopPropagation();
};

const Token = ({
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
  const autosizeInputRef = useRef(null);
  const [inputValue, setInputValue] = useState(DEFAULT_INPUT_INIT_VALUE);
  const { activated, error } = tokenMeta;

  const handleEditStart = useCallback(() => {
    const tokenEditableValue = onGetEditableValue(tokenValue, tokenMeta);
    setInputValue(tokenEditableValue);
    onEditStart();
  }, [setInputValue, tokenValue, tokenMeta, onGetEditableValue, onEditStart]);
  useEffect(() => {
    if (activated && autosizeInputRef.current) {
      autosizeInputRef.current.focus();
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

      const { className = '' } = e.target;
      const isDeleteButton = className.indexOf(styles['delete-button']) !== -1;
      if (isDeleteButton) {
        onDelete();
        return;
      }

      handleEditStart();
    },
    [readOnly, onDelete, handleEditStart]
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
    // console.log('Token handleBlur');
    handleEditEnd();
  }, [handleEditEnd]);

  const className = useMemo(() => {
    return classNames(onGetClassName(tokenValue, tokenMeta), styles.token, {
      [styles.active]: activated,
      [styles.error]: error && !activated,
      [styles['read-only']]: readOnly,
    });
  }, [readOnly, error, activated, onGetClassName, tokenValue, tokenMeta]);

  const errorMessage = useMemo(() => {
    return onGetErrorMessage(tokenValue, tokenMeta);
  }, [onGetErrorMessage, tokenValue, tokenMeta]);

  if (activated) {
    return (
      <div
        role="presentation"
        className={className}
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
      className={className}
      onClick={handleTokenClick}
      title={errorMessage}
    >
      <div className={styles['label-wrapper']}>
        {onGetDisplayLabel(tokenValue, tokenMeta)}
      </div>
      {!readOnly && <DeleteButton />}
    </div>
  );
};

Token.propTypes = {
  // Same as props of TokenInput
  readOnly: PropTypes.bool.isRequired,
  // tokenValue of token
  tokenValue: PropTypes.any.isRequired,
  // tokenMeta of token
  tokenMeta: PropTypes.object.isRequired,

  // Same as props `onGetTokenClassName` of TokenInput
  onGetClassName: PropTypes.func.isRequired,
  // Same as props `onGetTokenDisplayLabel` of TokenInput
  onGetDisplayLabel: PropTypes.func.isRequired,
  // Same as props `onGetTokenEditableValue` of TokenInput
  onGetEditableValue: PropTypes.func.isRequired,
  // Same as props `onGetTokenErrorMessage` of TokenInput
  onGetErrorMessage: PropTypes.func.isRequired,

  // Editing
  // Same as props `onBuildTokenValue` of TokenInput
  onBuildTokenValue: PropTypes.func.isRequired,

  /**
   * A callback function, which should be `invoked` when end-user `start editing`
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
  onEditStart: PropTypes.func.isRequired,

  /**
   * A callback function, which should be `invoked` when end-user `end editing`
   *
   * Note:
   * Call this function to tell TokenInput it is finish editing the token.
   * As result, TokenInput will set `tokenMeta.activate` to `false`
   *
   * onEditEnd(newTokenValue?)
   *
   * @ newTokenValue
   * Type: undefined | any (string | number | object | customize data structure)
   * Description:
   * The new tokenValue build by `onBuildTokenValue.
   * TokenInput will update it, and
   * TokenInput will call `onTokenValuesChange`
   *
   * Note:
   * When newTokenValue is `undefined`,
   * TokenInput will treat as `Cancel` (End without update newTokenValue).
   * The `onTokenValuesChange` will not be called.
   *
   * @ return
   * Type: void
   */
  onEditEnd: PropTypes.func.isRequired,

  /**
   * A callback function, which should be `invoked` when end-user `delete` the token
   *
   * Note:
   * Call this function to tell TokenInput to delete the token.
   * As result, TokenInput will remove it, and
   * TokenInput will call `onTokenValuesChange` to update tokenValues.
   *
   * onDelete()
   *
   * @ return
   * Type: void
   */
  onDelete: PropTypes.func.isRequired,
};

export default Token;
