import React from 'react';
import classNames from 'classnames';

import styles from '../styles.styl';
import { HARD_CODE_DELETE_BUTTON_CLASS_NAME } from '../constants';
import CloseIcon from './CloseIcon';

const DeleteButton = () => {
  return (
    <span
      role="button"
      className={classNames(
        HARD_CODE_DELETE_BUTTON_CLASS_NAME,
        styles['delete-button']
      )}
      aria-hidden="true"
    >
      <CloseIcon />
    </span>
  );
};

export default DeleteButton;
