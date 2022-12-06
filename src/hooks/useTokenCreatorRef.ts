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

  return {
    tokenCreatorRef,
    focusTokenCreator,
  };
}

export default useTokenCreatorRef;
