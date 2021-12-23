import type { TokenValue, TokenIndex, TokenMeta } from '../types/token';
declare const buildTokenMeta: (customizeError: TokenMeta['error'], tokenValue: TokenValue, tokenIndex: TokenIndex) => TokenMeta;
export default buildTokenMeta;
