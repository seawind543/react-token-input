/* eslint react/prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies
import classNames from 'classnames';

import styles from '../myToken.scss';

const DeleteButton = ({ onClick }) => {
  // Google font material-icons
  // https://fonts.google.com/icons
  return (
    <span
      className={classNames('material-icons', styles['button-icon'])}
      role="button"
      aria-hidden="true"
      onClick={onClick}
    >
      delete
    </span>
  );
};

DeleteButton.protoTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
