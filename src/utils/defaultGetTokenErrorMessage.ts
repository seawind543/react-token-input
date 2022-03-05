import type { DefaultErrorType, TokenValue, TokenMeta } from '../types/token';

/**
 * Default function to get the errorMessage
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
 * Type: DefaultErrorType
 * Description: The error message to describe an invalid token
 */
const defaultGetTokenErrorMessage = <ValueType, ErrorType>(
  _: TokenValue<ValueType>,
  tokenMeta: TokenMeta<ErrorType>
): undefined | DefaultErrorType => {
  // TODO: check can we compare type with DefaultErrorType
  if (typeof tokenMeta.error === 'string') {
    return tokenMeta.error;
  }

  return undefined;
};

export default defaultGetTokenErrorMessage;
