export declare const DEFAULT_SEPARATORS: string[];
export declare const KEY_DOWN_HANDLER_CONFIG_OPTION: {
    OFF: number;
    ON: number;
};
declare type KeyDownHandlerConfigOption = typeof KEY_DOWN_HANDLER_CONFIG_OPTION[keyof typeof KEY_DOWN_HANDLER_CONFIG_OPTION];
export declare type SpecialKeyDown = {
    onBackspace?: KeyDownHandlerConfigOption;
    onTab?: KeyDownHandlerConfigOption;
    onEnter?: KeyDownHandlerConfigOption;
    onEscape?: KeyDownHandlerConfigOption;
};
export declare const DEFAULT_SPECIAL_KEY_DOWN: Required<SpecialKeyDown>;
export declare const JS__TOKEN__DELETE_BUTTON__CLASS_NAME = "js__token__delete-button";
export declare const DEFAULT_INPUT_INIT_VALUE = "";
export {};
