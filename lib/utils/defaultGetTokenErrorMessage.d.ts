import type { DefaultErrorType, TokenValue, TokenMeta } from '../types/token';
declare const defaultGetTokenErrorMessage: <ValueType, ErrorType>(_: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => undefined | DefaultErrorType;
export default defaultGetTokenErrorMessage;
