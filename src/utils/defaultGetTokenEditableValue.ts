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
 * @param {VT} value
 * This token's tokenValue built by `onBuildTokenValue`
 *
 * @param {TokenMeta<ET>} meta
 * This token's meta data
 *
 * @returns {InputString}
 * The value for end-user to `edit` in an input field
 */
const defaultGetTokenEditableValue = <VT, ET>(
  value: VT,
  meta: TokenMeta<ET>,
): InputString => {
  return `${value}`;
};

export default defaultGetTokenEditableValue;
