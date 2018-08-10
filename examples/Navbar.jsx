import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from './Navbar.styl';

export default class extends PureComponent {
    static propTypes = {
        name: PropTypes.string
    };

    render() {
        const { name } = this.props;

        return (
            <nav
                className={classNames(styles.navbar, styles.navbarDefault)}
                style={{ borderRadius: 0 }}
            >
                <div className={styles.containerFluid}>
                    <div className={styles.navbarHeader}>
                        <span className={styles.navbarBrand}>{name}</span>
                    </div>
                </div>
            </nav>
        );
    }
}
