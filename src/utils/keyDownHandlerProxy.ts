import keyDownKey from 'keydown-key';

interface ActionFunction {
  (keyDownEvent: KeyboardEvent): void;
}

interface KeyDownHandlerProxyActions {
  onBackspace?: ActionFunction;
  onTab?: ActionFunction;
  onEnter?: ActionFunction;
  onEscape?: ActionFunction;
}

/**
 * Help function to proxy keyDown event to handler
 *
 * @param {KeyboardEvent} keyDownEvent - The keyDown event
 * @param {KeyDownHandlerProxyActions} actions
 * @param {ActionFunction} [actions.onBackspace] - The handler for `backspace` keyDown event
 * @param {ActionFunction} [actions.onTab] - The handler for `tab` keyDown event
 * @param {ActionFunction} [actions.onEnter] - The handler for `enter` keyDown event
 * @param {ActionFunction} [actions.onEscape] - The handler for `escape` keyDown event
 */
const keyDownHandlerProxy = (
  keyDownEvent: KeyboardEvent,
  actions: KeyDownHandlerProxyActions
): void => {
  const { onBackspace, onTab, onEnter, onEscape } = actions;

  const { key: eventKey } = keyDownKey(keyDownEvent);

  switch (eventKey) {
    case 'Backspace':
      onBackspace?.(keyDownEvent);
      break;

    case 'Tab':
      onTab?.(keyDownEvent);
      break;

    case 'Enter':
      onEnter?.(keyDownEvent);
      break;

    case 'Escape':
      onEscape?.(keyDownEvent);
      break;

    default:
  }
};

export default keyDownHandlerProxy;
