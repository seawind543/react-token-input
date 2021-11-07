/**
 * The user input (typing) value.
 */
export type InputValue = string;

/**
 * Type: any (string | number | object | customize data structure)
 * Description: The tokenValue build by `onBuildTokenValue`
 */
export type TokenValue = string | number | object;

export type TokenIndex = number;

export type TokenActivated = boolean;

/* eslint @typescript-eslint/no-explicit-any: 0 */
export type TokenError = any;

export type TokenMetaKey = string;
export type TokenMeta = {
  key: TokenMetaKey;
  activated: TokenActivated;
  error: TokenError;
};
