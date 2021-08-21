# React TokenInput [![build status](https://travis-ci.org/seawind543/react-token-input.svg?branch=master)](https://travis-ci.org/seawind543/react-token-input) [![Coverage Status](https://coveralls.io/repos/github/seawind543/react-token-input/badge.svg?branch=master)](https://coveralls.io/github/seawind543/react-token-input?branch=master)

[![NPM](https://nodei.co/npm/react-customize-token-input.png?downloads=true&stars=true)](https://www.npmjs.com/package/react-customize-token-input/)

Live Demo: https://seawind543.github.io/react-token-input/

React TokenInput (react-customize-token-input)

A react token (tag) `controlled` input component, which support:

- Accept **customize data structure**.
- **Customize token (tag) Look & Feel** on the `label` [Demo](https://seawind543.github.io/react-token-input/#example-customize-label), `delete button` [Demo](https://seawind543.github.io/react-token-input/#example-customize-delete-button), or even override `the whole Token component` [Demo](https://seawind543.github.io/react-token-input/#example-customize-token-component).
- Customize **separate characters** for separate end-user input string. [Demo](https://seawind543.github.io/react-token-input/#example-customize-separators)
- **Inline editing** on exist token.
- **Paste** values. [Demo](https://seawind543.github.io/react-token-input/#example-customize-separators)
- **Preprocessing** function for **normalized** user input value.
It could be helpful to reproduce a single value into multiple values too. [Demo](https://seawind543.github.io/react-token-input/#example-preprocess)
- **Validate** function.



## Installation

1. Install the latest version of [react](https://github.com/facebook/react) and [react-customize-token-input](https://github.com/seawind543/react-token-input):

  ```
  yarn add react react-customize-token-input
  ```

2. At this point you can import `react-token-input` and its styles in your application by:

  ```javascript
  import TokenInput from 'react-customize-token-input';

  // Be sure to include styles at some point, probably during your bootstraping
  import 'react-customize-token-input/dist/react-customize-token-input.css';
  ```


## Dev

1. Run `yarn install` to install required packages.
2. Run `yarn dev` to launch `webpack-dev-server`.
3. After step 2, you will see following message output in command console.

```
｢wds｣: Project is running at http://0.0.0.0:8000/
｢wds｣: webpack output is served from /
｢wds｣: Content not from webpack is served from ../docs
```

> Note: To stop the program, just type ```ctrl + c``` in command console.

4. After step 3 complete, you could access `http://localhost:8000/` to see result.

## Usage

See Live Examples: https://seawind543.github.io/react-token-input/

Note: Sources code of Examples in the folder `examples`

## Props

```javascript
  // Assign style to the TokenInput
  style: PropTypes.object,

  // Assign className to the TokenInput
  className: PropTypes.string,

  // Specific TokenInput is `readOnly` or not
  readOnly: PropTypes.bool,

  // Specific TokenInput should be autoFocus or not
  autoFocus: PropTypes.bool,

  // Placeholder of TokenInput
  placeholder: PropTypes.string,

  /**
   * An array of characters for split the user input string.
   * For example,
   * Split the user input string `abc;def` into `['abc', 'def']`
   * by separators `[';']`
   *
   * Note:
   * It take the `String.prototype.split()` and `RegExp` to split the user input string.
   * Make sure your customized separators could be used with `RegExp`.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
   */
  separators: PropTypes.array,

  // [Required] An array of tokenValue of TokenInput
  tokenValues: PropTypes.array.isRequired,

  /**
   * A callback function invoked when tokenValues update
   *
   * onTokenValuesChange(modifiedTokenValues)
   *
   * @ modifiedTokenValues
   * Type: An array of tokenValue of TokenInput
   * Description: Updated tokenValues
   */
  onTokenValuesChange: PropTypes.func,

  /**
   * A callback function for preprocessing the user input string
   * (after it is split into `array of value`).
   *
   * Note: This function execute after `split` but before `onBuildTokenValue`
   *
   * [Use case 1]
   *  Make your normalize process in this function, such as `String.prototype.trim()`.
   *
   * [Use case 2]
   * Sometimes, we will want to auto-fit user input, this function could help with it.
   * For example, the user input string is `www.google.com`,
   * and we want to auto-fit it into `http://www.google.com` and `https://www.google.com`.
   *
   *
   * onPreprocess(inputStringValues)
   *
   * @ inputStringValues
   * Type: An array of string values
   * Description:
   * The user input string values // (split from the user input string by the `separators`)
   *
   * @ return
   * Type: An array of string values
   * Description: The values after preprocess
   */
  onPreprocess: PropTypes.func,

  /**
   * A callback function for building `user input string value` into
   * the `tokenValue` (customize data structure).
   *
   * Note: You could make your normalize process in this function too.
   *
   * onBuildTokenValue(stringValue)
   *
   * @ stringValue
   * Type: string
   * Description: The user input value // (A value split by separators)
   *
   * @ return
   * Type: any (string | number | object | customize data structure)
   * Description: customize data structure
   */
  onBuildTokenValue: PropTypes.func,

  /**
   * A callback function invoked when end-user typing but not become token yet
   *
   * onInputValueChange(newValue, previousValue)
   *
   * @ newValue
   * Type: string
   * Description: end-user input string
   *
   * @ previousValue
   * Type: string
   * Description: previous end-user input string
   */
  onInputValueChange: PropTypes.func,

  /**
   * A callback function for validate tokenValue
   *
   * onTokenValueValidate(tokenValue, tokenIndex, tokenValues)
   *
   * @ tokenValue
   * Type: any (string | number | object | customize data structure)
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenIndex
   * Type: number
   * Description: The array index for this tokenValue in tokenValues
   *
   * @ tokenValues
   * Type: array
   * Description: The array of tokenValue of TokenInput
   *
   * @ return
   * Type: any (string | number | object | customize data structure)
   * Description:
   * The customize error.
   * Specific the token's validate status or errorMessage.
   * Could be an error message to display or error object
   *
   * Will be use by `onGetTokenErrorMessage`
   */
  onTokenValueValidate: PropTypes.func,

  /**
   * A callback function for getting customizes `className` for a token
   *
   * onGetTokenClassName(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: any (string | number | object | customize data structure)
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Description: token's meta data
   *  {
   *    // A private key for render
   *    key: string,
   *
   *    // Specific the token is activated for `edit` or not
   *    activated: boolean,
   *
   *    // Customize data structure built by `onTokenValue Validate`
   *    // Specific the token's validate status or errorMessage
   *    error: any,
   *  }
   *
   * @ return
   * Type: string
   * Description: The customizes className
   */
  onGetTokenClassName: PropTypes.func,

  /**
   * A callback function for getting displayable `label` for a token
   * Apply this to customize the token's content
   * For example, render token with `icon` or `Additional text`
   *
   * onGetTokenDisplayLabel(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: any (string | number | object | customize data structure)
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Description: token's meta data
   *  {
   *    // A private key for render
   *    key: string,
   *
   *    // Specific the token is activated for `edit` or not
   *    activated: boolean,
   *
   *    // Customize data structure built by `onTokenValue Validate`
   *    // Specific the token's validate status or errorMessage
   *    error: any,
   *  }
   *
   * @ return
   * Type: string || react node
   * Description: The token's content.
   * By default, will apply `getDefaultTokenEditableValue`
   */
  onGetTokenDisplayLabel: PropTypes.func,

  /**
   * A callback function for render content of the delete button for a token
   * Apply this to customize the token's content of delete button
   * For example, replace the build-in x by Google font material-icons
   *
   * onRenderTokenDeleteButtonContent()
   *
   * @ return
   * Type: react node
   * Description: The content of the delete button of the token.
   * By default, TokenInput render a build-in x icon
   */
  onRenderTokenDeleteButtonContent: PropTypes.func,

  /**
   * A callback function for getting `string input value`
   * from `tokenValue` for the end-user to perform `edit`
   *
   * onGetTokenEditableValue(tokenValue)
   *
   * @ tokenValue
   * Type: any (string | number | object | customize data structure)
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ return
   * Type: string
   * Description: The value for end-user to `edit` in an input field
   */
  onGetTokenEditableValue: PropTypes.func,

  /**
   * A callback function for getting the error message from the customize error
   * The `customize error` is generate by `onTokenValueValidate`
   *
   * onGetTokenErrorMessage(tokenValue, tokenMeta)
   *
   * @ error
   * Type: customize error
   * Description: customize error
   *
   * @ return
   * Type: string | any
   * Description: The error message to describe an invalid token
   */
  onGetTokenErrorMessage: PropTypes.func,

  /**
   * A customize react functional component for rendering a token
   * Apply this to customize all token function.
   *
   * customizeTokenComponent={MyToken}
   */
  customizeTokenComponent: PropTypes.func,

```

### Beta props

```javascript
  /**
   * [Beta; Might be change in the future version]
   * Current only apply to Token Create
   *
   * The config settings to control the specials keyDown event handler behavior.
   * Default setting as below.
   * specialKeyDown: {
   *   onBackspace: 1,
   *   onEnter: 1,
   *   onEscape: 1,
   * },
   *
   * `0` means turn off (Took native browser behavior. TokenInput should NOT handle it).
   * `1` means apply TokenInput predefined event handler.
   *
   * Reference section below for Predefined event handlers.
   * `Predefined KeyDown Event Handlers`
   */
  specialKeyDown: PropTypes.object,
```

## Predefined KeyDown Event Handlers

TokenInput have following Predefined event handlers on each Special KeyDown.

### For Token Create

KeyDown    | Description | Note
---------- | ----------- | :---
Escape   | Clear the input value. | A.K.A. Reset.
Enter    | Create the token with the inputValue and continually focused on the inputBox for next inputting. |

### For Inline editing

KeyDown    | Description | Note
---------- | ----------- | :---
Escape   | End editing without change the value of the token. | A.K.A. Reset
Enter    | End editing and apply the new value. In case the new value is an `empty string`, will perform the `onEscape`. |

## Default value of optional Props

```javascript

    className: '',
    readOnly: false,
    autoFocus: false,
    placeholder: '',

    // TokenCreator
    separators: [
      ',',
      ';',
      '\n', // for copy and paste
      '\r', // for copy and paste
      '\r\n', // for copy and paste
    ];

    specialKeyDown: {
      onBackspace: 1,
      onEnter: 1,
      onEscape: 1,
    },

    onBuildTokenValue: buildDefaultTokenValue,

    onInputValueChange: () => {}, // Dummy function
  
    onTokenValueValidate: () => {}, // Dummy function

    // Token
    onGetTokenClassName: () => {}, // Dummy function
    onGetTokenDisplayLabel: getDefaultTokenEditableValue,
    onGetTokenEditableValue: getDefaultTokenEditableValue,
    onGetTokenErrorMessage: getDefaultTokenErrorMessage,
```

## Props of customizeTokenComponent

Could also reference this [Example Demo](https://seawind543.github.io/react-token-input/#example-customize-token-component) and its source code `ExampleCustomizeToken` from the folder `examples`.

```javascript
  // Same as props of TokenInput
  readOnly: PropTypes.bool.isRequired,
  // tokenValue of token
  tokenValue: PropTypes.any.isRequired,
  // tokenMeta of token
  tokenMeta: PropTypes.object.isRequired,

  // Same as props `onGetTokenClassName` of TokenInput
  onGetClassName: PropTypes.func.isRequired,
  // Same as props `onGetTokenDisplayLabel` of TokenInput
  onGetDisplayLabel: PropTypes.func.isRequired,
  // Same as props `onRenderTokenDeleteButtonContent` of TokenInput
  onRenderDeleteButtonContent: PropTypes.func,
  // Same as props `onGetTokenEditableValue` of TokenInput
  onGetEditableValue: PropTypes.func.isRequired,
  // Same as props `onGetTokenErrorMessage` of TokenInput
  onGetErrorMessage: PropTypes.func.isRequired,

  // Editing
  // Same as props `onBuildTokenValue` of TokenInput
  onBuildTokenValue: PropTypes.func.isRequired,

  /**
   * A callback function, which should be `invoked` when end-user `start editing`
   *
   * Note:
   * Call this function to tell TokenInput it is start to editing the token.
   * As result, TokenInput will set `tokenMeta.activate` to `true`
   *
   * onEditStart()
   *
   * @ return
   * Type: void
   */
  onEditStart: PropTypes.func.isRequired,

  /**
   * A callback function, which should be `invoked` when end-user `end editing`
   *
   * Note:
   * Call this function to tell TokenInput it is finish editing the token.
   * As result, TokenInput will set `tokenMeta.activate` to `false`
   *
   * onEditEnd(newTokenValue?)
   *
   * @ newTokenValue
   * Type: undefined | any (string | number | object | customize data structure)
   * Description:
   * The new tokenValue build by `onBuildTokenValue.
   * TokenInput will update it, and
   * TokenInput will call `onTokenValuesChange`
   *
   * Note:
   * When newTokenValue is `undefined`,
   * TokenInput will treat as `Cancel` (End without update newTokenValue).
   * The `onTokenValuesChange` will not be called.
   *
   * @ return
   * Type: void
   */
  onEditEnd: PropTypes.func.isRequired,

  /**
   * A callback function, which should be `invoked` when end-user `delete` the token
   *
   * Note:
   * Call this function to tell TokenInput to delete the token.
   * As result, TokenInput will remove it, and
   * TokenInput will call `onTokenValuesChange` to update tokenValues.
   *
   * onDelete()
   *
   * @ return
   * Type: void
   */
  onDelete: PropTypes.func.isRequired,
```

## License

[MIT](./LICENSE)