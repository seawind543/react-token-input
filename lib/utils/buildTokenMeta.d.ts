import type { TokenValue, TokenIndex, TokenMeta } from '../types/token';
declare const buildTokenMeta: <ValueType, ErrorType>(customizeError: ErrorType | undefined, tokenValue: TokenValue<ValueType>, tokenIndex: TokenIndex) => TokenMeta<ErrorType>;
export default buildTokenMeta;
