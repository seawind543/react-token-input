import type { ReactNode } from 'react';
import { InputString, Nullish } from './mix';
import { TokenIndex, TokenMeta } from './token';

/**
 * @callback OnInputValueChange
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
export interface OnInputValueChange {
  (newValue: InputString, previousValue: InputString): void;
}

/**
 * @callback OnPreprocess
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
export interface OnPreprocess {
  (values: InputString[]): InputString[];
}

/**
 * @template ValueType
 * @callback OnBuildTokenValue
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
export interface OnBuildTokenValue<ValueType> {
  (inputValue: InputString): ValueType;
}

/**
 * @template ValueType
 * @callback OnTokenValuesChange
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
export interface OnTokenValuesChange<ValueType> {
  (modifiedTokenValues: ValueType[]): void;
}

/**
 * @template ValueType, ErrorType
 * @callback OnTokenValueValidate
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
export interface OnTokenValueValidate<ValueType, ErrorType> {
  (
    tokenValue: ValueType,
    tokenIndex: TokenIndex,
    tokenValues: ValueType[]
  ): TokenMeta<ErrorType>['error'];
}

/**
 * @template ValueType, ErrorType
 * @callback OnGetTokenClassName
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
export interface OnGetTokenClassName<ValueType, ErrorType> {
  (tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>): undefined | string;
}

/**
 * @template ValueType, ErrorType
 * @callback OnGetTokenDisplayLabel
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
export interface OnGetTokenDisplayLabel<ValueType, ErrorType> {
  (tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>):
    | InputString
    | ReactNode;
}

/**
 * @callback OnRenderTokenDeleteButtonContent
 * @description
 * A callback function to render content of the delete button of token
 * Apply this to customize the token's content of the delete button.
 * For example, replace the build-in `x` by Google font material-icons
 *
 * @example
 * ```js
 * onRenderTokenDeleteButtonContent()
 * ```
 *
 * @returns {ReactNode}
 * The content of the delete button of the token.
 */
export interface OnRenderTokenDeleteButtonContent {
  (): ReactNode;
}

/**
 * @template ValueType, ErrorType
 * @callback OnGetIsTokenEditable
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
export interface OnGetIsTokenEditable<ValueType, ErrorType> {
  (tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>): boolean;
}

/**
 * @template ValueType, ErrorType
 * @callback OnGetTokenEditableValue
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
export interface OnGetTokenEditableValue<ValueType, ErrorType> {
  (tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>): InputString;
}

/**
 * @template ValueType, ErrorType
 * @callback OnGetTokenErrorMessage
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
 * Return `string type` will let the build-in Token component apply the message
 * into the `title` attribute. Otherwise, will simply be ignored
 */
export interface OnGetTokenErrorMessage<ValueType, ErrorType> {
  (tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>): string | Nullish;
}
