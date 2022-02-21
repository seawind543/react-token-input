/// <reference types="react" />
import { InputString } from './mix';
import { TokenIndex, TokenValue, TokenMeta } from './token';
export declare type OnInputValueChange = (newValue: InputString, previousValue: InputString) => void;
export declare type OnPreprocess = (values: InputString[]) => InputString[];
export declare type OnBuildTokenValue<ValueType> = (inputValue: InputString) => TokenValue<ValueType>;
export declare type OnTokenValuesChange<ValueType> = (modifiedTokenValues: TokenValue<ValueType>[]) => void;
export declare type OnTokenValueValidate<ValueType, ErrorType> = (tokenValue: TokenValue<ValueType>, tokenIndex: TokenIndex, tokenValues: TokenValue<ValueType>[]) => TokenMeta<ErrorType>['error'];
export declare type OnGetTokenClassName<ValueType, ErrorType> = (tokenValue: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => string;
export declare type OnGetTokenDisplayLabel<ValueType, ErrorType> = (tokenValue: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => InputString | React.ReactNode;
export declare type OnRenderTokenDeleteButtonContent = () => React.ReactNode;
export declare type OnIsTokenEditable<ValueType, ErrorType> = (tokenValue: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => boolean;
export declare type OnGetTokenEditableValue<ValueType, ErrorType> = (tokenValue: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => InputString;
export declare type OnGetTokenErrorMessage<ValueType, ErrorType> = (tokenValue: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => TokenMeta<ErrorType>['error'];
