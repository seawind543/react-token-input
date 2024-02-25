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
interface TokenCreatorProps<ValueType = string> {
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
    onBuildTokenValue: OnBuildTokenValue<ValueType>;
    onNewTokenValuesAppend: (appendTokenValues: ValueType[]) => void;
    onLastTokenDelete: () => void;
}
declare const TokenCreator: <ValueType>(props: TokenCreatorProps<ValueType>, ref: React.ForwardedRef<TokenCreatorRef>) => React.JSX.Element;
declare const WrappedTokenCreator: <ValueType = string>(p: TokenCreatorProps<ValueType> & {
    ref: React.ForwardedRef<TokenCreatorRef>;
}) => ReturnType<typeof TokenCreator>;
export default WrappedTokenCreator;
