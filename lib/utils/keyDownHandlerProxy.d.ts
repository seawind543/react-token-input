interface ActionFunction {
    (keyDownEvent: KeyboardEvent): void;
}
interface KeyDownHandlerProxyActions {
    onBackspace?: ActionFunction;
    onTab?: ActionFunction;
    onEnter?: ActionFunction;
    onEscape?: ActionFunction;
}
declare const keyDownHandlerProxy: (keyDownEvent: KeyboardEvent, actions: KeyDownHandlerProxyActions) => void;
export default keyDownHandlerProxy;
