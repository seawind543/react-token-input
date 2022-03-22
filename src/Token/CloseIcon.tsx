import React from 'react';
import styles from '../styles.scss';

const CloseIcon = () => {
  return (
    <div
      data-component-name="CloseIcon" // FIXME: This is a hack to get the component name.
      role="img"
      className={styles['delete-button__close-icon']}
      aria-hidden="true"
    />
  );
};

export default CloseIcon;
