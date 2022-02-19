import React from 'react';
import type { TokenValue, TokenMeta, InputValue } from '../types/token';
declare type Props<ValueType, ErrorType> = {
    readOnly: boolean;
    tokenValue: TokenValue<ValueType>;
    tokenMeta: TokenMeta<ErrorType>;
    onGetClassName: (tokenValue: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => string;
    onGetDisplayLabel: (tokenValue: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => string | React.ReactNode;
    onRenderDeleteButtonContent?: () => React.ReactNode;
    onIsEditable: (tokenValue: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => boolean;
    onGetEditableValue: (tokenValue: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => InputValue;
    onGetErrorMessage: (tokenValue: TokenValue<ValueType>, tokenMeta: TokenMeta<ErrorType>) => string | ErrorType;
    onBuildTokenValue: (stringValue: InputValue) => TokenValue<ValueType>;
    onEditStart: () => void;
    onEditEnd: (newTokenValue?: TokenValue<ValueType>) => void;
    onDelete: () => void;
};
declare const Token: <ValueType, ErrorType>({ readOnly, tokenValue, tokenMeta, onGetClassName, onGetDisplayLabel, onRenderDeleteButtonContent, onIsEditable, onGetEditableValue, onGetErrorMessage, onBuildTokenValue, onEditStart, onEditEnd, onDelete, }: Props<ValueType, ErrorType>) => JSX.Element;
export default Token;