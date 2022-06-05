import { type CSSProperties, type FunctionComponent } from 'react';
import { type TokenProps } from './Token';
import type { TokenSeparator } from './types/mix';
import type { SpecialKeyDownConfig } from './types/specialKeyDown';
import type { OnInputValueChange, OnPreprocess, OnBuildTokenValue, OnTokenValueValidate, OnTokenValuesChange, OnGetTokenClassName, OnGetTokenDisplayLabel, OnRenderTokenDeleteButtonContent, OnGetIsTokenEditable, OnGetTokenEditableValue, OnGetTokenErrorMessage } from './types/interfaces';
export declare type TokenInputProps<ValueType, ErrorType> = {
    style?: CSSProperties;
    className?: string;
    placeholder?: string;
    readOnly?: boolean;
    autoFocus?: boolean;
    tokenValues: ValueType[];
    separators?: TokenSeparator[];
    specialKeyDown?: SpecialKeyDownConfig;
    onInputValueChange?: OnInputValueChange;
    onPreprocess?: OnPreprocess;
    onTokenValueValidate?: OnTokenValueValidate<ValueType, ErrorType>;
    onTokenValuesChange?: OnTokenValuesChange<ValueType>;
    onBuildTokenValue?: OnBuildTokenValue<ValueType>;
    customizeTokenComponent?: FunctionComponent<TokenProps<ValueType, ErrorType>>;
    onGetTokenClassName?: OnGetTokenClassName<ValueType, ErrorType>;
    onGetTokenDisplayLabel?: OnGetTokenDisplayLabel<ValueType, ErrorType>;
    onRenderTokenDeleteButtonContent?: OnRenderTokenDeleteButtonContent;
    onGetIsTokenEditable?: OnGetIsTokenEditable<ValueType, ErrorType>;
    onGetTokenEditableValue?: OnGetTokenEditableValue<ValueType, ErrorType>;
    onGetTokenErrorMessage?: OnGetTokenErrorMessage<ValueType, ErrorType>;
};
declare const TokenInput: <ValueType, ErrorType>(props: TokenInputProps<ValueType, ErrorType>) => JSX.Element;
export default TokenInput;
