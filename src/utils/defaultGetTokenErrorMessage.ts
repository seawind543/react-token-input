import type { TokenMeta } from '../types/token';

/**
 * The default ErrorType of the `TokenInput`
 */
const DEFAULT_ERROR_TYPE = 'string';

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
 * The error message to describe the invalid token
 */
const defaultGetTokenErrorMessage = <ValueType, ErrorType>(
  _: ValueType,
  tokenMeta: TokenMeta<ErrorType>
): TokenMeta<ErrorType>['error'] => {
  // Check if the tokenMeta.error is NOT `string`, nor Nullish
  const DEFAULT_HANDLED_ERROR_TYPES = [DEFAULT_ERROR_TYPE, 'undefined'];
  if (
    !DEFAULT_HANDLED_ERROR_TYPES.includes(typeof tokenMeta.error) &&
    tokenMeta.error !== null
  ) {
    throw new TypeError(
      '"onGetTokenErrorMessage" is required when "ErrorType" not "string"'
    );
  }

  return tokenMeta.error;
};

export default defaultGetTokenErrorMessage;
