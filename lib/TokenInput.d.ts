import React, { type CSSProperties, type ReactElement } from 'react';
import { type TokenCreatorRef } from './TokenCreator';
import { type TokenProps } from './Token';
import type { TokenSeparator } from './types/mix';
import type { SpecialKeyDownConfig } from './types/specialKeyDown';
import type { OnInputValueChange, OnPreprocess, OnBuildTokenValue, OnTokenValueValidate, OnTokenValuesChange, OnGetTokenClassName, OnGetTokenDisplayLabel, OnRenderTokenDeleteButtonContent, OnGetIsTokenEditable, OnGetTokenEditableValue, OnGetTokenErrorMessage } from './types/interfaces';
export interface TokenInputRef {
    focus: TokenCreatorRef['focus'];
    setCreatorValue: TokenCreatorRef['setValue'];
}
export interface TokenInputProps<ValueType = string, ErrorType = string> {
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
    customizeTokenComponent?: (props: TokenProps<ValueType, ErrorType>) => ReactElement | null;
    onGetTokenClassName?: OnGetTokenClassName<ValueType, ErrorType>;
    onGetTokenDisplayLabel?: OnGetTokenDisplayLabel<ValueType, ErrorType>;
    onRenderTokenDeleteButtonContent?: OnRenderTokenDeleteButtonContent;
    onGetIsTokenEditable?: OnGetIsTokenEditable<ValueType, ErrorType>;
    onGetTokenEditableValue?: OnGetTokenEditableValue<ValueType, ErrorType>;
    onGetTokenErrorMessage?: OnGetTokenErrorMessage<ValueType, ErrorType>;
    onCreatorFocus?: React.FocusEventHandler<HTMLInputElement>;
    onCreatorBlur?: React.FocusEventHandler<HTMLInputElement>;
    onCreatorKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}
declare const TokenInput: <ValueType, ErrorType>(props: TokenInputProps<ValueType, ErrorType>, ref?: React.ForwardedRef<TokenInputRef>) => JSX.Element;
declare const WrappedTokenInput: <ValueType = string, ErrorType = string>(p: TokenInputProps<ValueType, ErrorType> & {
    ref?: React.ForwardedRef<TokenInputRef> | undefined;
}) => ReturnType<typeof TokenInput>;
export default WrappedTokenInput;
