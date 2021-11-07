declare type ActionFunction = (keyDownEvent: KeyboardEvent) => void;
declare type KeyDownHandlerProxyActions = {
    onBackspace?: ActionFunction;
    onTab?: ActionFunction;
    onEnter?: ActionFunction;
    onEscape?: ActionFunction;
};
declare const keyDownHandlerProxy: (keyDownEvent: KeyboardEvent, actions: KeyDownHandlerProxyActions) => void;
export default keyDownHandlerProxy;
//# sourceMappingURL=keyDownHandlerProxy.d.ts.map