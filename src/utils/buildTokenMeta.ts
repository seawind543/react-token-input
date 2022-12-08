import type { TokenIndex, TokenMeta } from '../types/token';

/**
 * @template VT, ET
 * @callback buildTokenMeta<VT, ET>
 * @description
 * Internal function for TokenInput to
 * build token data and meta with customize data
 *
 * @example
 * ```js
 * buildTokenMeta(customizeError, tokenValue, tokenIndex)
 * ```
 *
 * @param {TokenMeta<ET>['error']} customizeError
 * The return of callback `onTokenValueValidate`
 *
 * @param {VT} tokenValue
 * The tokenValue built by callback `onBuildTokenValue`
 *
 * @param {TokenIndex} tokenIndex
 * The array index of this tokenValue in tokenValues
 *
 * @returns {TokenMeta<ET>}
 * The token's meta data
 */
const buildTokenMeta = <VT, ET>(
  customizeError: TokenMeta<ET>['error'],
  tokenValue: VT,
  tokenIndex: TokenIndex,
): TokenMeta<ET> => {
  return {
    // TODO: Consider uuid
    key: `${JSON.stringify(tokenValue)}-${Date.now()}-${tokenIndex}`,
    activated: false,
    error: customizeError,
  };
};

export default buildTokenMeta;
