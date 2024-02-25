import React from 'react';
import type { TokenMeta } from '../types/token';
import type { OnBuildTokenValue, OnGetTokenClassName, OnGetTokenDisplayLabel, OnRenderTokenDeleteButtonContent, OnGetIsTokenEditable, OnGetTokenEditableValue, OnGetTokenErrorMessage } from '../types/interfaces';
export interface TokenProps<VT = string, ET = string> {
    readOnly: boolean;
    tokenValue: VT;
    tokenMeta: TokenMeta<ET>;
    onGetClassName?: OnGetTokenClassName<VT, ET>;
    onGetDisplayLabel: OnGetTokenDisplayLabel<VT, ET>;
    onRenderDeleteButtonContent?: OnRenderTokenDeleteButtonContent;
    onGetIsEditable: OnGetIsTokenEditable<VT, ET>;
    onGetEditableValue: OnGetTokenEditableValue<VT, ET>;
    onBuildTokenValue: OnBuildTokenValue<VT>;
    onGetErrorMessage: OnGetTokenErrorMessage<VT, ET>;
    onEditStart: () => void;
    onEditEnd: (newTokenValue?: VT) => void;
    onDelete: () => void;
}
declare const Token: <VT = string, ET = string>(props: TokenProps<VT, ET>) => React.JSX.Element;
export default Token;
