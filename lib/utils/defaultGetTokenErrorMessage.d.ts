import type { TokenMeta } from '../types/token';
declare const defaultGetTokenErrorMessage: <ValueType, ErrorType>(_: ValueType, tokenMeta: TokenMeta<ErrorType>) => import("../types/mix").Nullish | ErrorType;
export default defaultGetTokenErrorMessage;
