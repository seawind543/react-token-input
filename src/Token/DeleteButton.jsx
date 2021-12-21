import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../styles.scss';
import { JS__TOKEN__DELETE_BUTTON__CLASS_NAME } from '../constants.ts';
import CloseIcon from './CloseIcon';

const DeleteButton = ({ onRenderContent }) => {
  const isCustomizeContent = typeof onRenderContent === 'function';

  return (
    <span
      role="button"
      className={classNames(
        JS__TOKEN__DELETE_BUTTON__CLASS_NAME,
        styles['token__delete-button']
      )}
      aria-hidden="true"
    >
      {isCustomizeContent && onRenderContent()}
      {!isCustomizeContent && <CloseIcon />}
    </span>
  );
};

DeleteButton.propTypes = {
  onRenderContent: PropTypes.func,
};

export default DeleteButton;
