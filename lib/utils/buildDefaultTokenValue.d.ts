import type { InputString } from '../types/mix';
import type { DefaultValueType, TokenValue } from '../types/token';
declare const buildDefaultTokenValue: (inputValue: InputString) => TokenValue<DefaultValueType>;
export default buildDefaultTokenValue;
