import type { TokenValue, TokenMeta } from '../types/token';
import type { OnBuildTokenValue, OnGetTokenClassName, OnGetTokenDisplayLabel, OnRenderTokenDeleteButtonContent, OnGetIsTokenEditable, OnGetTokenEditableValue, OnGetTokenErrorMessage } from '../types/interfaces';
declare type Props<ValueType, ErrorType> = {
    readOnly: boolean;
    tokenValue: TokenValue<ValueType>;
    tokenMeta: TokenMeta<ErrorType>;
    onGetClassName?: OnGetTokenClassName<ValueType, ErrorType>;
    onGetDisplayLabel: OnGetTokenDisplayLabel<ValueType, ErrorType>;
    onRenderDeleteButtonContent?: OnRenderTokenDeleteButtonContent;
    onGetIsEditable: OnGetIsTokenEditable<ValueType, ErrorType>;
    onGetEditableValue: OnGetTokenEditableValue<ValueType, ErrorType>;
    onBuildTokenValue: OnBuildTokenValue<ValueType>;
    onGetErrorMessage: OnGetTokenErrorMessage<ValueType, ErrorType>;
    onEditStart: () => void;
    onEditEnd: (newTokenValue?: TokenValue<ValueType>) => void;
    onDelete: () => void;
};
declare const Token: <ValueType, ErrorType>({ readOnly, tokenValue, tokenMeta, onGetClassName, onGetDisplayLabel, onRenderDeleteButtonContent, onGetIsEditable, onGetEditableValue, onGetErrorMessage, onBuildTokenValue, onEditStart, onEditEnd, onDelete, }: Props<ValueType, ErrorType>) => JSX.Element;
export default Token;
