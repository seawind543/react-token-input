/**
 * Help function to handle keyDown event
 *
 * @ keyDownEvent
 * Type: Event
 * Description: keyDown event
 *
 * @ actions.onBackspace
 * Type: function
 * Description: callback function when keyDone on Backspace
 *
 * @ actions.onEnter
 * Type: function
 * Description: callback function when keyDone on Enter
 *
 * @ actions.onEscape
 * Type: function
 * Description: callback function when keyDone on Escape
 */
const keyDownHandler = (keyDownEvent, actions) => {
  const {
    onBackspace = () => {},
    onEnter = () => {},
    onEscape = () => {},
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
      onBackspace();
      break;

    case 'Enter':
      onEnter();
      break;

    case 'Escape':
      onEscape();
      break;

    default:
  }
};

export default keyDownHandler;
