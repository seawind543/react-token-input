import React from 'react';
import classNames from 'classnames';
import styles from './Navbar.scss';

type Props = {
  url: string;
  name: string;
};

const Navbar = ({ url, name }: Props) => {
  return (
    <nav
      className={classNames(styles.navbar, styles['navbar-default'])}
      style={{ borderRadius: 0 }}
    >
      <div className={styles['container-fluid']}>
        <div className={styles['navbar-header']}>
          <a href={url} className={styles['navbar-brand']}>
            {name}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
