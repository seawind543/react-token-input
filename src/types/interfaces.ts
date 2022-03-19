import type { ReactNode } from 'react';
import { InputString } from './mix';
import { TokenIndex, TokenValue, TokenMeta } from './token';

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
export type OnInputValueChange = (
  newValue: InputString,
  previousValue: InputString
) => void;

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
export type OnPreprocess = (values: InputString[]) => InputString[];

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
 * Example:
 * - Input string "ABC, DEF" and separators is `,`
 * - buildDefaultTokenValue will be called twice
 * onBuildTokenValue('ABC') and onBuildTokenValue('DEF')
 *
 * @ return
 * Type: TokenValue<ValueType>
 * Description: customize data structure TokenValue
 */
export type OnBuildTokenValue<ValueType> = (
  inputValue: InputString
) => TokenValue<ValueType>;

/**
 * A callback function invoked when tokenValues update
 *
 * onTokenValuesChange(modifiedTokenValues)
 *
 * @ modifiedTokenValues
 * Type: TokenValue<ValueType>[]
 * Description: the new tokenValues
 */
export type OnTokenValuesChange<ValueType> = (
  modifiedTokenValues: TokenValue<ValueType>[]
) => void;

/**
 * A callback function to validate a tokenValue
 * (The returned result will be use by `onGetTokenErrorMessage`)
 *
 * onTokenValueValidate(tokenValue, tokenIndex, tokenValues)
 *
 * @ tokenValue
 * Type: TokenValue<ValueType>
 * Description: The tokenValue build by `onBuildTokenValue`
 *
 * @ tokenIndex
 * Type: number
 * Description: The array index of this tokenValue in tokenValues
 *
 * @ tokenValues
 * Type: TokenValue<ValueType>[]
 * Description: The array of tokenValue of TokenInput
 *
 * @ return
 * Type: TokenMeta<ErrorType>['error']
 * Description:
 * The customize error.
 * Specific the token's validate status or errorMessage.
 * Could be `an error message` to display, or an error object for further operations.
 *
 * Return `Nullish` types means the token is valid.
 */
export type OnTokenValueValidate<ValueType, ErrorType> = (
  tokenValue: TokenValue<ValueType>,
  tokenIndex: TokenIndex,
  tokenValues: TokenValue<ValueType>[]
) => TokenMeta<ErrorType>['error'];

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
export type OnGetTokenClassName<ValueType, ErrorType> = (
  tokenValue: TokenValue<ValueType>,
  tokenMeta: TokenMeta<ErrorType>
) => undefined | string;

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
export type OnGetTokenDisplayLabel<ValueType, ErrorType> = (
  tokenValue: TokenValue<ValueType>,
  tokenMeta: TokenMeta<ErrorType>
) => InputString | ReactNode;

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
export type OnRenderTokenDeleteButtonContent = () => ReactNode;

/**
 * A callback function to determine whether the token is `inline editable`.
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
export type OnGetIsTokenEditable<ValueType, ErrorType> = (
  tokenValue: TokenValue<ValueType>,
  tokenMeta: TokenMeta<ErrorType>
) => boolean;

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
export type OnGetTokenEditableValue<ValueType, ErrorType> = (
  tokenValue: TokenValue<ValueType>,
  tokenMeta: TokenMeta<ErrorType>
) => InputString;

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
 * Type: TokenMeta<ErrorType>['error']
 * Description: The error message to describe an invalid token
 */
export type OnGetTokenErrorMessage<ValueType, ErrorType> = (
  tokenValue: TokenValue<ValueType>,
  tokenMeta: TokenMeta<ErrorType>
) => TokenMeta<ErrorType>['error'];
