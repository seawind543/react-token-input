import type { TokenMeta } from '../types/token';
declare const defaultGetTokenErrorMessage: <ValueType, ErrorType>(_: ValueType, tokenMeta: TokenMeta<ErrorType>) => string | undefined;
export default defaultGetTokenErrorMessage;
