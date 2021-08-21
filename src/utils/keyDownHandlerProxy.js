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

  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
  let eventKey = {
    Backspace: 'Backspace',
    Enter: 'Enter',
    Escape: 'Escape',
  }[keyDownEvent.key];

  // Issue: https://github.com/seawind543/react-token-input/issues/1#issuecomment-896190656
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event#ignoring_keydown_during_ime_composition
  if (keyDownEvent.keyCode && keyDownEvent.keyCode === 229) {
    eventKey = 'Process';
  }

  // backward compatibility for browser not support event.key, such as safari
  // https://www.w3schools.com/jsref/event_key_key.asp
  if (eventKey === undefined) {
    eventKey = {
      8: 'Backspace',
      13: 'Enter',
      27: 'Escape',
    }[keyDownEvent.keyCode];
  }

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
