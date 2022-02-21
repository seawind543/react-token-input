import type { DefaultErrorType, TokenValue, TokenMeta } from '../types/token';
declare const getDefaultTokenErrorMessage: <ValueType, ErrorType>(tokenValue: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => undefined | DefaultErrorType;
export default getDefaultTokenErrorMessage;
