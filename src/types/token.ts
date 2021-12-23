/**
 * The user input (keyboard typing) value.
 */
export type InputValue = string;

/**
 * Type: any (string | number | object | customize data structure)
 * Description: The tokenValue build by `onBuildTokenValue`
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TokenValue = string | number | object | any;

export type TokenIndex = number;

export type TokenMeta = {
  key: string;
  activated: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
};
