import type { Nullish } from './mix';

// The array index of token in the tokens
export type TokenIndex = number;

export type TokenMeta<ErrorType> = {
  // A private key for render
  key: string;

  // Specific the token is `editing` or not
  activated: boolean;

  /**
   * An error message or an object, which specific the token's `validate status`
   * (Customize data structure built by `onTokenValueValidate`)
   * Could be `an error message` to display, or an error object for further operations.
   * `Nullish` means the token is valid.
   */
  error: Nullish | ErrorType;
};
