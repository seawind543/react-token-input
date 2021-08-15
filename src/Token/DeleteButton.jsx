import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../styles.styl';
import { HARD_CODE_DELETE_BUTTON_CLASS_NAME } from '../constants';
import CloseIcon from './CloseIcon';

const DeleteButton = ({ onRenderContent }) => {
  const isCustomizeContent = !!onRenderContent;
  return (
    <span
      role="button"
      className={classNames(
        HARD_CODE_DELETE_BUTTON_CLASS_NAME,
        styles['delete-button']
      )}
      aria-hidden="true"
    >
      {isCustomizeContent && onRenderContent()}
      {!isCustomizeContent && <CloseIcon />}
    </span>
  );
};

DeleteButton.propTypes = {
  onRenderContent: PropTypes.fun,
};

export default DeleteButton;
