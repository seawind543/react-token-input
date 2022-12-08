/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */

import type { InputString } from '../types/mix';
import type { TokenMeta } from '../types/token';

/**
 * @type {OnGetTokenEditableValue<VT, ET>} defaultGetTokenEditableValue
 * @description
 * Default function for TokenInput to
 * get `editable value` from customized data structure
 * for user to perform `edit` in an `HTML input element`
 *
 * @example
 * ```js
 * getDefaultTokenEditableValue(tokenValue)
 * ```
 *
 * @param {VT} tokenValue
 * This token's tokenValue built by `onBuildTokenValue`
 *
 * @param {TokenMeta<ET>} tokenMeta
 * This token's meta data
 *
 * @returns {InputString}
 * The value for end-user to `edit` in an input field
 */
const defaultGetTokenEditableValue = <VT, ET>(
  tokenValue: VT,
  tokenMeta: TokenMeta<ET>,
): InputString => {
  return `${tokenValue}`;
};

export default defaultGetTokenEditableValue;
