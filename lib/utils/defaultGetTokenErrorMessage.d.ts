import type { TokenValue, TokenMeta } from '../types/token';
declare const defaultGetTokenErrorMessage: <ValueType, ErrorType>(_: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => import("../types/mix").Nullish | ErrorType;
export default defaultGetTokenErrorMessage;
