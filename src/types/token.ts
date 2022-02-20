/**
 * Type: any (string | number | object | customize data structure)
 * Description: The tokenValue build by `onBuildTokenValue`
 */
export type TokenValue<ValueType> = ValueType;

export type TokenIndex = number;

export type TokenMeta<ErrorType> = {
  key: string;
  activated: boolean;
  error: ErrorType;
};

export type OnTokenValueValidate<ValueType, ErrorType> = (
  tokenValue: ValueType,
  tokenIndex: TokenIndex,
  tokenValues: ValueType[]
) => TokenMeta<ErrorType>['error'];

export type OnTokenValuesChange<ValueType> = (
  modifiedTokenValues: ValueType[]
) => void;
