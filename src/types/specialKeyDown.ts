import { KEY_DOWN_HANDLER_CONFIG_OPTION } from '../constants';

/**
 * KeyDown handler config
 */
export type KeyDownHandlerConfigOption =
  typeof KEY_DOWN_HANDLER_CONFIG_OPTION[keyof typeof KEY_DOWN_HANDLER_CONFIG_OPTION];

export type SpecialKeyDownConfig = {
  onBackspace?: KeyDownHandlerConfigOption;
  onTab?: KeyDownHandlerConfigOption;
  onEnter?: KeyDownHandlerConfigOption;
  onEscape?: KeyDownHandlerConfigOption;
};
export type SpecialKeyDownSetting = Required<SpecialKeyDownConfig>;
