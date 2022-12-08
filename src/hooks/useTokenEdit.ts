import { useCallback } from 'react';

import type { OnTokenValuesChange } from '../types/interfaces';
import type { TokenIndex } from '../types/token';
import type { SetTokenActivated } from './useTokenMetas';
import type { TokenInputFocusHandler } from './useTokenInputFocusEffect';

interface HandleTokenEditStart {
  (targetIndex: TokenIndex): () => void;
}
interface HandleTokenEditEnd<VT> {
  (targetIndex: TokenIndex): (newTokenValue?: VT) => void;
}

interface Params<VT, ErrorType> {
  tokenValues: VT[];
  onTokenValuesChange?: OnTokenValuesChange<VT>;
  setTokenActivated: SetTokenActivated<ErrorType>;
  handleTokenInputFocus: TokenInputFocusHandler;
  handleTokenInputBlur: TokenInputFocusHandler;
}

function useTokenEdit<VT, ErrorType>(params: Params<VT, ErrorType>) {
  const {
    tokenValues,
    onTokenValuesChange,
    setTokenActivated,
    handleTokenInputFocus,
    handleTokenInputBlur,
  } = params;

  const handleTokenEditStart: HandleTokenEditStart = useCallback(
    (targetIndex: TokenIndex) => () => {
      // console.log('handleTokenEditStart; targetIndex', targetIndex);
      setTokenActivated(targetIndex, true);
      handleTokenInputFocus();
    },
    [setTokenActivated, handleTokenInputFocus],
  );

  const handleTokenEditEnd: HandleTokenEditEnd<VT> = useCallback(
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
    [tokenValues, onTokenValuesChange, setTokenActivated, handleTokenInputBlur],
  );

  return {
    handleTokenEditStart,
    handleTokenEditEnd,
  };
}

export default useTokenEdit;
