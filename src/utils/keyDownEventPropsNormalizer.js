/**
 * Help function to normalize keyDown event properties
 *
 * Q: Why need this?
 * A: Handle the different behaviors with IME
 * - The behavior of Chrome is different on Mac and Windows
 * - The behavior of Chrome and FireFox are different on Mac
 *
 * Playground
 * [Vanilla JS] https://codepen.io/seawind543/pen/gOWNVYR
 * [React JS] https://codepen.io/seawind543/pen/xxdvZyE
 *
 * Reference:
 * [1] https://github.com/facebook/react/issues/13104
 * [2] https://github.com/seawind543/react-token-input/issues/1#issuecomment-896190656
 * [3] https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event#ignoring_keydown_during_ime_composition
 *
 * @ keyDownEvent
 * Type: Event
 * Description: keyDown event
 */
const keyDownEventPropsNormalizer = (keyDownEvent) => {
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
  const {
    key,
    keyCode, // Deprecated in Vanilla JS
  } = keyDownEvent;
  let eventKey = key;

  /**
   * Normalize `key` value for Chrome on Mac
   * When `keyCode` is 229, the `key` should be `Process` to align most browsers.
   */
  if (keyCode && keyCode === 229) {
    eventKey = 'Process';
  }

  return {
    key: eventKey,
  };
};

export default keyDownEventPropsNormalizer;

/**
 * [Mac]
 * Chrome (92.0.4515.159)
 * Firefox (91.0.1)
 *
 * [Win 7]
 * Chrome ()
 * Firefox ()
 */

/**
 * Mac + Chrome
 * Win + Chrome
 * Mac + Firefox
 * Win + Firefox
 */
// React + [a]
// altKey = false
// charCode = 0 // Deprecated
// code = KeyA
// ctrlKey = false
// isComposing = undefined
// key = a
// keyCode = 65 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 0
// metaKey = false
// repeat = false
// shiftKey = false
// which = 65 // Deprecated
//
// Vanilla JS + [a]
// altKey = false
// charCode = 0 // Deprecated
// code = KeyA
// ctrlKey = false
// isComposing = false
// key = a
// keyCode = 65 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 0
// metaKey = false
// repeat = false
// shiftKey = false
// which = 65 // Deprecated

/**
 * Mac + Chrome
 * Mac + Firefox
 */
// React + [ShiftLeft]
// altKey = false
// charCode = 0 // Deprecated
// code = ShiftLeft
// ctrlKey = false
// isComposing = undefined
// key = Shift
// keyCode = 16 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 1
// metaKey = false
// repeat = false
// shiftKey = true
// which = 16 // Deprecated
//
// Vanilla JS + [ShiftLeft]
// altKey = false
// charCode = 0 // Deprecated
// code = ShiftLeft
// ctrlKey = false
// isComposing = false
// key = Shift
// keyCode = 16 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 1
// metaKey = false
// repeat = false
// shiftKey = true
// which = 16 // Deprecated

/**
 * Mac + Chrome
 * Win + Chrome
 * Mac + Firefox
 * Win + Firefox
 */
// React + [Enter]
// altKey = false
// charCode = 0 // Deprecated
// code = Enter
// ctrlKey = false
// isComposing = undefined
// key = Enter
// keyCode = 13 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 0
// metaKey = false
// repeat = false
// shiftKey = false
// which = 13 // Deprecated
//
// Vanilla JS + [Enter]
// altKey = false
// charCode = 0 // Deprecated
// code = Enter
// ctrlKey = false
// isComposing = false
// key = Enter
// keyCode = 13 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 0
// metaKey = false
// repeat = false
// shiftKey = false
// which = 13 // Deprecated

/**
 * Mac + Chrome
 */
// React + [ㄏ]
// altKey = false
// charCode = 0 // Deprecated
// code = KeyC
// ctrlKey = false
// isComposing = undefined
// key = ㄏ
// keyCode = 229 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 0
// metaKey = false
// repeat = false
// shiftKey = false
// which = 229 // Deprecated
//
// Vanilla JS + [ㄏ]
// altKey = false
// charCode = 0 // Deprecated
// code = KeyC
// ctrlKey = false
// isComposing = false
// key = ㄏ
// keyCode = 229 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 0
// metaKey = false
// repeat = false
// shiftKey = false
// which = 229 // Deprecated

/**
 * Win + Chrome
 * Mac + Firefox
 * Win + Firefox
 */
// React + [ㄏ]
// altKey = false
// charCode = 0 // Deprecated
// code = KeyC
// ctrlKey = false
// isComposing = undefined
// key = Process
// keyCode = 229 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 0
// metaKey = false
// repeat = false
// shiftKey = false
// which = 229 // Deprecated
//
// Vanilla JS + [ㄏ]
// altKey = false
// charCode = 0 // Deprecated
// code = KeyC
// ctrlKey = false
// isComposing = false
// key = Process
// keyCode = 229 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 0
// metaKey = false
// repeat = false
// shiftKey = false
// which = 229 // Deprecated

/**
 * Mac + Chrome
 */
// React + [IME Enter]
// altKey = false
// charCode = 0 // Deprecated
// code = Enter
// ctrlKey = false
// isComposing = undefined
// key = Enter
// keyCode = 229 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 0
// metaKey = false
// repeat = false
// shiftKey = false
// which = 229 // Deprecated
//
// Vanilla JS + [IME Enter]
// altKey = false
// charCode = 0 // Deprecated
// code = Enter
// ctrlKey = false
// isComposing = true
// key = Enter
// keyCode = 229 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 0
// metaKey = false
// repeat = false
// shiftKey = false
// which = 229 // Deprecated

/**
 * Win + Chrome
 * Mac + Firefox
 * Win + Firefox
 */
// React + [IME Enter]
// altKey = false
// charCode = 0 // Deprecated
// code = Enter
// ctrlKey = false
// isComposing = undefined
// key = Process
// keyCode = 229 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 0
// metaKey = false
// repeat = false
// shiftKey = false
// which = 229 // Deprecated
//
// Vanilla JS + [IME Enter]
// altKey = false
// charCode = 0 // Deprecated
// code = Enter
// ctrlKey = false
// isComposing = true
// key = Process
// keyCode = 229 // Deprecated
// keyIdentifier = undefined // Deprecated
// location = 0
// metaKey = false
// repeat = false
// shiftKey = false
// which = 229 // Deprecated
