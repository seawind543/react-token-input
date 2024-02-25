import { useRef, useCallback } from 'react';
import { DEFAULT_INPUT_INIT_VALUE } from '../constants';

import type { TokenCreatorRef } from '../TokenCreator';

function useTokenCreatorRef() {
  const tokenCreatorRef = useRef<TokenCreatorRef>(null);

  const focusTokenCreator: HTMLInputElement['focus'] = useCallback(
    (options) => tokenCreatorRef.current?.focus(options),
    [],
  );

  const setCreatorValue: TokenCreatorRef['setValue'] = useCallback(
    (value) => tokenCreatorRef.current?.setValue(value),
    [],
  );

  const getCreatorValue: TokenCreatorRef['getValue'] = useCallback(() => {
    return tokenCreatorRef.current?.getValue() ?? DEFAULT_INPUT_INIT_VALUE;
  }, []);

  const createTokens: TokenCreatorRef['createTokens'] = useCallback(
    (value) => tokenCreatorRef.current?.createTokens(value),
    [],
  );

  return {
    tokenCreatorRef,
    focusTokenCreator,
    setCreatorValue,
    getCreatorValue,
    createTokens,
  };
}

export default useTokenCreatorRef;
