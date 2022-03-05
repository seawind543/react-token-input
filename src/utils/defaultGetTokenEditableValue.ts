/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */

import type { InputString } from '../types/mix';
import type { TokenValue, TokenMeta } from '../types/token';

/**
 * Default function for TokenInput to
 * get `editable value` from customize data structure
 * for user to perform `edit` in an `HTML input element`
 *
 * getDefaultTokenEditableValue(tokenValue)
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
const defaultGetTokenEditableValue = <ValueType, ErrorType>(
  tokenValue: TokenValue<ValueType>,
  tokenMeta: TokenMeta<ErrorType>
): InputString => {
  return `${tokenValue}`;
};

export default defaultGetTokenEditableValue;
