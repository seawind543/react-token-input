import React from 'react';
import type { HandleTokenInputFocus, HandleTokenInputBlur } from './hooks/useTokenInputFocusEffect';
import type { InputValue, Separator } from './types/mix';
import type { SpecialKeyDownConfig } from './types/specialKeyDown';
import type { TokenValue } from './types/token';
declare type Props<ValueType> = {
    placeholder: string;
    autoFocus: boolean;
    onFocus: HandleTokenInputFocus;
    onBlur: HandleTokenInputBlur;
    separators: Separator[];
    specialKeyDown: SpecialKeyDownConfig;
    onInputValueChange: (newValue: InputValue, previousValue: InputValue) => void;
    onPreprocess: (values: InputValue[]) => InputValue[];
    onBuildTokenValue: (stringValue: InputValue) => TokenValue<ValueType>;
    onNewTokenValuesAppend: (appendTokenValues: TokenValue<ValueType>[]) => void;
    onLastTokenDelete: () => void;
};
declare const TokenCreator: <ValueType>(p: Props<ValueType> & {
    ref: React.Ref<HTMLInputElement>;
}) => React.ReactElement | null;
export default TokenCreator;
