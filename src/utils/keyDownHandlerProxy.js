import keyDownEventPropsNormalizer from './keyDownEventPropsNormalizer';

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
 * @ actions.onEnter
 * Type: function
 * Description: callback function when `Enter` keyDone
 *
 * @ actions.onEscape
 * Type: function
 * Description: callback function when `Escape` keyDone
 */
const dummyFunction = () => {};
const keyDownHandlerProxy = (keyDownEvent, actions) => {
  const {
    onBackspace = dummyFunction,
    onEnter = dummyFunction,
    onEscape = dummyFunction,
  } = actions;

  const { key: eventKey } = keyDownEventPropsNormalizer(keyDownEvent);

  switch (eventKey) {
    case 'Backspace':
      onBackspace(keyDownEvent);
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
