import type { TokenValue, TokenIndex, TokenMeta } from '../types/token';

/**
 * Internal function for TokenInput to
 * build token data and meta with customize data
 *
 * buildTokenMeta(customizeError, tokenValue, tokenIndex)
 *
 * @ customizeError
 * Type: any
 * Description: The return of onTokenValueValidate
 *
 * @ tokenValue
 * Type: any (string | number | object | customize data structure)
 * Description: The tokenValue build by `onBuildTokenValue`
 *
 * @ tokenIndex
 * Type: number
 * Description: The array index for this tokenValue in tokenValues
 *
 * @ return
 * Type: object
 * Description: token's meta data
 *  {
 *    // A private key for render
 *    key: string,
 *
 *    // Specific the token is activated for `edit` or not
 *    activated: boolean,
 *
 *    // Customize data structure built by `onTokenValue Validate`
 *    // Specific the token's validate status or errorMessage
 *    error: any,
 *  }
 */
const buildTokenMeta = <ValueType, ErrorType>(
  customizeError: TokenMeta<ErrorType>['error'],
  tokenValue: TokenValue<ValueType>,
  tokenIndex: TokenIndex
): TokenMeta<ErrorType> => {
  return {
    // TODO: Consider uuid
    key: `${JSON.stringify(tokenValue)}-${Date.now()}-${tokenIndex}`,
    activated: false,
    error: customizeError,
  };
};

export default buildTokenMeta;
