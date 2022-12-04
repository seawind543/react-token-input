import { useRef, useCallback } from 'react';
import type { TokenCreatorMethods } from '../TokenCreator';

function useTokenCreatorRef() {
  const tokenCreatorRef = useRef<TokenCreatorMethods>(null);

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
