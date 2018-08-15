import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Autosized from 'react-input-autosize';
import { dataItemToTokenData } from './utils';

import styles from './styles.styl';

class TokenCreator extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            value: '',
        };
    }

    actions = {
        updateValue: (value = '') => {
            this.setState({ value }, () => {
                this.props.onInputValueChange(value);
            });
        },
        // event handler
        handleChangeValue: (e) => {
            const { value } = e.target;
            const lastChar = value.substr(-1);
            const pattens = new RegExp(this.props.separators.join('|'));

            if (pattens.test(lastChar) === true) {
                this.actions.createTokens();
                return;
            }

            this.actions.updateValue(value);
        },
        createTokens: (value = this.state.value) => {
            const {
                separators,
                preprocessor,
                buildDataFromValue,
                addTokens
            } = this.props;

            const trimmedValue = value.trim();

            // Skip empty
            if (trimmedValue === '') {
                return;
            }

            const inputValues = trimmedValue.split(new RegExp(separators.join('|')));
            const values = preprocessor(inputValues);
            const tokens = values
                .map((value, index) => {
                    const data = buildDataFromValue(value);
                    return dataItemToTokenData(data, index);
                });

            addTokens(tokens);
            this.actions.updateValue(''); // clear value
        },
        handleKeyDown: (e) => {
            // const { value } = e.target;
            const { value } = this.state;

            let eventKey;

            // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
            const eventKeys = [
                'Backspace',
                'Enter',
                'Escape'
            ];
            const keyIndex = eventKeys.indexOf(e.key);
            eventKey = eventKeys[keyIndex];

            // backward compatibility for browser not support event.key, such as safari
            // https://www.w3schools.com/jsref/event_key_key.asp
            if (eventKey === undefined) {
                eventKey = {
                    8: 'Backspace',
                    13: 'Enter',
                    27: 'Escape'
                }[e.keyCode];
            }

            // TODO: Fix me. check functional
            if (value.length === 0 && eventKey === 'Backspace') {
                this.props.onDeleteLastToken();
            }

            if (eventKey === 'Escape') {
                this.actions.updateValue(''); // clear value
                return;
            }

            if (eventKey === 'Enter') {
                this.actions.createTokens();
                return;
            }
        },
        handleFocus: (e) => {
            this.props.onFocus(e);
        },
        handleBlur: (e) => {
            this.actions.createTokens();
            this.props.onBlur(e);
        },
        handlePaste: (e) => {
            e.preventDefault();
            const pastedText = e.clipboardData.getData('text');

            this.actions.createTokens(pastedText);
        }
    };

    focus = () => {
        this.tokenCreator.input && this.tokenCreator.input.focus();
    }

    render() {
        const {
            placeholder,
            autoFocus,
        } = this.props;

        const { value } = this.state;

        return (
            <div className={styles['autosized-wrapper']}>
                <Autosized
                    ref={node => {
                        this.tokenCreator = node;
                    }}
                    placeholder={placeholder}
                    value={value}
                    autoFocus={autoFocus}
                    onFocus={this.actions.handleFocus}
                    onBlur={this.actions.handleBlur}
                    onChange={this.actions.handleChangeValue}
                    onKeyDown={this.actions.handleKeyDown}
                    onPaste={this.actions.handlePaste}
                />
            </div>
        );
    }
}

TokenCreator.propTypes = {
    separators: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    autoFocus: PropTypes.bool.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    addTokens: PropTypes.func.isRequired,
    onDeleteLastToken: PropTypes.func.isRequired,
    buildDataFromValue: PropTypes.func.isRequired,
    onInputValueChange: PropTypes.func.isRequired,
    preprocessor: PropTypes.func.isRequired
};

export default TokenCreator;
