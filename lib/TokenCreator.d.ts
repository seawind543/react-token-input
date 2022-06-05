import { type ReactElement, type Ref } from 'react';
import type { HandleTokenInputFocus, HandleTokenInputBlur } from './hooks/useTokenInputFocusEffect';
import type { TokenSeparator } from './types/mix';
import type { SpecialKeyDownConfig } from './types/specialKeyDown';
import type { OnInputValueChange, OnPreprocess, OnBuildTokenValue } from './types/interfaces';
declare type TokenCreatorProps<ValueType> = {
    placeholder?: string;
    autoFocus: boolean;
    onFocus: HandleTokenInputFocus;
    onBlur: HandleTokenInputBlur;
    separators: TokenSeparator[];
    specialKeyDown: SpecialKeyDownConfig;
    onInputValueChange?: OnInputValueChange;
    onPreprocess: OnPreprocess;
    onBuildTokenValue: OnBuildTokenValue<ValueType>;
    onNewTokenValuesAppend: (appendTokenValues: ValueType[]) => void;
    onLastTokenDelete: () => void;
};
declare const TokenCreator: <ValueType>(p: TokenCreatorProps<ValueType> & {
    ref: Ref<HTMLInputElement>;
}) => ReactElement | null;
export default TokenCreator;
