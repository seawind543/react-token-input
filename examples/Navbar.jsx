import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from './Navbar.styl';

export default class extends PureComponent {
    static propTypes = {
        url: PropTypes.string,
        name: PropTypes.string
    };

    render() {
        const { name, url } = this.props;

        return (
            <nav
                className={classNames(styles.navbar, styles.navbarDefault)}
                style={{ borderRadius: 0 }}
            >
                <div className={styles.containerFluid}>
                    <div className={styles.navbarHeader}>
                        <a href={url} className={styles.navbarBrand}>{name}</a>
                    </div>
                </div>
            </nav>
        );
    }
}
