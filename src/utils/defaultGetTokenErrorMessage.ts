import type { TokenValue, TokenMeta } from '../types/token';

/**
 * The default ErrorType of the `TokenInput`
 */
const DEFAULT_ERROR_TYPE = 'string';

/**
 * Default function to get the errorMessage,
 * which throw an TypeError if the `ErrorType` is NOT `string` nor `undefined`.
 *
 * defaultGetTokenErrorMessage(tokenValue, tokenMeta)
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
 * Type: undefined | string
 * Description: The error message to describe the invalid token
 */
const defaultGetTokenErrorMessage = <ValueType, ErrorType>(
  _: TokenValue<ValueType>,
  tokenMeta: TokenMeta<ErrorType>
): TokenMeta<ErrorType>['error'] => {
  // Check if the tokenMeta.error is NOT `string` nor `undefined`
  const DEFAULT_HANDLED_ERROR_TYPES = [DEFAULT_ERROR_TYPE, 'undefined'];
  if (!DEFAULT_HANDLED_ERROR_TYPES.includes(typeof tokenMeta.error)) {
    throw new TypeError(
      '"onGetTokenErrorMessage" is required when "ErrorType" not "string"'
    );
  }

  return tokenMeta.error;
};

export default defaultGetTokenErrorMessage;
