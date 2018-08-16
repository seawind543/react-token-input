/* eslint no-console: 0 */
import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import Section from './Section';
import TokenInput from '../src';

import styles from './index.styl';

const name = 'React TokenInput';
const url = 'https://github.com/seawind543/react-token-input';

class App extends PureComponent {
    state = {
        // Default data structure
        values: [
            '123',
            '456',
            '789',
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        ],
        // Customize data structure
        cData: [
            { num: 123 },
            { num: 456 },
            { num: 789 }
        ],
        urls: [
            { url: 'https://www.google.com' },
            { url: 'http://www.google.com' },
            { url: 'http://www.google.comABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' }
        ]
    }

    actions = {
        updateData: (data) => {
            this.setState({ data });
        },
        onInputValueChange: (value) => {
        },
        validator: (data, index, allData) => {
            if (data === '789') {
                return 'Data is 789';
            }

            return null;
        },
        tokenErrorMessage: (error) => {
            return error;
        },
        handleVlauesUpdate: (tokens) => {
            console.log('values before', this.state.values);
            const values = tokens.map((token, index) => {
                return token.value;
            });
            this.setState({ values }, () => {
                console.log('values after', this.state.values);
            });
        },
        handleKeyDown: (onEndEdit) => (e) => {
            const { value } = e.target;

            if (e.keyCode === 13) { // Enter key
                onEndEdit(value);
            }
        },
        handleBlur: (onEndEdit) => (e) => {
            onEndEdit();
        },
        tokenRender: (props) => {
            const {
                key,
                data,
                meta,
                onStartEdit,
                onEndEdit,
                onDelete
            } = props;

            const { activated } = meta;

            if (activated) {
                return (
                    <div key={key} className={styles['customize-token']}>
                        <input
                            ref={input => input && input.focus()}
                            defaultValue={data}
                            onKeyDown={this.actions.handleKeyDown(onEndEdit)}
                            onBlur={this.actions.handleBlur(onEndEdit)}
                        />
                    </div>
                );
            }

            return (
                <div key={key} className={styles['customize-token']}>
                    <div
                        onClick={() => onStartEdit()}
                        role="presentation"
                    >
                        {data}
                    </div>
                    <button type="button" onClick={() => onDelete()}>
                        Delete
                    </button>
                </div>
            );
        },
        // Customize data structure
        cData: {
            buildDataFromValue: (value) => {
                const trimedValue = value.trim ? value.trim() : value;
                const num = Number(trimedValue) || trimedValue;
                return { num };
            },
            dataValue: (data) => {
                return data.num;
            },
            tokenLabelRender: (data) => {
                return data.num;
            },
            validator: (data, index, allData) => {
                const { num } = data;

                if (typeof num !== 'number' || Number.isNaN(num) === true) {
                    return 'Input is not number';
                }

                // Check duplicated
                const matched = allData.filter((item, idx, array) => {
                    return idx !== index && item.num === num;
                });
                if (matched.length > 0) {
                    return 'Duplicated';
                }

                if (allData.length > 5) {
                    return 'Max entry is 5';
                }

                return null;
            },
            tokenErrorMessage: (error) => {
                return error;
            },
            handleTokensUpdate: (tokens) => {
                console.log('cData before', this.state.cData, 'tokens', tokens);
                const data = tokens.map((token, index) => {
                    return token.value;
                });
                this.setState({ cData: data }, () => {
                    console.log('cData after', this.state.cData);
                });
            }
        },
        urls: {
            preprocessor: (inputValues) => {
                const values = [];

                inputValues
                    .filter(value => { // filter empty
                        return value !== '' && value.trim() !== '';
                    })
                    .forEach((value, index) => {
                        const url = value.trim();
                        const protocolPattern = /^(https:\/\/|http:\/\/)/i;
                        if (protocolPattern.test(url) === false) {
                            values.push(
                                `https://${url}`,
                                `http://${url}`
                            );
                        } else {
                            values.push(url);
                        }
                    });

                return values;
            },
            buildDataFromValue: (value) => {
                return { 'url': value };
            },
            dataValue: (data) => {
                return data.url;
            },
            tokenLabelRender: (data) => {
                return data.url;
            },
            validator: (data, index, allData) => {
                const { url } = data;

                const protocolPattern = /^(https:\/\/|http:\/\/)/i;
                if (protocolPattern.test(url) === false) {
                    return 'Invalid url';
                }

                // Check duplicated
                const matched = allData.filter((item, idx, array) => {
                    return idx !== index && item.url === url;
                });
                if (matched.length > 0) {
                    return 'Duplicated';
                }

                if (allData.length > 5) {
                    return 'Max entry is 5';
                }

                return null;
            },
            tokenErrorMessage: (error) => {
                return error;
            },
            handleTokensUpdate: (tokens) => {
                console.log('urls before', this.state.urls, 'tokens', tokens);
                const data = tokens.map((token, index) => {
                    return token.value;
                });
                this.setState({ urls: data }, () => {
                    console.log('urls after', this.state.urls);
                });
            }
        }
    }

    render() {
        return (
            <div>
                <Navbar name={name} url={url} />
                <div className="container-fluid" style={{ padding: '20px 20px 0' }}>
                    <div className="row">
                        <div className="col-md-12">
                            <Section className="row-md-6">
                                <h2>Simple example: Take default</h2>
                                <p>By default, TokenInput will assume data is array of strings.</p>
                                <TokenInput
                                    className="example"
                                    // readOnly={true}
                                    // placeholder="Enter here"
                                    // autoFocus={true}
                                    // defaultData={this.state.values}
                                    // separators={[',', ';', '\n', '\r', '\r\n']}
                                    // preprocessor={this.actions.preprocessor}
                                    // buildDataFromValue={this.actions.buildDataFromValue}
                                    // dataValue={this.actions.dataValue}
                                    // tokenClassName={this.actions.tokenClassName}
                                    // tokenLabelRender={this.actions.tokenLabelRender}
                                    // validator={this.actions.validator}
                                    // onInputValueChange={this.actions.handleInputValueChange}
                                    onTokensUpdate={this.actions.handleVlauesUpdate}
                                />
                            </Section>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Section className="row-md-6">
                                <h2>Customize data structure and validator</h2>
                                <p>Note: TokenInput allow you to inline editing token by mouse click on it.</p>
                                <TokenInput
                                    defaultData={this.state.cData}
                                    buildDataFromValue={this.actions.cData.buildDataFromValue}
                                    dataValue={this.actions.cData.dataValue}
                                    tokenLabelRender={this.actions.cData.tokenLabelRender}
                                    validator={this.actions.cData.validator}
                                    // tokenErrorMessage={this.actions.cData.tokenErrorMessage}
                                    onTokensUpdate={this.actions.cData.handleTokensUpdate}
                                />
                            </Section>
                        </div>
                        <div className="col-md-6">
                            <Section className="row-md-6">
                                <h2>Reproduce value by preprocessor</h2>
                                <p>Type any value without https:// and http:// to see reproduce effect.</p>
                                <p>Example: google.com</p>
                                <TokenInput
                                    defaultData={this.state.urls}
                                    preprocessor={this.actions.urls.preprocessor}
                                    buildDataFromValue={this.actions.urls.buildDataFromValue}
                                    dataValue={this.actions.urls.dataValue}
                                    tokenLabelRender={this.actions.urls.tokenLabelRender}
                                    validator={this.actions.urls.validator}
                                    tokenErrorMessage={this.actions.urls.tokenErrorMessage}
                                    onTokensUpdate={this.actions.urls.handleTokensUpdate}
                                />
                            </Section>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Section className="row-md-6">
                                <h2>Customize separators</h2>
                                <p>In this example, you can use Plus-symbol, Blank or Enter to separate input into tokens.</p>
                                <p>Forllowing input will be separate into 3 tokens: aaa+bbbb cc</p>
                                <TokenInput
                                    separators={[
                                        '\\+',
                                        ' '
                                    ]}
                                />
                            </Section>
                        </div>
                        <div className="col-md-6">
                            <Section className="row-md-6">
                                <h2>Customize token render</h2>
                                <p>This example demonstrate that the complete token could be customize by render prop <b>tokenRender</b>.</p>
                                <TokenInput
                                    defaultData={this.state.values}
                                    tokenRender={this.actions.tokenRender}
                                    onTokensUpdate={this.actions.handleVlauesUpdate}
                                />
                            </Section>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Section className="row-md-4">
                                <h2>Read only, and set init tokens</h2>
                                <TokenInput
                                    readOnly={true}
                                    defaultData={this.state.values}
                                />
                            </Section>
                        </div>
                        <div className="col-md-6">
                            <Section className="row-md-4">
                                <h2>Read only, and set init tokens</h2>
                                <TokenInput
                                    readOnly={true}
                                    defaultData={this.state.values}
                                    validator={this.actions.validator}
                                    // tokenErrorMessage={this.actions.tokenErrorMessage}
                                />
                            </Section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
