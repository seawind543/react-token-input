# React TokenInput [![build status](https://travis-ci.org/seawind543/react-token-input.svg?branch=master)](https://travis-ci.org/seawind543/react-token-input) [![Coverage Status](https://coveralls.io/repos/github/seawind543/react-token-input/badge.svg?branch=master)](https://coveralls.io/github/seawind543/react-token-input?branch=master)

[![NPM](https://nodei.co/npm/react-customize-token-input.png?downloads=true&stars=true)](https://www.npmjs.com/package/react-customize-token-input/)

A react token input component, which allow:
1. Apply **customize data structure**.
2. **Customize render functions** for `token label part` or `the complete token`.
3. Customize **separate characters** for separate user input.
4. **Pre-processs** function for **normalized** user input value .
It could be helpful to reproduce a single value into multiple values too.
5. **Validate** function.
6. **Inline editing** on exist token.
7. **Past** values.

Demo: https://seawind543.github.io/react-token-input/

## Installation

1. Install the latest version of [react](https://github.com/facebook/react) and [react-customize-token-input](https://github.com/seawind543/react-token-input):

  ```
  npm install --save react react-customize-token-input
  ```

2. At this point you can import `react-token-input` and its styles in your application as follows:

  ```javascript
  import TokenInput from 'react-customize-token-input';

  // Be sure to include styles at some point, probably during your bootstraping
  import 'react-customize-token-input/dist/react-customize-token-input.css';
  ```


## Dev
1. Run `npm install` to install required packages.
2. Run `npm run dev` to launch `webpack-dev-server`.
3. After step 2, you will see following message output in command console.
```
Project is running at http://0.0.0.0:8000/
webpack output is served from /
```

4. It might take some time for webpack to compiled. Please wait for message below output in the command console.
```
webpack: Compiled with warnings.
```

> Note: To stop the program, just type ```ctrl + c``` in command console.

## Usage

```javascript
    // Simple sample. 
    // Take default, data is array of string
    <TokenInput />
```

```javascript
    // Read only
    <TokenInput readOnly={true} />
```

```javascript
    // Customize data structure and validator
    <TokenInput
        defaultData={this.state.cData}
        buildDataFromValue={this.actions.cData.buildDataFromValue}
        dataValue={this.actions.cData.dataValue}
        tokenLabelRender={this.actions.cData.tokenLabelRender}
        validator={this.actions.cData.validator}
        tokenErrorMessage={this.actions.cData.tokenErrorMessage}
        onTokensUpdate={this.actions.cData.handleTokensUpdate}
    />
```

```javascript
    // Reproduce value
    <TokenInput
        reproduceValue={this.actions.urls.reproduceValue}
        onTokensUpdate={this.actions.urls.handleTokensUpdate}
    />
```

## Props

```javascript
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
     * Note: It take string split() function and RegExp to separate input string,
     *       so that make sure your customize separators could be use with RegExp.
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
```

### Priority of props

When ```tokenRender``` is providing, following props will be ignored.
```javascript
buildDataFromValue
dataValue
tokenClassName
tokenLabelRender
tokenErrorMessage
```

## License

[MIT](./LICENSE)