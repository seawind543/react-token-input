import type { TokenValue, TokenIndex, TokenMeta } from '../types/token';
declare const buildTokenMeta: <ValueType, ErrorType>(customizeError: ErrorType, tokenValue: ValueType, tokenIndex: TokenIndex) => TokenMeta<ErrorType>;
export default buildTokenMeta;
