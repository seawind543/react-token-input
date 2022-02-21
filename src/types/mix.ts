/**
 * The user input (keyboard typing) value.
 */
export type InputString = string;

/**
 * A character to split the user input string into multiple items.
 *
 * Note:
 * It take the `String.prototype.split([TokenSeparator, TokenSeparator, ...])`
 * and `RegExp` to split the user input string.
 *
 * Make sure customized separators could be used with `RegExp`.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 */
export type TokenSeparator = string;
