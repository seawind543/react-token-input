import React from 'react';
import type { InputString, TokenSeparator } from './types/mix';
import type { SpecialKeyDownConfig } from './types/specialKeyDown';
import type { OnInputValueChange, OnPreprocess, OnBuildTokenValue } from './types/interfaces';
export interface TokenCreatorRef {
    focus: HTMLInputElement['focus'];
    setValue: (value: InputString) => void;
    getValue: () => InputString;
    createTokens: (value?: InputString) => void;
}
interface TokenCreatorProps<VT = string> {
    placeholder?: string;
    disableCreateOnBlur?: boolean;
    autoFocus: boolean;
    onFocus: React.FocusEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    separators: TokenSeparator[];
    specialKeyDown: SpecialKeyDownConfig;
    onInputValueChange?: OnInputValueChange;
    onPreprocess: OnPreprocess;
    onBuildTokenValue: OnBuildTokenValue<VT>;
    onNewTokenValuesAppend: (appendTokenValues: VT[]) => void;
    onLastTokenDelete: () => void;
}
declare const TokenCreator: <VT>(props: TokenCreatorProps<VT>, ref: React.ForwardedRef<TokenCreatorRef>) => React.JSX.Element;
declare const WrappedTokenCreator: <VT = string>(p: TokenCreatorProps<VT> & {
    ref: React.ForwardedRef<TokenCreatorRef>;
}) => ReturnType<typeof TokenCreator>;
export default WrappedTokenCreator;
