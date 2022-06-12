/**
 * @type {OnTokenValueValidate<string, string>} defaultTokenValueValidate
 * @description
 * Default function for TokenInput to validate a tokenValue
 * (Will be use by `onGetTokenErrorMessage`)
 *
 * @example
 * ```js
 * defaultTokenValueValidate()
 * ```
 *
 * @returns {undefined}
 * Always return undefined to specific the token is valid.
 */
const defaultTokenValueValidate = () => undefined;

export default defaultTokenValueValidate;
