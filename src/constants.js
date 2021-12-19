/**
 * The default `separators`
 * in the `TokenLabel` (onGetTokenDisplayLabel)
 */
export const DEFAULT_SEPARATORS = [
  ',',
  ';',
  '\n', // for copy and paste
  '\r', // for copy and paste
  '\r\n', // for copy and paste
];

/**
 * KeyDown handler config
 */
export const KEY_DOWN_HANDLER_CONFIG_OPTION = {
  OFF: 0,
  ON: 1,
};

// The default specialKeyDown settings
export const DEFAULT_SPECIAL_KEY_DOWN = {
  onBackspace: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
  onTab: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF,
  onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
  onEscape: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
};

/**
 * For customize the `delete button`
 * in the `TokenLabel` (onGetTokenDisplayLabel)
 */
export const JS__TOKEN__DELETE_BUTTON__CLASS_NAME = 'js__token__delete-button';

/**
 * The default init value of the `input`
 */
export const DEFAULT_INPUT_INIT_VALUE = '';
