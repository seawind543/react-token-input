import type { InputString, TokenSeparator } from './types/mix';
import type { SpecialKeyDownConfig } from './types/specialKeyDown';

/**
 * @type {TokenSeparator[]}
 * @description An array of default `separator characters`
 * to split the user input string into array.
 *
 * @example
 * Split the user input string `abc;def` into `['abc', 'def']`
 * by separators `[';']`
 *
 * @see TokenSeparator
 */
export const DEFAULT_SEPARATORS: TokenSeparator[] = [
  ',',
  ';',
  '\n', // for copy and paste
  '\r', // for copy and paste
  '\r\n', // for copy and paste
];

/**
 * @enum {number}
 * @description A constant to help config the special keyDown event handler setting
 *
 * @prop {0} OFF - The config vale to turn `off` predefined event handler. That is,
 * took native browser behavior. The TokenInput should NOT handle it
 *
 * @prop {1} NO - The config vale to `apply` TokenInput predefined event handler
 */
export const KEY_DOWN_HANDLER_CONFIG_OPTION = Object.freeze({
  OFF: 0,
  ON: 1,
});

/**
 * @type {Required<SpecialKeyDownConfig>}
 * @description The default specialKeyDown settings
 * @see SpecialKeyDownConfig
 * @see KEY_DOWN_HANDLER_CONFIG_OPTION
 */
export const DEFAULT_SPECIAL_KEY_DOWN_CONFIG: Required<SpecialKeyDownConfig> = {
  onBackspace: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
  onTab: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF,
  onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
  onEscape: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
};

/**
 * @type {string}
 * @description
 * The constant className for customize the `delete button`
 * in the `TokenLabel` (onGetTokenDisplayLabel)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const JS__TOKEN__DELETE_BUTTON__CLASS_NAME = 'js__token__delete-button';

/**
 * @type {string}
 * @description The default init value of the `input`
 */
export const DEFAULT_INPUT_INIT_VALUE: InputString = '';
