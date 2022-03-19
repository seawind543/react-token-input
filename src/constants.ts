import type { InputString, TokenSeparator } from './types/mix';
import type { SpecialKeyDownConfig } from './types/specialKeyDown';

/**
 * An array of default `separators` characters
 * to split the user input string into array.
 *
 * For example,
 * Split the user input string `abc;def` into `['abc', 'def']`
 * by separators `[';']`
 *
 * Note:
 * It take the `String.prototype.split()` and `RegExp` to split the user input string.
 * Make sure your customized separators could be used with `RegExp`.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 */
export const DEFAULT_SEPARATORS: TokenSeparator[] = [
  ',',
  ';',
  '\n', // for copy and paste
  '\r', // for copy and paste
  '\r\n', // for copy and paste
];

/**
 * A constant to help config the special keyDown event handler setting
 */
export const KEY_DOWN_HANDLER_CONFIG_OPTION = {
  OFF: 0,
  ON: 1,
};

// The default specialKeyDown settings
export const DEFAULT_SPECIAL_KEY_DOWN_CONFIG: Required<SpecialKeyDownConfig> = {
  onBackspace: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
  onTab: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF,
  onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
  onEscape: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
};

/**
 * constant className for customize the `delete button`
 * in the `TokenLabel` (onGetTokenDisplayLabel)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const JS__TOKEN__DELETE_BUTTON__CLASS_NAME = 'js__token__delete-button';

/**
 * The default init value of the `input`
 */
export const DEFAULT_INPUT_INIT_VALUE: InputString = '';
