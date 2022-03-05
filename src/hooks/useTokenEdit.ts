import { useCallback } from 'react';

import type { OnTokenValuesChange } from '../types/interfaces';
import type { TokenValue, TokenIndex } from '../types/token';
import type { SetTokenActivated } from './useTokenMetas';
import type {
  HandleTokenInputFocus,
  HandleTokenInputBlur,
} from './useTokenInputFocusEffect';

type HandleTokenEditStart = (targetIndex: TokenIndex) => () => void;
type HandleTokenEditEnd<ValueType> = (
  targetIndex: TokenIndex
) => (newTokenValue?: TokenValue<ValueType>) => void;

type ParameterType<ValueType, ErrorType> = {
  tokenValues: TokenValue<ValueType>[];
  onTokenValuesChange?: OnTokenValuesChange<ValueType>;
  setTokenActivated: SetTokenActivated<ErrorType>;
  handleTokenInputFocus: HandleTokenInputFocus;
  handleTokenInputBlur: HandleTokenInputBlur;
};

function useTokenEdit<ValueType, ErrorType>({
  tokenValues,
  onTokenValuesChange,
  setTokenActivated,
  handleTokenInputFocus,
  handleTokenInputBlur,
}: ParameterType<ValueType, ErrorType>) {
  const handleTokenEditStart: HandleTokenEditStart = useCallback(
    (targetIndex: TokenIndex) => () => {
      // console.log('handleTokenEditStart; targetIndex', targetIndex);
      setTokenActivated(targetIndex, true);
      handleTokenInputFocus();
    },
    [setTokenActivated, handleTokenInputFocus]
  );

  const handleTokenEditEnd: HandleTokenEditEnd<ValueType> = useCallback(
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
      onTokenValuesChange?.(modifiedTokenValues);
    },
    [tokenValues, onTokenValuesChange, setTokenActivated, handleTokenInputBlur]
  );

  return {
    handleTokenEditStart,
    handleTokenEditEnd,
  };
}

export default useTokenEdit;
