import type { Nullish } from '../types/mix';
import type { TokenMeta } from '../types/token';
declare const defaultGetTokenErrorMessage: <ValueType, ErrorType>(_: ValueType, tokenMeta: TokenMeta<ErrorType>) => Nullish | string;
export default defaultGetTokenErrorMessage;
