import { KEY_DOWN_HANDLER_CONFIG_OPTION } from '../constants';
export declare type KeyDownHandlerConfigOption = typeof KEY_DOWN_HANDLER_CONFIG_OPTION[keyof typeof KEY_DOWN_HANDLER_CONFIG_OPTION];
export declare type SpecialKeyDownConfig = {
    onBackspace?: KeyDownHandlerConfigOption;
    onTab?: KeyDownHandlerConfigOption;
    onEnter?: KeyDownHandlerConfigOption;
    onEscape?: KeyDownHandlerConfigOption;
};
export declare type SpecialKeyDownSetting = Required<SpecialKeyDownConfig>;
