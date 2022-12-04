import TokenInput, {
  type TokenInputRef,
  type TokenInputProps,
} from './TokenInput';
import type { TokenProps } from './Token';
import {
  JS__TOKEN__DELETE_BUTTON__CLASS_NAME,
  KEY_DOWN_HANDLER_CONFIG_OPTION,
} from './constants';

export {
  /**
   * @description
   * The type of ref methods of component TokenInput
   */
  TokenInputRef,

  /**
   * @description
   * The type of props of component TokenInput
   */
  TokenInputProps,

  /**
   * @description
   * The type of props of component Token
   */
  TokenProps,

  /**
   * @description
   * A constant string of the className for customize the `delete button`
   * in the `TokenLabel` (onGetTokenDisplayLabel)
   */
  JS__TOKEN__DELETE_BUTTON__CLASS_NAME,

  /**
   * A constant object to help config the special keyDown event handler setting
   */
  KEY_DOWN_HANDLER_CONFIG_OPTION,
};

export default TokenInput;
