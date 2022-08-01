/**
 * @typedef {string} InputString
 * @description A string which can be inputted in an `HTML input` element
 */
export type InputString = string;

/**
 * @typedef {string} TokenSeparator
 * @description A `character` to split the `user input string` into multiple parts.
 *
 * Note:
 * It take the `String.prototype.split([TokenSeparator, TokenSeparator, ...])`
 * and `RegExp` to split the user input string.
 *
 * Make sure your customized separators could be used with
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp `RegExp`}.
 */
export type TokenSeparator = string;

/**
 * @typedef {null | undefined} Nullish
 * @description A type that is either null or undefined.
 */
export type Nullish = null | undefined;
