import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Navbar.styl';

const Navbar = ({ url, name }) => {
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

Navbar.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
};

export default Navbar;
