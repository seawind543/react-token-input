import type { TokenValue, TokenMeta } from '../types/token';
declare const getDefaultTokenErrorMessage: <ValueType, ErrorType>(tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>) => string | undefined;
export default getDefaultTokenErrorMessage;
