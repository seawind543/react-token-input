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

  let eventKey;

  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
  const eventKeys = ['Backspace', 'Enter', 'Escape'];
  const keyIndex = eventKeys.indexOf(keyDownEvent.key);
  eventKey = eventKeys[keyIndex];

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
