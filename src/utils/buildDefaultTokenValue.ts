import type { InputString } from '../types/mix';
import type { TokenValue } from '../types/token';

/**
 * Default function for TokenInput to
 * build default token value from user input value
 *
 * buildDefaultTokenValue(inputValue)
 *
 * @ inputValue
 * Type: string
 * Description: The user input value.
 * Which is `one item` of the `user input string` split by the `separators`
 * Example:
 * - Input string "ABC, DEF" and separators is `,`
 * - buildDefaultTokenValue will be called twice
 * buildDefaultTokenValue('ABC') and buildDefaultTokenValue('DEF')
 *
 * @ return
 * Type: string
 * Description: The default token value
 */
const buildDefaultTokenValue = (
  inputValue: InputString
): TokenValue<InputString> => {
  return inputValue.trim();
};

export default buildDefaultTokenValue;
