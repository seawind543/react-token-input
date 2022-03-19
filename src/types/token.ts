import type { Nullish } from './mix';

/**
 * The type which build-in default functions take
 */
export type DefaultValueType = string;

/**
 * Type: any (string | number | object | customize data structure...etc)
 * Description: The tokenValue build by `onBuildTokenValue`
 */
export type TokenValue<ValueType> = DefaultValueType | ValueType;

// The index of tokenValue in tokenValues
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
