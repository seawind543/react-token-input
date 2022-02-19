import React from 'react';
import styles from '../styles.scss';

const CloseIcon = () => {
  return (
    <div
      role="img"
      className={styles['token__delete-button__close-icon']}
      aria-hidden="true"
    />
  );
};

export default CloseIcon;
