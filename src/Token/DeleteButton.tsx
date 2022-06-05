import React, { type ReactNode } from 'react';
import classNames from 'classnames';

import CloseIcon from './CloseIcon';
import styles from '../styles.scss';

import { JS__TOKEN__DELETE_BUTTON__CLASS_NAME } from '../constants';

type Props = {
  onRenderContent?: () => ReactNode;
};

const DeleteButton = (props: Props) => {
  const { onRenderContent } = props;

  return (
    <span
      data-component-name="DeleteButton" // FIXME: This is a hack to get the component name.
      role="button"
      className={classNames(
        JS__TOKEN__DELETE_BUTTON__CLASS_NAME,
        styles['token__delete-button']
      )}
      aria-hidden="true"
    >
      {onRenderContent?.() ?? <CloseIcon />}
    </span>
  );
};

export default DeleteButton;
