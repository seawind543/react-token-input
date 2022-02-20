export declare type TokenValue<ValueType> = ValueType;
export declare type TokenIndex = number;
export declare type TokenMeta<ErrorType> = {
    key: string;
    activated: boolean;
    error: ErrorType;
};
export declare type OnTokenValueValidate<ValueType, ErrorType> = (tokenValue: ValueType, tokenIndex: TokenIndex, tokenValues: ValueType[]) => TokenMeta<ErrorType>['error'];
export declare type OnTokenValuesChange<ValueType> = (modifiedTokenValues: ValueType[]) => void;
