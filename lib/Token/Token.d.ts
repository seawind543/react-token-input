import React from 'react';
import type { TokenMeta } from '../types/token';
import type { OnBuildTokenValue, OnGetTokenClassName, OnGetTokenDisplayLabel, OnRenderTokenDeleteButtonContent, OnGetIsTokenEditable, OnGetTokenEditableValue, OnGetTokenErrorMessage } from '../types/interfaces';
export interface TokenProps<ValueType = string, ErrorType = string> {
    readOnly: boolean;
    tokenValue: ValueType;
    tokenMeta: TokenMeta<ErrorType>;
    onGetClassName?: OnGetTokenClassName<ValueType, ErrorType>;
    onGetDisplayLabel: OnGetTokenDisplayLabel<ValueType, ErrorType>;
    onRenderDeleteButtonContent?: OnRenderTokenDeleteButtonContent;
    onGetIsEditable: OnGetIsTokenEditable<ValueType, ErrorType>;
    onGetEditableValue: OnGetTokenEditableValue<ValueType, ErrorType>;
    onBuildTokenValue: OnBuildTokenValue<ValueType>;
    onGetErrorMessage: OnGetTokenErrorMessage<ValueType, ErrorType>;
    onEditStart: () => void;
    onEditEnd: (newTokenValue?: ValueType) => void;
    onDelete: () => void;
}
declare const Token: <ValueType = string, ErrorType = string>(props: TokenProps<ValueType, ErrorType>) => React.JSX.Element;
export default Token;
