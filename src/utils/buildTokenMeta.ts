import type { TokenValue, TokenIndex, TokenMeta } from '../types/token';

/**
 * Internal function for TokenInput to
 * build token data and meta with customize data
 *
 * buildTokenMeta(customizeError, tokenValue, tokenIndex)
 *
 * @ customizeError
 * Type: TokenMeta<ErrorType>['error']
 * Description: The return of `onTokenValueValidate`
 *
 * @ tokenValue
 * Type: TokenValue<ValueType>
 * Description: The tokenValue build by `onBuildTokenValue`
 *
 * @ tokenIndex
 * Type: number
 * Description: The array index of this tokenValue in tokenValues
 *
 * @ return
 * Type: TokenMeta<ErrorType>
 * Description: token's meta data
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
