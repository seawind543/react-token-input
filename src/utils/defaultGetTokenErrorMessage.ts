import type { TokenMeta } from '../types/token';

/**
 * @template ValueType
 * @type {OnGetTokenErrorMessage<ValueType, string>} defaultGetTokenErrorMessage
 * @description
 * Default function to get the `Error Message` from tokenMeta
 * for built-in Token Component
 *
 * @example
 * ```js
 * defaultGetTokenErrorMessage(tokenValue, tokenMeta)
 * ```
 *
 * @param {ValueType} tokenValue
 * The tokenValue built by `onBuildTokenValue`
 *
 * @param {TokenMeta<ErrorType>} tokenMeta
 * The token's meta data
 *
 * @returns {string | undefined}
 * The Error Message (string) to describe the invalid token.
 * Will return `undefined` when `tokenMeta.error` is not `string`
 */
const defaultGetTokenErrorMessage = <ValueType, ErrorType>(
  _: ValueType,
  tokenMeta: TokenMeta<ErrorType>
): string | undefined => {
  // Check if the tokenMeta.error is `string`, or `Nullish`
  const { error } = tokenMeta;

  if (typeof error === 'string') {
    return error;
  }

  return undefined;
};

export default defaultGetTokenErrorMessage;
