import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Navbar.styl';

const Navbar = ({ url, name }) => {
  return (
    <nav
      className={classNames(styles.navbar, styles.navbarDefault)}
      style={{ borderRadius: 0 }}
    >
      <div className={styles.containerFluid}>
        <div className={styles.navbarHeader}>
          <a href={url} className={styles.navbarBrand}>
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
