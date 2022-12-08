import type { Nullish } from './mix';

/**
 * @typedef {number} TokenIndex
 * @description The array index of token in the tokens
 */
export type TokenIndex = number;

/**
 * @template ET
 * @typedef {Object} TokenMeta - Token's meta data
 * @prop {string} key - A private key for render
 * @prop {boolean} activated - Specific the token is `editing` or not
 * @prop {Nullish | ET} error
 */
export interface TokenMeta<ET = string> {
  /**
   * @prop {string} key - A private key for render
   */
  key: string;

  /**
   * @prop {boolean} activated - Specific the token is `editing` or not
   */
  activated: boolean;

  /**
   * @prop {Nullish | ET} error
   * An error message or an object, which specific the token's `validate status`
   * (Customize data structure built by `onTokenValueValidate`)
   * Could be `an error message` to display, or an error object for further operations.
   * `Nullish` means the token is valid.
   */
  error: Nullish | ET;
}
