import { KEY_DOWN_HANDLER_CONFIG_OPTION } from '../constants';
export type KeyDownHandlerConfigOption = typeof KEY_DOWN_HANDLER_CONFIG_OPTION[keyof typeof KEY_DOWN_HANDLER_CONFIG_OPTION];
export interface SpecialKeyDownConfig {
    onBackspace?: KeyDownHandlerConfigOption;
    onTab?: KeyDownHandlerConfigOption;
    onEnter?: KeyDownHandlerConfigOption;
    onEscape?: KeyDownHandlerConfigOption;
}
