import type { ReactNode } from 'react';
import { InputString } from './mix';
import { TokenIndex, TokenMeta } from './token';
export interface OnInputValueChange {
    (newValue: InputString, previousValue: InputString): void;
}
export interface OnPreprocess {
    (values: InputString[]): InputString[];
}
export interface OnBuildTokenValue<ValueType> {
    (inputValue: InputString): ValueType;
}
export interface OnTokenValuesChange<ValueType> {
    (modifiedTokenValues: ValueType[]): void;
}
export interface OnTokenValueValidate<ValueType, ErrorType> {
    (tokenValue: ValueType, tokenIndex: TokenIndex, tokenValues: ValueType[]): TokenMeta<ErrorType>['error'];
}
export interface OnGetTokenClassName<ValueType, ErrorType> {
    (tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>): undefined | string;
}
export interface OnGetTokenDisplayLabel<ValueType, ErrorType> {
    (tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>): InputString | ReactNode;
}
export interface OnRenderTokenDeleteButtonContent {
    (): ReactNode;
}
export interface OnGetIsTokenEditable<ValueType, ErrorType> {
    (tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>): boolean;
}
export interface OnGetTokenEditableValue<ValueType, ErrorType> {
    (tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>): InputString;
}
export interface OnGetTokenErrorMessage<ValueType, ErrorType> {
    (tokenValue: ValueType, tokenMeta: TokenMeta<ErrorType>): TokenMeta<ErrorType>['error'];
}
