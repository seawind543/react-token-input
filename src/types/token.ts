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
   * An object which specific the token's `validate status`
   * (Customize data structure built by `onTokenValue Validate`)
   * Could be `an error message` to display or error object
   * `undefined` means the token is valid
   */
  error: undefined | ErrorType;
};
