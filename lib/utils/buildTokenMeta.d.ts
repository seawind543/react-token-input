import type { TokenValue, TokenError, TokenIndex, TokenMeta } from '../types/token';
declare const buildTokenMeta: (customizeError: TokenError, tokenValue: TokenValue, tokenIndex: TokenIndex) => TokenMeta;
export default buildTokenMeta;
