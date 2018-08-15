import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TokenCreator from './TokenCreator';
import Token from './Token';
import {
    buildDataFromValue,
    getDataValue,
    dataItemToTokenData
} from './utils';

import styles from './styles.styl';

class TokenInput extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            focused: false,
            error: false,
            tokens: []
        };
    }

    componentDidMount() {
        const tokens = this.props.defaultData.map(dataItemToTokenData);

        this.actions.updateTokens(tokens);
    }

    actions = {
        keepFocus: () => {
            this.tokenCreator && this.tokenCreator.focus();
        },
        onFocus: (e) => {
            this.setState({ focused: true });
        },
        onBlur: (e) => {
            this.setState({ focused: false });
        },
        updateTokens: (tokens, options = {}) => {
            const {
                keepFocus = false
            } = options;

            let hasInvalid = false;
            const values = tokens.map(token => token.value);
            const newTokens = tokens.map((token, index, tokens) => {
                const newToken = { ...token };
                newToken.meta.error = this.props.validator(token.value, index, values);

                if (newToken.meta.error && !newToken.meta.activated) {
                    hasInvalid = true;
                }

                return newToken;
            });

            this.setState({
                tokens: newTokens,
                error: hasInvalid
            }, () => {
                if (keepFocus === true) {
                    this.actions.keepFocus();
                }

                // TODO: Fix me.
                // onDataUpdate?
                this.props.onTokensUpdate(newTokens);
            });
        },
        onStartEditToken: (index) => () => {
            const tokens = [...this.state.tokens];
            tokens[index].meta.activated = true;

            this.actions.updateTokens(tokens);
        },
        onEndEditToken: (index) => (data) => {
            const tokens = [...this.state.tokens];
            tokens[index].meta.activated = false;

            if (typeof data !== 'undefined') {
                tokens[index].value = data;
            }

            this.actions.updateTokens(tokens);
        },
        onDeleteToken: (index) => () => {
            this.actions.deleteToken(index);
        },
        onDeleteLastToken: () => {
            this.actions.deleteToken(-1);
        },
        deleteToken: (index) => {
            const tokens = [...this.state.tokens];

            tokens.splice(index, 1);
            this.actions.updateTokens(tokens, { keepFocus: true });
        },
        onAddTokens: (newTokens = []) => {
            if (newTokens.length > 0) { // avoid meaningless update
                const tokens = [...this.state.tokens, ...newTokens];
                this.actions.updateTokens(tokens, { keepFocus: true });
            }
        },
        tokenCreatePreprocessor: (inputValues) => {
            const { preprocessor } = this.props;

            if (typeof preprocessor === 'function') {
                const values = preprocessor(inputValues);

                if (Array.isArray(values) !== true) {
                    throw new Error('prop preprocessor should return array of values');
                }

                return values;
            }

            return inputValues;
        }
    };

    render() {
        const {
            className,
            readOnly,
            placeholder,
            autoFocus,
            separators,
            buildDataFromValue,
            dataValue,
            tokenClassName,
            tokenLabelRender,
            tokenErrorMessage,
            tokenRender,
            onInputValueChange,
            ...props
        } = this.props;

        const {
            focused,
            error,
            tokens
        } = this.state;

        // Remove un-render-able props
        delete props.defaultData;
        delete props.preprocessor;
        delete props.validator;
        delete props.onTokensUpdate;

        const customizeToken = typeof tokenRender === 'function';

        return (
            <div
                {...props}
                className={classNames(
                    className,
                    styles.container,
                    {
                        [styles.focused]: focused,
                        [styles.errors]: error
                    }
                )}
                onClick={this.actions.keepFocus}
                role="presentation"
            >
                <div className={styles['token-list']}>
                    { customizeToken &&
                        tokens.map((token, index) => {
                            const key = token.meta.key;

                            return tokenRender({
                                key,
                                readOnly,
                                data: token.value,
                                meta: token.meta,
                                onStartEdit: this.actions.onStartEditToken(index),
                                onEndEdit: this.actions.onEndEditToken(index),
                                onDelete: this.actions.onDeleteToken(index)
                            });
                        })
                    }
                    { !customizeToken &&
                        tokens.map((token, index) => {
                            const key = token.meta.key;

                            return (
                                <Token
                                    key={key}
                                    readOnly={readOnly}
                                    buildDataFromValue={buildDataFromValue}
                                    dataValue={dataValue}
                                    tokenClassName={tokenClassName}
                                    tokenLabelRender={tokenLabelRender}
                                    tokenErrorMessage={tokenErrorMessage}
                                    data={token}
                                    onStartEdit={this.actions.onStartEditToken(index)}
                                    onEndEdit={this.actions.onEndEditToken(index)}
                                    onDelete={this.actions.onDeleteToken(index)}
                                />
                            );
                        })
                    }
                </div>
                {!readOnly &&
                    <TokenCreator
                        ref={node => {
                            this.tokenCreator = node;
                        }}
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        onFocus={this.actions.onFocus}
                        onBlur={this.actions.onBlur}
                        onInputValueChange={onInputValueChange}
                        preprocessor={this.actions.tokenCreatePreprocessor}
                        separators={separators}
                        // reproduceValue={reproduceValue}
                        buildDataFromValue={buildDataFromValue}
                        addTokens={this.actions.onAddTokens}
                        onDeleteLastToken={this.actions.onDeleteLastToken}
                    />
                }
            </div>
        );
    }
}

TokenInput.propTypes = {
    // style: PropTypes.object,
    className: PropTypes.string,

    // Specific TokenInput is readOnly or not
    readOnly: PropTypes.bool,

    // placeholder of TokenInput
    placeholder: PropTypes.string,

    // Specific TokenInput should be autoFocus or not
    autoFocus: PropTypes.bool,

    // data for TokenInput to build pre-set tokens. Default is empty array
    defaultData: PropTypes.array,

    /**
     * Array of characters for separate user input string.
     * For example, separate user input string 'abc;def' into [abc, def] by separators [';']
     */
    separators: PropTypes.array,

    /**
     * function for pre-process user input values.
     *
     * Case 1:
     *  Make your normalize process in this function, such as trim.
     *
     * Case 2:
     * Sometimes, we will want to auto-fit user input, this function could help on it.
     * For example, user input is 'www.google.com',
     * and we want to auto fit it into 'http://www.google.com' and 'https://www.google.com'
     *
     * preprocessor(values)
     *
     * @ values
     * Type: array of string values
     * Description: user input values // (values that input string separate by separators)
     *
     * @ return
     * Type: array of string values
     * Description: values after pre-process
     */
    preprocessor: PropTypes.func,

    /**
     * function for TokenInput to build user input value into customize data structure.
     * You could make your normalize process in this function too.
     * buildDataFromValue(value)
     *
     * @ value
     * Type: string
     * Description: user input value // (value are the input string separate by separators)
     *
     * @ return
     * Type: object || string || number
     * Description: customize data
     */
    buildDataFromValue: PropTypes.func,

    /**
     * function for TokenInput to get value from customize data structure for user to perform "edit"
     * dataValue(data)
     *
     * @ data
     * Type: object || string || number
     * Description: customize data onject
     *
     * @ return
     * Type: string
     * Description: The value for user to edit
     */
    dataValue: PropTypes.func,

    /**
     * function for TokenInput to get className for a token
     * tokenClassName(data, meta)
     *
     * @ data
     * Type: object || string || number
     * Description: customize data onject
     *
     * @ meta
     * Description: token's meta data
     *  {
     *      key, // private key for render
     *      activated, // Boolean; Specific the token is activated for edit or not
     *      error // null or ERROR object. Specific the token's validate status
     *  }
     *
     *
     * @ return
     * Type: string
     * Description: The className
     */
    tokenClassName: PropTypes.func,

    /**
     * A token label renderer for TokenInput to rendering a token's content part (label)
     * Apply this to customize token's content. For example render token with "icon and text".
     * tokenLabelRender(data)
     *
     * @ data
     * Type: object || string || number
     * Description: customize data onject
     *
     * @ return
     * Type: string || node
     * Description: The token's content. By default, will apply dataValue()
     */
    tokenLabelRender: PropTypes.func,

    /**
     * function for TokenInput to get error message from customize error
     * The "customize error" is generate by "validator" function
     * tokenErrorMessage(error)
     *
     * @ error
     * Type: customize error
     * Description: customize error
     *
     * @ return
     * Type: string
     * Description: The error message to describe an invalidte token
     */
    tokenErrorMessage: PropTypes.func,

    /**
     * A token renderer for TokenInput to rendering a token
     * Apply this to customize all token.
     * tokenRender(props)
     *
     * @ props.key
     * Type: string
     * Description: Each child in an array or iterator should have a unique "key" prop.
     *
     * @ props.data
     * Type: object || string || number
     * Description: customize data onject
     *
     * @ props.meta
     * Description: token's meta data
     *  {
     *      key, // private key for render
     *      activated, // Boolean; Specific the token is activated for edit or not
     *      error // null or ERROR object. Specific the token's validate status
     *  }
     *
     * @ props.readOnly
     * Type: boolean
     * Description: Is readOnly or not
     *
     * @ props.onStartEdit
     * Type: function
     * Description: Callback function invoked when user start edit the token
     *
     * @ props.onEndEdit(data)
     * Type: function
     * Description: Callback function invoked when user end edit the token
     * parameter:
     *  data => customize data onject for update result of edit.
     *          Make no change, in case do not provide data.
     *
     * @ props.onDelete
     * Type: function
     * Description: Callback function invoked when user delete the token
     *
     *
     * @ return
     * Type: node
     * Description: The token's content.
     */
    tokenRender: PropTypes.func,

    /**
     * function for validate data
     * validator(data, index, allData)
     *
     * @ data
     * Type: object || string || number
     * Description: customize data onject
     *
     * @ index
     * Type: number
     * Description: data's array index in allData
     *
     * @ allData
     * Type: array
     * Description: array of allData
     *
     * @ return
     * Type: null || customize error
     * Description: The error.
     *      Could be error message to display or error object
     *      return null means "validate"
     */
    validator: PropTypes.func,

    /**
     * Callback function invoked when user typing but not become token yet
     * onInputValueChange(value)
     *
     * @ value
     * Type: string
     * Description: user input string
     */
    onInputValueChange: PropTypes.func,

    /**
     * Callback function invoked data updated
     * onTokensUpdate(tokens)
     *
     * @ tokens
     * Type: Array
     * Description: Array of token data
     *
     * token data
     *  {
     *      value, // customize data
     *      meta: {
     *          key, // private key for render
     *          activated, // Boolean; Specific the token is activated for edit or not
     *          error // null or ERROR object. Specific the token's validate status
     *      }
     *  }
     */
    onTokensUpdate: PropTypes.func
};

TokenInput.defaultProps = {
    className: '',
    readOnly: false,
    placeholder: '',
    autoFocus: false,
    defaultData: [],
    separators: [
        ',',
        ';',
        '\n', // for copy past
        '\r', // for copy past
        '\r\n' // for copy past
    ],
    // reproduceValue: reproduceValue,
    buildDataFromValue: buildDataFromValue,
    dataValue: getDataValue,
    tokenClassName: () => '',
    tokenLabelRender: getDataValue,
    validator: () => null,
    tokenErrorMessage: errorMsg => errorMsg,
    onInputValueChange: value => value,
    onTokensUpdate: () => {} // dummy function
};

export default TokenInput;
