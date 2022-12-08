import type { TokenIndex, TokenMeta } from '../types/token';

/**
 * @template VT, ErrorType
 * @callback buildTokenMeta<VT, ErrorType>
 * @description
 * Internal function for TokenInput to
 * build token data and meta with customize data
 *
 * @example
 * ```js
 * buildTokenMeta(customizeError, tokenValue, tokenIndex)
 * ```
 *
 * @param {TokenMeta<ErrorType>['error']} customizeError
 * The return of callback `onTokenValueValidate`
 *
 * @param {VT} tokenValue
 * The tokenValue built by callback `onBuildTokenValue`
 *
 * @param {TokenIndex} tokenIndex
 * The array index of this tokenValue in tokenValues
 *
 * @returns {TokenMeta<ErrorType>}
 * The token's meta data
 */
const buildTokenMeta = <VT, ErrorType>(
  customizeError: TokenMeta<ErrorType>['error'],
  tokenValue: VT,
  tokenIndex: TokenIndex,
): TokenMeta<ErrorType> => {
  return {
    // TODO: Consider uuid
    key: `${JSON.stringify(tokenValue)}-${Date.now()}-${tokenIndex}`,
    activated: false,
    error: customizeError,
  };
};

export default buildTokenMeta;
