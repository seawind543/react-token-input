import type { TokenValue, TokenIndex, TokenMeta } from '../types/token';
declare const buildTokenMeta: <ValueType, ErrorType>(customizeError: string | ErrorType | undefined, tokenValue: TokenValue<ValueType>, tokenIndex: TokenIndex) => TokenMeta<ErrorType>;
export default buildTokenMeta;
