import type { TokenMeta } from '../types/token';
import type { OnBuildTokenValue, OnGetTokenClassName, OnGetTokenDisplayLabel, OnRenderTokenDeleteButtonContent, OnGetIsTokenEditable, OnGetTokenEditableValue, OnGetTokenErrorMessage } from '../types/interfaces';
export interface TokenProps<ValueType, ErrorType> {
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
declare const Token: <ValueType, ErrorType>(props: TokenProps<ValueType, ErrorType>) => JSX.Element;
export default Token;
