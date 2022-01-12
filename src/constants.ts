import { InputValue } from './types/token';

/**
 * The default `separators`
 * in the `TokenLabel` (onGetTokenDisplayLabel)
 */
export const DEFAULT_SEPARATORS: string[] = [
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

export type KeyDownHandlerConfigOption =
  typeof KEY_DOWN_HANDLER_CONFIG_OPTION[keyof typeof KEY_DOWN_HANDLER_CONFIG_OPTION];

export type SpecialKeyDownConfig = {
  onBackspace?: KeyDownHandlerConfigOption;
  onTab?: KeyDownHandlerConfigOption;
  onEnter?: KeyDownHandlerConfigOption;
  onEscape?: KeyDownHandlerConfigOption;
};
export type SpecialKeyDownSetting = Required<SpecialKeyDownConfig>;

// The default specialKeyDown settings
export const DEFAULT_SPECIAL_KEY_DOWN_CONFIG: SpecialKeyDownSetting = {
  onBackspace: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
  onTab: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF,
  onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
  onEscape: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
};

/**
 * For customize the `delete button`
 * in the `TokenLabel` (onGetTokenDisplayLabel)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const JS__TOKEN__DELETE_BUTTON__CLASS_NAME = 'js__token__delete-button';

/**
 * The default init value of the `input`
 */
export const DEFAULT_INPUT_INIT_VALUE: InputValue = '';
