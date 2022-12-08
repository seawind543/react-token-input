import { useCallback } from 'react';

import type { OnTokenValuesChange } from '../types/interfaces';
import type { Index } from '../types/token';
import type { SetTokenActivated } from './useTokenMetas';
import type { TokenInputFocusHandler } from './useTokenInputFocusEffect';

interface HandleTokenEditStart {
  (targetIndex: Index): () => void;
}
interface HandleTokenEditEnd<VT> {
  (targetIndex: Index): (newTokenValue?: VT) => void;
}

interface Params<VT, ET> {
  tokenValues: VT[];
  onTokenValuesChange?: OnTokenValuesChange<VT>;
  setTokenActivated: SetTokenActivated<ET>;
  handleTokenInputFocus: TokenInputFocusHandler;
  handleTokenInputBlur: TokenInputFocusHandler;
}

function useTokenEdit<VT, ET>(params: Params<VT, ET>) {
  const {
    tokenValues,
    onTokenValuesChange,
    setTokenActivated,
    handleTokenInputFocus,
    handleTokenInputBlur,
  } = params;

  const handleTokenEditStart: HandleTokenEditStart = useCallback(
    (targetIndex: Index) => () => {
      // console.log('handleTokenEditStart; targetIndex', targetIndex);
      setTokenActivated(targetIndex, true);
      handleTokenInputFocus();
    },
    [setTokenActivated, handleTokenInputFocus],
  );

  const handleTokenEditEnd: HandleTokenEditEnd<VT> = useCallback(
    (targetIndex: Index) => (newTokenValue) => {
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
