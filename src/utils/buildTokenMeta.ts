import type { TokenIndex, TokenMeta } from '../types/token';

/**
 * @template ErrorType
 * @callback buildTokenMeta<ErrorType>
 * @description
 * Internal function for TokenInput to
 * build token data and meta with customize data
 *
 * @example
 * ```js
 * buildTokenMeta({
 *   tokenMetaKey
 *   tokenIndex,
 *   customizeError,
 * })
 * ```
 * @param {Object} params
 *
 * @param {string} params.tokenMetaKey
 * The array index of this tokenValue in tokenValues
 *
 * @param {TokenIndex} params.tokenIndex
 * The array index of this tokenValue in tokenValues
 *
 * @param {TokenMeta<ErrorType>['error']} params.customizeError
 * The return of callback `onTokenValueValidate`
 *
 * @returns {TokenMeta<ErrorType>}
 * The token's meta data
 */
type Params<ErrorType> = {
  tokenMetaKey: string;
  tokenIndex: TokenIndex;
  customizeError: TokenMeta<ErrorType>['error'];
};
function buildTokenMeta<ErrorType>(
  params: Params<ErrorType>
): TokenMeta<ErrorType> {
  const { tokenMetaKey, tokenIndex, customizeError } = params;

  return {
    key: tokenMetaKey,
    index: tokenIndex,
    activated: false,
    error: customizeError,
  };
}

export default buildTokenMeta;
