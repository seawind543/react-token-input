import { KEY_DOWN_HANDLER_CONFIG_OPTION } from '../constants';

export type KeyDownHandlerConfigOption =
  typeof KEY_DOWN_HANDLER_CONFIG_OPTION[keyof typeof KEY_DOWN_HANDLER_CONFIG_OPTION];

/**
 * [Beta; Might be change in the future version]
 * Current only apply to the `TokenCreator`
 *
 * The settings to control the behavior of specials keyDown's event handler.
 * Recommend to use the build-in constant `KEY_DOWN_HANDLER_CONFIG_OPTION` to config the setting.
 *
 * `KEY_DOWN_HANDLER_CONFIG_OPTION.OFF` means turn `off`
 * (Took native browser behavior. The TokenInput should NOT handle it).
 *
 * `KEY_DOWN_HANDLER_CONFIG_OPTION.ON` means apply TokenInput predefined event handler.
 *
 * Default setting as below.
 * specialKeyDown: {
 *   onBackspace: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
 *   onTab: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF,
 *   onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
 *   onEscape: KEY_DOWN_HANDLER_CONFIG_OPTION.ON,
 * },
 */
export type SpecialKeyDownConfig = {
  onBackspace?: KeyDownHandlerConfigOption;
  onTab?: KeyDownHandlerConfigOption;
  onEnter?: KeyDownHandlerConfigOption;
  onEscape?: KeyDownHandlerConfigOption;
};
