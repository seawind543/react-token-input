import { useRef, useCallback } from 'react';

function useTokenCreatorRef() {
  const tokenCreatorRef = useRef(null);

  const focusTokenCreator = useCallback(() => {
    // console.log('handleTokenCreatorFocus');
    if (tokenCreatorRef && tokenCreatorRef.current) {
      tokenCreatorRef.current.focus();
    }
  }, []);

  return {
    tokenCreatorRef,
    focusTokenCreator,
  };
}

export default useTokenCreatorRef;
