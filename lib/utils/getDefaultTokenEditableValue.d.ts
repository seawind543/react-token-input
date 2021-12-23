import type { InputValue, TokenValue, TokenMeta } from '../types/token';
declare const getDefaultTokenEditableValue: <ValueType, ErrorType>(tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>) => InputValue;
export default getDefaultTokenEditableValue;
