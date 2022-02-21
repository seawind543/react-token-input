import type { InputString } from '../types/mix';
import type { DefaultValueType, TokenValue } from '../types/token';

/**
 * Default function for TokenInput to
 * build default token value from user input value
 *
 * buildDefaultTokenValue(inputValue)
 *
 * @ inputValue
 * Type: InputString
 * Description: The user input value // (A value split by TokenSeparator[])
 * Which is `one item` of the `user input string` split by the `separators`
 * Example:
 * - Input string "ABC, DEF" and separators is `,`
 * - buildDefaultTokenValue will be called twice
 * buildDefaultTokenValue('ABC') and buildDefaultTokenValue('DEF')
 *
 * @ return
 * Type: TokenValue<DefaultValueType>
 * Description: The DefaultValueType tokenValue
 */
const buildDefaultTokenValue = (
  inputValue: InputString
): TokenValue<DefaultValueType> => {
  return inputValue.trim();
};

export default buildDefaultTokenValue;
