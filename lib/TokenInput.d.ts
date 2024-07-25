import React, { type CSSProperties, type ReactElement } from 'react';
import { type TokenCreatorRef } from './TokenCreator';
import { type TokenProps } from './Token';
import type { InputString, TokenSeparator } from './types/mix';
import type { SpecialKeyDownConfig } from './types/specialKeyDown';
import type { OnInputValueChange, OnPreprocess, OnBuildTokenValue, OnTokenValueValidate, OnTokenValuesChange, OnGetTokenClassName, OnGetTokenDisplayLabel, OnRenderTokenDeleteButtonContent, OnGetIsTokenEditable, OnGetTokenEditableValue, OnGetTokenErrorMessage } from './types/interfaces';
export interface TokenInputRef {
    focus: TokenCreatorRef['focus'];
    setCreatorValue: TokenCreatorRef['setValue'];
    getCreatorValue: () => InputString;
    createTokens: (value?: InputString) => void;
}
export interface TokenInputProps<VT = string, ET = string> {
    style?: CSSProperties;
    className?: string;
    placeholder?: string;
    readOnly?: boolean;
    disableCreateOnBlur?: boolean;
    autoFocus?: boolean;
    tokenValues: VT[];
    separators?: TokenSeparator[];
    specialKeyDown?: SpecialKeyDownConfig;
    onInputValueChange?: OnInputValueChange;
    onPreprocess?: OnPreprocess;
    onTokenValueValidate?: OnTokenValueValidate<VT, ET>;
    onTokenValuesChange?: OnTokenValuesChange<VT>;
    onBuildTokenValue?: OnBuildTokenValue<VT>;
    customizeTokenComponent?: (props: TokenProps<VT, ET>) => ReactElement | null;
    onGetTokenClassName?: OnGetTokenClassName<VT, ET>;
    onGetTokenDisplayLabel?: OnGetTokenDisplayLabel<VT, ET>;
    onRenderTokenDeleteButtonContent?: OnRenderTokenDeleteButtonContent;
    onGetIsTokenEditable?: OnGetIsTokenEditable<VT, ET>;
    onGetTokenEditableValue?: OnGetTokenEditableValue<VT, ET>;
    onGetTokenErrorMessage?: OnGetTokenErrorMessage<VT, ET>;
    onCreatorFocus?: React.FocusEventHandler<HTMLInputElement>;
    onCreatorBlur?: React.FocusEventHandler<HTMLInputElement>;
    onCreatorKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}
declare const TokenInput: <VT, ET>(props: TokenInputProps<VT, ET>, ref?: React.ForwardedRef<TokenInputRef>) => React.JSX.Element;
declare const WrappedTokenInput: <VT = string, ET = string>(p: TokenInputProps<VT, ET> & {
    ref?: React.ForwardedRef<TokenInputRef>;
}) => ReturnType<typeof TokenInput>;
export default WrappedTokenInput;
