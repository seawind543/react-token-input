import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.styl';

class TokenInput extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        const {
            className,
            style,
            ...props
        } = this.props;

        return (
            <div
                {...props}
                style={style}
                className={classNames(
                    className,
                    styles.container
                )}
            >
                Hello World
            </div>
        );
    }
}

TokenInput.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string
};

TokenInput.defaultProps = {
    className: '',
    style: {}
};

export default TokenInput;
