import React from 'react';
import styles from '../styles.styl';

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
