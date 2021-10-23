import keyDownEventPropsNormalizer from './keyDownEventPropsNormalizer';
import dummyFunction from './dummyFunction';

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
const keyDownHandlerProxy = (keyDownEvent, actions) => {
  const {
    onBackspace = dummyFunction,
    onTab = dummyFunction,
    onEnter = dummyFunction,
    onEscape = dummyFunction,
  } = actions;

  const { key: eventKey } = keyDownEventPropsNormalizer(keyDownEvent);

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
