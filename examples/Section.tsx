import React from 'react';
import classNames from 'classnames';
import styles from './Section.scss';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Section = (props: Props) => (
  <div className={classNames(props.className, styles.section)}>
    <div className={styles['section-content']}>{props.children}</div>
  </div>
);

export default Section;
