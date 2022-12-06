import { useRef, useCallback } from 'react';
import type { TokenCreatorRef } from '../TokenCreator';

function useTokenCreatorRef() {
  const tokenCreatorRef = useRef<TokenCreatorRef>(null);

  const focusTokenCreator: HTMLInputElement['focus'] = useCallback(
    (options) => {
      // console.log('handleTokenCreatorFocus');
      tokenCreatorRef.current?.focus(options);
    },
    []
  );

  const setCreatorValue: TokenCreatorRef['setValue'] = useCallback((value) => {
    tokenCreatorRef.current?.setValue(value);
  }, []);

  return {
    tokenCreatorRef,
    focusTokenCreator,
    setCreatorValue,
  };
}

export default useTokenCreatorRef;
