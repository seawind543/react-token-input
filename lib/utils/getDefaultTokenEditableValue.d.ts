import type { InputString } from '../types/mix';
import type { TokenValue, TokenMeta } from '../types/token';
declare const getDefaultTokenEditableValue: <ValueType, ErrorType>(tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>) => InputString;
export default getDefaultTokenEditableValue;
