# React TokenInput [![build status](https://travis-ci.org/seawind543/react-token-input.svg?branch=master)](https://travis-ci.org/seawind543/react-token-input) [![Coverage Status](https://coveralls.io/repos/github/seawind543/react-token-input/badge.svg?branch=master)](https://coveralls.io/github/seawind543/react-token-input?branch=master)

[![NPM](https://nodei.co/npm/react-customize-token-input.png?downloads=true&stars=true)](https://www.npmjs.com/package/react-customize-token-input/)

Live Demo: https://seawind543.github.io/react-token-input/

React TokenInput (react-customize-token-input)

A react token (tag) `controlled` input component, which support:

- Accept **customize data structure**.
- **Customize token (tag) Look & Feel** on the `label` [Demo](https://seawind543.github.io/react-token-input/#example-customize-label), `delete button` [Demo](https://seawind543.github.io/react-token-input/#example-customize-delete-button), or even override `the whole Token component` [Demo](https://seawind543.github.io/react-token-input/#example-customize-token-component).
- Customize **separate characters** to separate the end-user input string. [Demo](https://seawind543.github.io/react-token-input/#example-customize-separators)
- **Inline editing** on exist token.
- **Paste** values. [Demo](https://seawind543.github.io/react-token-input/#example-customize-separators)
- **Preprocessing** function to **normalized** user input value.
It could be helpful to reproduce a single value into multiple values too. [Demo](https://seawind543.github.io/react-token-input/#example-preprocess)
- **Validate** function.

## Installation

1. Install the latest version of [react](https://github.com/facebook/react) and [react-customize-token-input](https://github.com/seawind543/react-token-input):

  ```
  yarn add react react-customize-token-input
  ```

2. At this point you can import `react-customize-token-input` and its styles in your application by:

  ```JavaScript
  import TokenInput from 'react-customize-token-input';

  // Be sure to include styles at some point, probably during your bootstraping
  import 'react-customize-token-input/dist/react-customize-token-input.css';

  // Could find the not minimize version to easily customize style from:
  // 'react-customize-token-input/dist/react-customize-token-input.original.css';
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

```JavaScript
/**
 * @template ValueType, ErrorType
 * @typedef {Object} TokenInputProps
 */
interface TokenInputProps<ValueType = string, ErrorType = string> {
  /**
   * @prop {CSSProperties} [style]
   * @description An optional prop for assign style to the TokenInput
   */
  style?: CSSProperties;

  /**
   * @prop {string} [className]
   * @description An optional prop for assign class name to the TokenInput
   */
  className?: string;

  /**
   * @prop {string} [placeholder]
   * @description An optional prop for assign placeholder to the TokenInput
   */
  placeholder?: string;

  /**
   * @prop {boolean} [readOnly = false]
   * @description An optional prop to specific TokenInput is `readOnly` mode or not
   */
  readOnly?: boolean;

  /**
   * @prop {boolean} [autoFocus = false]
   * @description An optional prop to specific TokenInput is `autoFocus` mode or not
   */
  autoFocus?: boolean;

  /**
   * @template ValueType
   * @prop {ValueType[]} tokenValues
   * @description
   * The array of tokenValue of TokenInput.
   * This array will be used to render the tokens.
   *
   * Type: ValueType
   * Description:
   * Customize data structure data
   * Could be string | number | object | customized data structure...etc.
   */
  tokenValues: ValueType[];

  // TokenCreator props

  /**
   * @prop {TokenSeparator[]} [separators]
   * @description
   * An array of characters to split the user input string into array.
   * For example,
   * Split the user input string `abc;def` into `['abc', 'def']`
   * by separators `[';']`
   *
   * @see {@link TokenSeparator}
   * Note:
   * It take the `String.prototype.split(separators.join('|'))`
   * and `RegExp` to split the user input string.
   * 
   * @example
   * ```js
   * value.split(separators.join('|'));
   * ```
   *
   * Make sure your customized separators could be used with
   * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)[`RegExp`]}.
   */
  separators?: TokenSeparator[];


  /**
   * @prop {SpecialKeyDownConfig} [specialKeyDown=DEFAULT_SPECIAL_KEY_DOWN_CONFIG]
   * @description
   * [Beta; Might be change in the future version]
   * Current only apply to the `TokenCreator`
   *
   * The settings to control the behavior of specials keyDown's event handler.
   * Recommend to use the built-in constant `KEY_DOWN_HANDLER_CONFIG_OPTION` to config the setting.
   *
   * @see KEY_DOWN_HANDLER_CONFIG_OPTION for the accepted config values
   * @see DEFAULT_SPECIAL_KEY_DOWN_CONFIG for the default settings
   */
  specialKeyDown?: SpecialKeyDownConfig;

  /**
   * @prop {OnInputValueChange} [onInputValueChange]
   * @description
   * A callback function invoked when end-user typing but not become token yet
   *
   * @example
   * ```js
   * onInputValueChange(newValue, previousValue)
   * ```
   *
   * @param {InputString} newValue
   * The end-user's input string
   *
   * @param {InputString} previousValue
   * The previous input string
   *
   * @returns {void}
   */
  onInputValueChange?: OnInputValueChange;

  /**
   * @prop {OnPreprocess} [onPreprocess]
   * @description
   * A callback function to `preprocessing` the user input string.
   *
   * Note: This function execute after `split by TokenSeparator[]` but before `onBuildTokenValue`
   * inputString -> spilt(inputString) -> preprocess(spilt(inputString)) -> onBuildTokenValue(preprocess(spilt(inputString)))
   *
   * [Use case 1]
   *  Make your normalize process in this function, such as `String.prototype.trim()`.
   *
   * [Use case 2]
   * Sometimes, we will want to auto-fit the user input, this function could help with it.
   * For example, the user input string is `www.google.com`,
   * and we want to auto-fit it into `http://www.google.com` and `https://www.google.com`.
   *
   * @example
   * ```js
   * onPreprocess(inputStringValues)
   * ```
   *
   * @param {InputString[]} inputStringValues
   * The user input string values
   * (An array of string, which split from the original input string via the `separators`)
   *
   * @returns {InputString[]}
   * An array of string
   */
  onPreprocess?: OnPreprocess;

  /**
   * @template ValueType, ErrorType
   * @prop {OnTokenValueValidate<ValueType, ErrorType>} [onTokenValueValidate=defaultTokenValueValidate]
   * @description
   * A callback function to validate a tokenValue
   * (The returned result will be set into the TokenMeta & pass to `onGetTokenErrorMessage`)
   *
   * @example
   * ```js
   * onTokenValueValidate(tokenValue, tokenIndex, tokenValues)
   * ```
   *
   * @param {ValueType} tokenValue
   * The tokenValue build by `onBuildTokenValue`
   *
   * @param {TokenIndex} tokenIndex
   * The array index of this tokenValue in tokenValues
   *
   * @param {ValueType[]} tokenValues
   * The array of tokenValue of TokenInput
   *
   * @returns {TokenMeta<ErrorType>['error']}
   * The customized error.
   * Specific the token's validate status or errorMessage.
   * Could be `an error message` to display, or an error object for further operations.
   *
   * @see TokenMeta for more information about TokenMeta<ErrorType>['error']
   *
   * Note: Return `Nullish` types means the token is valid.
   * @see Nullish
   */
  onTokenValueValidate?: OnTokenValueValidate<ValueType, ErrorType>;

  // Token related props

  /**
   * @template ValueType
   * @prop {OnTokenValuesChange<ValueType>} [onTokenValuesChange]
   * @description
   * A callback function invoked when tokenValues update
   *
   * @example
   * ```js
   * onTokenValuesChange(modifiedTokenValues)
   * ```
   *
   * @param {ValueType[]} modifiedTokenValues
   * The new tokenValues
   *
   * @returns {void}
   */
  onTokenValuesChange?: OnTokenValuesChange<ValueType>;

  /**
   * @template ValueType
   * @prop {OnBuildTokenValue<ValueType>} [onBuildTokenValue=defaultBuildTokenValue]
   * @description
   * A callback function to build `user input string value` into
   * the `tokenValue` (customized data structure).
   *
   * Note: You could make your normalize process in this function too.
   *
   * @example
   * ```js
   * onBuildTokenValue(inputString)
   * ```
   *
   * @param {InputString} inputString
   * The user input value // (A value split by TokenSeparator[])
   * Example:
   * - Input string "ABC, DEF" and separators is `,`
   * - The `onBuildTokenValue` will be called twice as
   * ```
   * onBuildTokenValue('ABC') and onBuildTokenValue('DEF')
   * ```
   *
   * @returns {ValueType}
   * The customized data structure data
   * Could be string | number | object | customized data structure...etc.
   */
  onBuildTokenValue?: OnBuildTokenValue<ValueType>;

  /**
   * @prop {Component} [customizeTokenComponent]
   * A customize react component to rendering a token
   * Apply this to customize all token function.
   *
   * @example
   * ```js
   * customizeTokenComponent={MyToken}
   * ```
   *
   * @returns {ReactElement | null}
   */
  customizeTokenComponent?: (
    props: TokenProps<ValueType, ErrorType>
  ) => ReactElement | null;

  /**
   * @template ValueType, ErrorType
   * @prop {OnGetTokenClassName<ValueType, ErrorType>} [onGetTokenClassName]
   * @description
   * A callback function to getting customizes `className` to set on a `token`
   *
   * ```js
   * onGetTokenClassName(tokenValue, tokenMeta)
   * ```
   *
   * @param {ValueType} tokenValue
   * The tokenValue build by `onBuildTokenValue`
   *
   * @param {TokenMeta<ErrorType>} tokenMeta
   * The token's meta data
   *
   * @returns {undefined | string}
   * The customizes className
   */
  onGetTokenClassName?: OnGetTokenClassName<ValueType, ErrorType>;

  /**
   * @template ValueType, ErrorType
   * @prop  {OnGetTokenDisplayLabel<ValueType, ErrorType>} [onGetTokenDisplayLabel=defaultGetTokenEditableValue]
   * @description
   * A callback function to getting displayable `label` of a token
   * Apply this to customize the token's content
   * For example, render token with `icon` or `Additional text`
   *
   * @example
   * ```js
   * onGetTokenDisplayLabel(tokenValue, tokenMeta)
   * ```
   *
   * @param {ValueType} tokenValue
   * The tokenValue build by `onBuildTokenValue`
   *
   * @param {TokenMeta<ErrorType>} tokenMeta
   * The token's meta data
   *
   * @returns {InputString | ReactNode}
   * The token's display content.
   */
  onGetTokenDisplayLabel?: OnGetTokenDisplayLabel<ValueType, ErrorType>;

  /**
   * @prop {OnRenderTokenDeleteButtonContent} [onRenderTokenDeleteButtonContent]
   * @description
   * A callback function to render content of the delete button of token
   * Apply this to customize the token's content of the delete button.
   * For example, replace the built-in `x` by Google font material-icons
   *
   * @example
   * ```js
   * onRenderTokenDeleteButtonContent()
   * ```
   *
   * @returns {ReactNode}
   * The content of the delete button of the token.
   * By default, TokenInput render a built-in `x` icon
   */
  onRenderTokenDeleteButtonContent?: OnRenderTokenDeleteButtonContent;

  /**
   * @template ValueType, ErrorType
   * @prop {OnGetIsTokenEditable<ValueType, ErrorType>} [onGetIsTokenEditable=defaultGetIsTokenEditable]
   * @description
   * A callback function to determine whether the token is `inline editable`.
   *
   * @example
   * ```js
   * onGetIsTokenEditable(tokenValue, tokenMeta)
   * ```
   *
   * @param {ValueType} tokenValue
   * The tokenValue build by `onBuildTokenValue`
   *
   * @param {TokenMeta<ErrorType>} tokenMeta
   * The token's meta data
   *
   * @returns {boolean}
   * - `true`: Editable.
   * - `false`: Not editable.
   */
  onGetIsTokenEditable?: OnGetIsTokenEditable<ValueType, ErrorType>;

  /**
   * @template ValueType, ErrorType
   * @prop {OnGetTokenEditableValue<ValueType, ErrorType>} [onGetTokenEditableValue=defaultGetTokenEditableValue]
   * @description
   * A callback function to getting `string input value`
   * from `tokenValue` for the end-user to perform `inline edit`
   *
   * @example
   * ```js
   * onGetTokenEditableValue(tokenValue, tokenMeta)
   * ```
   *
   * @param {ValueType} tokenValue
   * The tokenValue build by `onBuildTokenValue`
   *
   * @param {TokenMeta<ErrorType>} tokenMeta
   * The token's meta data
   *
   * @returns {InputString}
   * The value for end-user to `edit` in an input field
   */
  onGetTokenEditableValue?: OnGetTokenEditableValue<ValueType, ErrorType>;

  /**
   * @template ValueType, ErrorType
   * @prop {OnGetTokenErrorMessage<ValueType, ErrorType>} [onGetTokenErrorMessage=defaultGetTokenErrorMessage]
   * @description
   * A callback function to getting the `Error Message` to
   * apply into the `title` attribute of the built-in Token Component
   *
   * @example
   * ```js
   * onGetTokenErrorMessage(tokenValue, tokenMeta)
   * ```
   *
   * @param {ValueType} tokenValue
   * The tokenValue build by `onBuildTokenValue`
   *
   * @param {TokenMeta<ErrorType>} tokenMeta
   * The token's meta data
   *
   * @returns {string | Nullish}
   * The `Error Message` of the token.
   * Return `string type` will let the built-in Token component apply the message
   * into the `title` attribute. Otherwise, will simply be ignored
   */
  onGetTokenErrorMessage?: OnGetTokenErrorMessage<ValueType, ErrorType>;

  /**
   * @prop {React.FocusEventHandler<HTMLInputElement>} [onCreatorFocus]
   * @description
   * A callback function invoked on TokenCreator focused
   *
   * @example
   * ```js
   * onCreatorFocus(e)
   * ```
   *
   * @param {React.FocusEvent<HTMLInputElement>} event
   * The FocusEvent of the input of TokenCreator
   *
   * @returns {void}
   */
  onCreatorFocus?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * @prop {React.FocusEventHandler<HTMLInputElement>} [onCreatorBlur]
   * @description
   * A callback function invoked on TokenCreator blur
   *
   * @example
   * ```js
   * onCreatorBlur(e)
   * ```
   *
   * @param {React.FocusEvent<HTMLInputElement>} event
   * The FocusEvent of the input of TokenCreator
   *
   * @returns {void}
   */
  onCreatorBlur?: React.FocusEventHandler<HTMLInputElement>;
}
```

## Predefined KeyDown Event Handlers

TokenInput has the following **Predefined** KeyDown event handlers.

### For Token Create

KeyDown    | Description   | Note
---------- | :------------ | :---
Backspace  | In case the current inputValue is an `empty string`, the latest **token** in the list tail will be deleted. |
Escape     | Clear the input-box's value. | A.K.A. Reset.
Enter      | Create a token with the inputValue and continually focused on the inputBox for the next inputting. |
Tab  | Same as onEnter.  | <ul> <li>Default not apply</li> <li>Under Beta</li> </ul>

### For Inline editing

KeyDown    | Description | Note
---------- | :---------- | :---
Escape     | End editing without change the value of the token. | A.K.A. Reset
Enter      | End editing and apply the new value. In case the new value is an `empty string`, will perform the `onEscape`. |

## Default value of the optional Props

```JavaScript
    style = undefined,
    className = undefined,
    placeholder = undefined,
    readOnly = false,
    autoFocus = false,

    // TokenCreator
    separators = DEFAULT_SEPARATORS,
    /*
    [
      ',',
      ';',
      '\n', // for copy and paste
      '\r', // for copy and paste
      '\r\n', // for copy and paste
    ];
    */

    specialKeyDown = DEFAULT_SPECIAL_KEY_DOWN_CONFIG,
    /*
    {
      onBackspace: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
      onTab: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF,
      onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
      onEscape: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
    },
    */

    onInputValueChange = undefined,
    onPreprocess = undefined,

    onTokenValueValidate = defaultTokenValueValidate,

    onTokenValuesChange = undefined,

    // Token
    onBuildTokenValue = defaultBuildTokenValue,

    customizeTokenComponent = undefined,
    onGetTokenClassName = undefined,

    onGetTokenDisplayLabel = defaultGetTokenEditableValue,

    onRenderTokenDeleteButtonContent = undefined,

    onGetIsTokenEditable = defaultGetIsTokenEditable,
    onGetTokenEditableValue = defaultGetTokenEditableValue,
    onGetTokenErrorMessage = defaultGetTokenErrorMessage,
```

## Props of customizeTokenComponent

Your CustomizeTokenComponent will receive these props from the TokenInput. You could decide where & how to use them to Customize your Token component.

Could also reference this [Example Demo](https://seawind543.github.io/react-token-input/#example-customize-token-component) and its source code `ExampleCustomizeToken` from the folder `examples`.

```JavaScript
/**
 * @template ValueType, ErrorType
 * @typedef {Object} TokenProps
 */
export interface TokenProps<ValueType = string, ErrorType = string> {
  /**
   * @property {boolean} readOnly
   * @description
   * Same as TokenInputProps {@see TokenInputProps[readOnly]}
   */
  readOnly: boolean;

  /**
   * @type {ValueType}
   * @description This token's tokenValue
   */
  tokenValue: ValueType;
  /**
   * @template ErrorType
   * @type {TokenMeta<ErrorType>} tokenMeta
   * @description This token's meta data
   */
  tokenMeta: TokenMeta<ErrorType>;

  /**
   * @template ValueType, ErrorType
   * @prop {OnGetTokenClassName<ValueType, ErrorType>} [onGetClassName]
   * @description
   * Same as TokenInputProps {@see TokenInputProps[onGetTokenClassName]}
   */
  onGetClassName?: OnGetTokenClassName<ValueType, ErrorType>;

  /**
   * @template ValueType, ErrorType
   * @prop  {OnGetTokenDisplayLabel<ValueType, ErrorType>} [onGetTokenDisplayLabel=defaultGetTokenEditableValue]
   * @description
   * Same as TokenInputProps {@see TokenInputProps[onGetTokenDisplayLabel]}
   */
  onGetDisplayLabel: OnGetTokenDisplayLabel<ValueType, ErrorType>;

  /**
   * @callback OnRenderTokenDeleteButtonContent
   * @description
   * Same as TokenInputProps {@see TokenInputProps[onRenderTokenDeleteButtonContent]}
   */
  onRenderDeleteButtonContent?: OnRenderTokenDeleteButtonContent;

  /**
   * @template ValueType, ErrorType
   * @callback OnGetIsTokenEditable
   * @description
   * Same as TokenInputProps {@see TokenInputProps[onGetIsTokenEditable]}
   */
  onGetIsEditable: OnGetIsTokenEditable<ValueType, ErrorType>;

  /**
   * @template ValueType, ErrorType
   * @callback OnGetTokenEditableValue
   * @description
   * Same as TokenInputProps {@see TokenInputProps[onGetTokenEditableValue]}
   */
  onGetEditableValue: OnGetTokenEditableValue<ValueType, ErrorType>;

  /**
   * @template ValueType
   * @callback OnBuildTokenValue
   * @description
   * Same as TokenInputProps {@see TokenInputProps[onBuildTokenValue]}
   */
  onBuildTokenValue: OnBuildTokenValue<ValueType>;

  /**
   * @template ValueType, ErrorType
   * @callback OnGetTokenErrorMessage
   * @description
   * Same as TokenInputProps {@see TokenInputProps[onGetTokenErrorMessage]}
   */
  onGetErrorMessage: OnGetTokenErrorMessage<ValueType, ErrorType>;

  /**
   * @callback
   * @description
   * A callback function, which you should `call`
   * when the end-user `start editing`
   *
   * Note:
   * Call this function to tell TokenInput it is start to editing the token.
   * As result, TokenInput will set `tokenMeta.activate` to `true`
   *
   * @example
   * ```js
   * onEditStart()
   * ```
   *
   * @returns {void}
   */
  onEditStart: () => void;

  /**
   * @callback
   * @description
   * A callback function, which you should `call`
   * when end-user `end the edit`
   *
   * Note:
   * Call this function to tell TokenInput to finish the `editing` of the token.
   * As result, TokenInput will set `tokenMeta.activate` to `false`.
   *
   * Also, TokenInput will based on the value of the parameter newTokenValue to
   * update the tokenValue of the token,
   * and call the callback `onTokenValuesChange`
   *
   * @example
   * ```js
   * onEditEnd(newTokenValue);
   * // or
   * onEditEnd();
   * ```
   *
   * @param {ValueType} [newTokenValue]
   * The new tokenValue build by `onBuildTokenValue.
   *
   * Note:
   * if `newTokenValue` is `undefined`,
   * TokenInput will treat as `Cancel` (Edit will end without update the tokenValue).
   * The callback `onTokenValuesChange` will also not be called.
   *
   * @returns {void}
   */
  onEditEnd: (newTokenValue?: ValueType) => void;

  /**
   * @callback
   * @description
   * A callback function, which you should `call`
   * when the end-user `delete` the token
   *
   * Note:
   * Call this function to tell TokenInput to delete the token.
   * As result, TokenInput will remove the token,
   * and call `onTokenValuesChange` to update tokenValues.
   *
   * @example
   * ```js
   * onDelete()
   * ```
   *
   * @returns {void}
   */
  onDelete: () => void;
}
```

## License

[MIT](./LICENSE)