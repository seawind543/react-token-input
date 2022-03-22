import type { TokenIndex, TokenMeta } from '../types/token';
declare const buildTokenMeta: <ValueType, ErrorType>(customizeError: import("../types/mix").Nullish | ErrorType, tokenValue: ValueType, tokenIndex: TokenIndex) => TokenMeta<ErrorType>;
export default buildTokenMeta;
