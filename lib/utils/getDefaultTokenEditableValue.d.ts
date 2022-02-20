import type { InputValue } from '../types/mix';
import type { TokenValue, TokenMeta } from '../types/token';
declare const getDefaultTokenEditableValue: <ValueType, ErrorType>(tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>) => InputValue;
export default getDefaultTokenEditableValue;
