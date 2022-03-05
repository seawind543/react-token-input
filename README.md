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
type Props<ValueType, ErrorType> = {
  // Assign style to the TokenInput
  style?: CSSProperties;

  // Assign className to the TokenInput
  className?: string;

  // Specific TokenInput is `readOnly` or not
  readOnly?: boolean;

  // Specific TokenInput should be autoFocus or not
  autoFocus?: boolean;

  // Placeholder of TokenInput
  placeholder?: string;

  // The array of tokenValue of TokenInput
  tokenValues: TokenValue<ValueType>[];

  /**
   * TokenCreator props
   */

  /**
   * An array of characters to split the user input string into array.
   * For example,
   * Split the user input string `abc;def` into `['abc', 'def']`
   * by separators `[';']`
   *
   * Note:
   * It take the `String.prototype.split()` and `RegExp` to split the user input string.
   * Make sure your customized separators could be used with `RegExp`.
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
   */
  separators?: TokenSeparator[];

  /**
   * A callback function invoked when end-user typing but not become token yet
   *
   * onInputValueChange(newValue, previousValue)
   *
   * @ newValue
   * Type: InputString
   * Description: end-user's input string
   *
   * @ previousValue
   * Type: InputString
   * Description: previous end-user's input string
   */
  onInputValueChange?: OnInputValueChange;

  /**
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
   * onPreprocess(inputStringValues)
   *
   * @ inputStringValues
   * Type: InputString[]
   * Description:
   * The user input string values // (split by the `separators`)
   *
   * @ return
   * Type: InputString[]
   * Description: The values after preprocess
   */
  onPreprocess?: OnPreprocess;

  /**
   * A callback function to validate tokenValue
   *
   * onTokenValueValidate(tokenValue, tokenIndex, tokenValues)
   *
   * @ tokenValue
   * Type: any (string | number | object | customize data structure)
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenIndex
   * Type: number
   * Description: The array index of this tokenValue in tokenValues
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
  onTokenValueValidate?: OnTokenValueValidate<ValueType, ErrorType>;

  /**
   * Token props
   */

  /**
   * A callback function invoked when tokenValues update
   *
   * onTokenValuesChange(modifiedTokenValues)
   *
   * @ modifiedTokenValues
   * Type: TokenValue<ValueType>[]
   * Description: the new tokenValues
   */
  onTokenValuesChange?: OnTokenValuesChange<ValueType>;

  /**
   * A callback function to building `user input string value` into
   * the `tokenValue` (customize data structure).
   *
   * Note: You could make your normalize process in this function too.
   *
   * onBuildTokenValue(inputString)
   *
   * @ inputString
   * Type: InputString
   * Description: The user input value // (A value split by TokenSeparator[])
   *
   * @ return
   * Type: TokenValue<ValueType>
   * Description: customize data structure TokenValue
   */
  onBuildTokenValue?: OnBuildTokenValue<ValueType>;

  /**
   * A customize react functional component to rendering a token
   * Apply this to customize all token function.
   *
   * customizeTokenComponent={MyToken}
   */
  // TODO: make detail type for props
  customizeTokenComponent?: FunctionComponent<TokenProps<ValueType, ErrorType>>;

  /**
   * A callback function to getting customizes `className` to set on a `token`
   *
   * onGetTokenClassName(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: TokenValue<ValueType>
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Type: TokenMeta<ErrorType>
   * Description: token's meta data
   *
   * @ return
   * Type: string
   * Description: The customizes className
   */
  onGetTokenClassName?: OnGetTokenClassName<ValueType, ErrorType>;

  /**
   * A callback function to getting displayable `label` of a token
   * Apply this to customize the token's content
   * For example, render token with `icon` or `Additional text`
   *
   * onGetTokenDisplayLabel(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: TokenValue<ValueType>
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Type: TokenMeta<ErrorType>
   * Description: token's meta data
   *
   * @ return
   * Type: InputString | ReactNode
   * Description: The token's content.
   * By default, will apply `getDefaultTokenEditableValue`
   */
  onGetTokenDisplayLabel?: OnGetTokenDisplayLabel<ValueType, ErrorType>;

  /**
   * A callback function to render content of the delete button of token
   * Apply this to customize the token's content of the delete button
   * For example, replace the build-in `x` by Google font material-icons
   *
   * onRenderTokenDeleteButtonContent()
   *
   * @ return
   * Type: ReactNode
   * Description: The content of the delete button of the token.
   * By default, TokenInput render a build-in `x` icon
   */
  onRenderTokenDeleteButtonContent?: OnRenderTokenDeleteButtonContent;

  /**
   * A callback function to determine whether the token is `inline editable`.
   * By default, TokenInput will render a `inline editable` token.
   *
   * onGetIsTokenEditable(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: TokenValue<ValueType>
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Type: TokenMeta<ErrorType>
   * Description: token's meta data
   *
   * @ return
   * Type: boolean
   * Description: `true` if editable. `false` if not.
   */
  onGetIsTokenEditable?: OnGetIsTokenEditable<ValueType, ErrorType>;

  /**
   * A callback function to getting `string input value`
   * from `tokenValue` for the end-user to perform `inline edit`
   *
   * onGetTokenEditableValue(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: TokenValue<ValueType>
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Type: TokenMeta<ErrorType>
   * Description: token's meta data
   *
   * @ return
   * Type: InputString
   * Description: The value for end-user to `edit` in an input field
   */
  onGetTokenEditableValue?: OnGetTokenEditableValue<ValueType, ErrorType>;

  /**
   * A callback function to getting the error message from the customize error
   * The `customize error` is generate by `onTokenValueValidate`
   *
   * onGetTokenErrorMessage(tokenValue, tokenMeta)
   *
   * @ tokenValue
   * Type: TokenValue<ValueType>
   * Description: The tokenValue build by `onBuildTokenValue`
   *
   * @ tokenMeta
   * Type: TokenMeta<ErrorType>
   * Description: token's meta data
   *
   * @ return
   * Type: undefined | DefaultErrorType | ErrorType
   * Description: The error message to describe an invalid token
   */
  onGetTokenErrorMessage?: OnGetTokenErrorMessage<ValueType, ErrorType>;
};
```

### Beta props

```JavaScript

  /**
   * [Beta; Might be change in the future version]
   * Current only apply to the `TokenCreator`
   *
   * The settings to control the behavior of specials keyDown's event handler.
   * Recommend to use the build-in constant `KEY_DOWN_HANDLER_CONFIG_OPTION` to config the setting.
   *
   * `KEY_DOWN_HANDLER_CONFIG_OPTION.OFF` means turn `off`
   * (Took native browser behavior. The TokenInput should NOT handle it).
   *
   * `KEY_DOWN_HANDLER_CONFIG_OPTION.ON` means apply TokenInput predefined event handler.
   *
   * Default setting as below.
   * specialKeyDown: {
   *   onBackspace: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
   *   onTab: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF,
   *   onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
   *   onEscape: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
   * },
   */
  specialKeyDown?: SpecialKeyDownConfig;
```

## Predefined KeyDown Event Handlers

TokenInput has the following **Predefined** KeyDown event handlers.

### For Token Create

KeyDown    | Description   | Note
---------- | :------------ | :---
Backspace  | In case the value is an `empty string`, the latest **token** in the list tail will be deleted. |
Escape     | Clear the input value. | A.K.A. Reset.
Enter      | Create a token with the inputValue and continually focused on the inputBox for the next inputting. |
Tab  | Same as onEnter.  | <ul> <li>Default not apply</li> <li>Under Beta</li> </ul>

### For Inline editing

KeyDown    | Description | Note
---------- | :---------- | :---
Escape     | End editing without change the value of the token. | A.K.A. Reset
Enter      | End editing and apply the new value. In case the new value is an `empty string`, will perform the `onEscape`. |

## Default value of optional Props

```JavaScript
    style = undefined,
    className = undefined,
    readOnly = false,
    autoFocus = false,
    placeholder = undefined,

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

Could also reference this [Example Demo](https://seawind543.github.io/react-token-input/#example-customize-token-component) and its source code `ExampleCustomizeToken` from the folder `examples`.

```JavaScript
type Props<ValueType, ErrorType> = {
  // Same as props of TokenInput
  readOnly: boolean;
  // tokenValue of token
  tokenValue: TokenValue<ValueType>;
  // tokenMeta of token
  tokenMeta: TokenMeta<ErrorType>;

  // Same as props `onGetTokenClassName` of TokenInput
  onGetClassName?: OnGetTokenClassName<ValueType, ErrorType>;
  // Same as props `onGetTokenDisplayLabel` of TokenInput
  onGetDisplayLabel: OnGetTokenDisplayLabel<ValueType, ErrorType>;
  // Same as props `onRenderTokenDeleteButtonContent` of TokenInput
  onRenderDeleteButtonContent?: OnRenderTokenDeleteButtonContent;

  // Same as props `onGetIsTokenEditable` of TokenInput
  onGetIsEditable: OnGetIsTokenEditable<ValueType, ErrorType>;
  // Same as props `onGetTokenEditableValue` of TokenInput
  onGetEditableValue: OnGetTokenEditableValue<ValueType, ErrorType>;
  // Same as props `onBuildTokenValue` of TokenInput
  onBuildTokenValue: OnBuildTokenValue<ValueType>;
  // Same as props `onGetTokenErrorMessage` of TokenInput
  onGetErrorMessage: OnGetTokenErrorMessage<ValueType, ErrorType>;

  /**
   * A callback function, which should be `invoked`
   * when end-user `start editing`
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
  onEditStart: () => void;

  /**
   * A callback function, which should be `invoked`
   * when end-user `end editing`
   *
   * Note:
   * Call this function to tell TokenInput to finish the `editing` of the token.
   * As result, TokenInput will set `tokenMeta.activate` to `false`.
   *
   * Also, TokenInput will based on the value of the parameter newTokenValue to
   * update the tokenValue of the token,
   * and call `onTokenValuesChange`
   *
   * onEditEnd(newTokenValue?)
   *
   * @ newTokenValue
   * Type: undefined | TokenValue<ValueType>
   * Description:
   * The new tokenValue build by `onBuildTokenValue.
   *
   * Note:
   * if `newTokenValue` is `undefined`,
   * TokenInput will treat as `Cancel` (Edit will end without update the tokenValue).
   * The `onTokenValuesChange` will also not be called.
   *
   * @ return
   * Type: void
   */
  onEditEnd: (newTokenValue?: TokenValue<ValueType>) => void;

  /**
   * A callback function, which should be `invoked`
   * when end-user `delete` the token
   *
   * Note:
   * Call this function to tell TokenInput to delete the token.
   * As result, TokenInput will remove the token,
   * and call `onTokenValuesChange` to update tokenValues.
   *
   * onDelete()
   *
   * @ return
   * Type: void
   */
  onDelete: () => void;
};
```

## License

[MIT](./LICENSE)