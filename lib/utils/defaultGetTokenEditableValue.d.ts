import type { InputString } from '../types/mix';
import type { TokenMeta } from '../types/token';
declare const defaultGetTokenEditableValue: <ValueType, ErrorType>(tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>) => InputString;
export default defaultGetTokenEditableValue;
