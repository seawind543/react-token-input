import keyDownKey from 'keydown-key';
import dummyFunction from './dummyFunction';

type ActionFunction = (keyDownEvent: KeyboardEvent) => void;
type KeyDownHandlerProxyActions = {
  onBackspace?: ActionFunction;
  onTab?: ActionFunction;
  onEnter?: ActionFunction;
  onEscape?: ActionFunction;
};

/**
 * Help function to proxy keyDown event to handler
 *
 * @ keyDownEvent
 * Type: Event
 * Description: keyDown event
 *
 * @ actions.onBackspace
 * Type: function
 * Description: callback function when `Backspace` keyDone
 *
 * @ actions.onTab
 * Type: function
 * Description: callback function when `Tab` keyDone
 *
 * @ actions.onEnter
 * Type: function
 * Description: callback function when `Enter` keyDone
 *
 * @ actions.onEscape
 * Type: function
 * Description: callback function when `Escape` keyDone
 */
const keyDownHandlerProxy = (
  keyDownEvent: KeyboardEvent,
  actions: KeyDownHandlerProxyActions
): void => {
  const {
    onBackspace = dummyFunction,
    onTab = dummyFunction,
    onEnter = dummyFunction,
    onEscape = dummyFunction,
  } = actions;

  const { key: eventKey } = keyDownKey(keyDownEvent);

  switch (eventKey) {
    case 'Backspace':
      onBackspace(keyDownEvent);
      break;

    case 'Tab':
      onTab(keyDownEvent);
      break;

    case 'Enter':
      onEnter(keyDownEvent);
      break;

    case 'Escape':
      onEscape(keyDownEvent);
      break;

    default:
  }
};

export default keyDownHandlerProxy;
