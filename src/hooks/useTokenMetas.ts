import { useState, useCallback } from 'react';

import type { TokenMeta, TokenIndex } from '../types/token';

export interface SetTokenActivated<ET> {
  (targetIndex: TokenIndex, activated: TokenMeta<ET>['activated']): void;
}

function useTokenMetas<ET>() {
  const [tokenMetas, setTokenMetas] = useState<TokenMeta<ET>[]>([]);

  const setTokenActivated: SetTokenActivated<ET> = useCallback(
    (targetIndex, activated) => {
      // console.log(
      //   'setTokenActivated; targetIndex',
      //   targetIndex,
      //   'activated',
      //   activated,
      //   'tokenMetas',
      //   tokenMetas
      // );

      if (targetIndex >= tokenMetas.length) {
        throw new Error(
          `setTokenActivated out of tokenMetas scope; targetIndex ${targetIndex}; tokenMetas.length ${tokenMetas.length}`,
        );
      }

      const newTokenMetas = [...tokenMetas];
      newTokenMetas[targetIndex].activated = activated;
      setTokenMetas(newTokenMetas);
    },
    [tokenMetas],
  );

  return {
    tokenMetas,
    setTokenMetas,
    setTokenActivated,
  };
}

export default useTokenMetas;
