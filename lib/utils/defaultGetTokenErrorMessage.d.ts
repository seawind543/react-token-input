import type { TokenValue, TokenMeta } from '../types/token';
declare const defaultGetTokenErrorMessage: <ValueType, ErrorType>(_: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => ErrorType | undefined;
export default defaultGetTokenErrorMessage;
