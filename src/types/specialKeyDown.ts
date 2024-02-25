import { KEY_DOWN_HANDLER_CONFIG_OPTION } from '../constants';

/**
 * @typedef {number} KeyDownHandlerConfigOption
 * @description The accept values of SpecialKeyDownConfig.onXXXX
 */
export type KeyDownHandlerConfigOption =
  (typeof KEY_DOWN_HANDLER_CONFIG_OPTION)[keyof typeof KEY_DOWN_HANDLER_CONFIG_OPTION];

/**
 * @typedef {Object} SpecialKeyDownConfig
 * @description
 * [Beta; Might be change in the future version]
 * Current only apply to the `TokenCreator`
 *
 * The settings to control the behavior of specials keyDown's event handler.
 * Recommend to use the built-in constant `KEY_DOWN_HANDLER_CONFIG_OPTION` to config the setting.
 *
 * @prop {KeyDownHandlerConfigOption} [onBackspace] - The config value to control the behavior of `backspace` keyDown event handler
 * @prop {KeyDownHandlerConfigOption} [onTab] - The config value to control the behavior of `tab` keyDown event handler
 * @prop {KeyDownHandlerConfigOption} [onEnter] - The config value to control the behavior of `enter` keyDown event handler
 * @prop {KeyDownHandlerConfigOption} [onEscape] - The config value to control the behavior of `escape` keyDown event handler
 *
 * @see KEY_DOWN_HANDLER_CONFIG_OPTION for the accepted config values
 * @see DEFAULT_SPECIAL_KEY_DOWN_CONFIG for the default settings
 */
export interface SpecialKeyDownConfig {
  onBackspace?: KeyDownHandlerConfigOption;
  onTab?: KeyDownHandlerConfigOption;
  onEnter?: KeyDownHandlerConfigOption;
  onEscape?: KeyDownHandlerConfigOption;
}
