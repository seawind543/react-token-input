import type { ReactNode } from 'react';
import { InputString, Nullish } from './mix';
import { Index, TokenMeta } from './token';
export interface OnInputValueChange {
    (inputValue: InputString, previousValue: InputString): void;
}
export interface OnPreprocess {
    (inputValues: InputString[]): InputString[];
}
export interface OnBuildTokenValue<VT> {
    (inputValue: InputString): VT;
}
export interface OnTokenValuesChange<VT> {
    (values: VT[]): void;
}
export interface OnTokenValueValidate<VT, ET> {
    (value: VT, index: Index, values: VT[]): TokenMeta<ET>['error'];
}
export interface OnGetTokenClassName<VT, ET> {
    (value: VT, meta: TokenMeta<ET>): undefined | string;
}
export interface OnGetTokenDisplayLabel<VT, ET> {
    (value: VT, meta: TokenMeta<ET>): InputString | ReactNode;
}
export interface OnRenderTokenDeleteButtonContent {
    (): ReactNode;
}
export interface OnGetIsTokenEditable<VT, ET> {
    (value: VT, meta: TokenMeta<ET>): boolean;
}
export interface OnGetTokenEditableValue<VT, ET> {
    (value: VT, meta: TokenMeta<ET>): InputString;
}
export interface OnGetTokenErrorMessage<VT, ET> {
    (value: VT, meta: TokenMeta<ET>): string | Nullish;
}
