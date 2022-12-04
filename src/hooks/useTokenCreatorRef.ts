import { useRef, useCallback } from 'react';
import type { TokenCreatorHandle } from '../TokenCreator';

function useTokenCreatorRef() {
  const tokenCreatorRef = useRef<TokenCreatorHandle>(null);

  const focusTokenCreator = useCallback(() => {
    // console.log('handleTokenCreatorFocus');
    tokenCreatorRef.current?.focus();
  }, []);

  return {
    tokenCreatorRef,
    focusTokenCreator,
  };
}

export default useTokenCreatorRef;
