import type { Nullish } from '../types/mix';
import type { TokenMeta } from '../types/token';

/**
 * @template ValueType
 * @type {OnGetTokenErrorMessage<ValueType, string>} defaultGetTokenErrorMessage
 * @description
 * Default function to get the errorMessage,
 * which throw an TypeError if the `ErrorType` is
 * NOT `string` nor Nullish
 *
 * @example
 * ```js
 * defaultGetTokenErrorMessage(tokenValue, tokenMeta)
 * ```
 *
 * @param {ValueType} tokenValue
 * The tokenValue build by `onBuildTokenValue`
 *
 * @param {TokenMeta<ErrorType>} tokenMeta
 * The token's meta data
 *
 * @returns {Nullish | string}
 * The error message (string) to describe the invalid token
 */
const defaultGetTokenErrorMessage = <ValueType, ErrorType>(
  _: ValueType,
  tokenMeta: TokenMeta<ErrorType>
): Nullish | string => {
  // Check if the tokenMeta.error is `string`, or `Nullish`
  const { error } = tokenMeta;

  if (error === null) {
    return null;
  }

  if (
    // (typeof error === 'object' && error === null) ||
    typeof error === 'undefined' ||
    typeof error === 'string'
  ) {
    return error;
  }

  throw new TypeError(
    '"onGetTokenErrorMessage" is required when "ErrorType" not "string"'
  );
};

export default defaultGetTokenErrorMessage;
