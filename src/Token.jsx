import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Autosized from 'react-input-autosize';

import styles from './styles.styl';

const DeleteButton = (props) => {
    return (
        <i
            className={styles['delete-button']}
            aria-hidden="true"
        />
    );
};

class Token extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    actions = {
        onStartEdit: () => {
            const {
                data,
                onStartEdit,
                dataValue
            } = this.props;

            this.setState({
                value: dataValue(data.value, data.meta)
            }, () => {
                onStartEdit();
            });
        },
        onEndEdit: (rollback = false) => {
            const { buildDataFromValue } = this.props;
            const { value } = this.state;

            // handle input value length === 0 case: Rollback token
            if (rollback === true || value.length === 0) {
                this.props.onEndEdit();
                return;
            }

            this.props.onEndEdit(buildDataFromValue(value));
        },
        // event handler
        handleClick: (e) => {
            e.stopPropagation();

            const { className = '' } = e.target;
            const isDeleteButton = className.indexOf(styles['delete-button']) !== -1;
            const {
                readOnly,
                onDelete
            } = this.props;

            if (readOnly === true) {
                return;
            }

            if (isDeleteButton) {
                onDelete();
                return;
            }

            this.actions.onStartEdit();
        },
        handleChangeValue: (e) => {
            const { value } = e.target;

            this.setState({ value });
        },
        handleKeyDown: (e) => {
            let eventKey;

            // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
            const eventKeys = [
                'Enter',
                'Escape'
            ];
            const keyIndex = eventKeys.indexOf(e.key);
            eventKey = eventKeys[keyIndex];

            // backward compatibility for browser not support event.key, such as safari
            // https://www.w3schools.com/jsref/event_key_key.asp
            if (eventKey === undefined) {
                eventKey = {
                    13: 'Enter',
                    27: 'Escape'
                }[e.keyCode];
            }

            if (eventKey === 'Escape') {
                // End editing with Rollback token
                this.actions.onEndEdit(true);
                return;
            }

            if (eventKey === 'Enter') {
                this.actions.onEndEdit();
                return;
            }
        },
        handleBlur: (e) => {
            this.actions.onEndEdit();
        }
    };

    render() {
        const {
            readOnly,
            data,
            tokenClassName,
            tokenLabelRender,
            tokenErrorMessage
        } = this.props;

        const {
            value
        } = this.state;

        const {
            meta: {
                activated,
                error
            }
        } = data;

        const title = error === null ? null : tokenErrorMessage(error);

        return (
            <div
                className={classNames(
                    tokenClassName(data.value, data.meta),
                    styles.token,
                    {
                        [styles.active]: activated,
                        [styles.error]: error && !activated,
                        [styles['read-only']]: readOnly
                    }
                )}
                onClick={this.actions.handleClick}
                role="presentation"
                title={title}
            >
                { !activated &&
                    <div className={styles['label-wrapper']}>
                        {tokenLabelRender(data.value)}
                    </div>
                }
                { !activated && !readOnly && <DeleteButton /> }
                { activated &&
                    <div className={styles['autosized-wrapper']}>
                        <Autosized
                            ref={input => input && input.focus()}
                            value={value}
                            onChange={this.actions.handleChangeValue}
                            onKeyDown={this.actions.handleKeyDown}
                            onBlur={this.actions.handleBlur}
                        />
                    </div>
                }
            </div>
        );
    }
}


Token.propTypes = {
    readOnly: PropTypes.bool.isRequired,
    tokenClassName: PropTypes.func.isRequired,
    tokenLabelRender: PropTypes.func.isRequired,
    tokenErrorMessage: PropTypes.func.isRequired,
    dataValue: PropTypes.func.isRequired,
    buildDataFromValue: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    onStartEdit: PropTypes.func.isRequired,
    onEndEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Token;
