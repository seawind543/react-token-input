import React from 'react';

import styles from '../styles.styl';

const DeleteButton = () => {
  return (
    <span
      role="button"
      className={styles['delete-button']}
      aria-hidden="true"
    />
  );
};

export default DeleteButton;
