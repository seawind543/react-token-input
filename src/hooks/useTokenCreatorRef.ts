import { useRef, useCallback } from 'react';
import type { TokenCreatorRef } from '../TokenCreator';

function useTokenCreatorRef() {
  const tokenCreatorRef = useRef<TokenCreatorRef>(null);

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
