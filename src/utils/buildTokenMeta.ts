import type { Index, TokenMeta } from '../types/token';

/**
 * @template VT, ET
 * @callback buildTokenMeta<VT, ET>
 * @description
 * Internal function for TokenInput to
 * build token data and meta with customize data
 *
 * @example
 * ```js
 * buildTokenMeta(customizeError, tokenValue, index)
 * ```
 *
 * @param {TokenMeta<ET>['error']} customizeError
 * The return of callback `onTokenValueValidate`
 *
 * @param {VT} tokenValue
 * The tokenValue built by callback `onBuildTokenValue`
 *
 * @param {Index} index
 * The array index of this tokenValue in tokenValues
 *
 * @returns {TokenMeta<ET>}
 * The token's meta data
 */
const buildTokenMeta = <VT, ET>(
  customizeError: TokenMeta<ET>['error'],
  tokenValue: VT,
  index: Index,
): TokenMeta<ET> => {
  return {
    // TODO: Consider uuid
    key: `${JSON.stringify(tokenValue)}-${Date.now()}-${index}`,
    activated: false,
    error: customizeError,
  };
};

export default buildTokenMeta;
