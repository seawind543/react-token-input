import { useCallback } from 'react';

import type { TokenIndex, OnTokenValuesChange } from '../types/token';
import type { SetTokenActivated } from './useTokenMetas';
import type {
  HandleTokenInputFocus,
  HandleTokenInputBlur,
} from './useTokenInputFocusEffect';

type HandleTokenEditStart = (targetIndex: TokenIndex) => void;
type HandleTokenEditEnd<TokenValue> = (
  targetIndex: TokenIndex
) => (newTokenValue?: TokenValue) => void;

type ParameterType<ValueType, ErrorType> = {
  tokenValues: ValueType[];
  onTokenValuesChange: OnTokenValuesChange<ValueType>;
  setTokenActivated: SetTokenActivated<ErrorType>;
  handleTokenInputFocus: HandleTokenInputFocus;
  handleTokenInputBlur: HandleTokenInputBlur;
};

function useTokenEdit<TokenValue, ErrorType>({
  tokenValues,
  onTokenValuesChange,
  setTokenActivated,
  handleTokenInputFocus,
  handleTokenInputBlur,
}: ParameterType<TokenValue, ErrorType>) {
  const handleTokenEditStart: HandleTokenEditStart = useCallback(
    (targetIndex: TokenIndex) => () => {
      // console.log('handleTokenEditStart; targetIndex', targetIndex);
      setTokenActivated(targetIndex, true);
      handleTokenInputFocus();
    },
    [setTokenActivated, handleTokenInputFocus]
  );

  const handleTokenEditEnd: HandleTokenEditEnd<TokenValue> = useCallback(
    (targetIndex: TokenIndex) => (newTokenValue) => {
      // console.log(
      //   'handleTokenEditEnd; targetIndex',
      //   targetIndex,
      //   'newTokenValue',
      //   `${newTokenValue}`
      // );

      setTokenActivated(targetIndex, false);
      handleTokenInputBlur();

      // TODO: Consider split editEnd and tokenValue update
      if (typeof newTokenValue === 'undefined') {
        // Avoid meaningless update
        return;
      }

      const modifiedTokenValues = [...tokenValues];
      modifiedTokenValues[targetIndex] = newTokenValue;
      onTokenValuesChange(modifiedTokenValues);
    },
    [tokenValues, onTokenValuesChange, setTokenActivated, handleTokenInputBlur]
  );

  return {
    handleTokenEditStart,
    handleTokenEditEnd,
  };
}

export default useTokenEdit;
