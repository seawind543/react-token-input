import React from 'react';
interface ActionFunction {
    (keyDownEvent: React.KeyboardEvent): void;
}
interface KeyDownHandlerProxyActions {
    onBackspace?: ActionFunction;
    onTab?: ActionFunction;
    onEnter?: ActionFunction;
    onEscape?: ActionFunction;
}
declare const keyDownHandlerProxy: (keyDownEvent: React.KeyboardEvent, actions: KeyDownHandlerProxyActions) => void;
export default keyDownHandlerProxy;
