import { useState, useCallback } from 'react';

import { TokenMeta, TokenIndex } from '../types/token';

type TokenMetaActivated<ErrorType> = TokenMeta<ErrorType>['activated'];
export type SetTokenActivated<ErrorType> = (
  targetIndex: TokenIndex,
  activated: TokenMetaActivated<ErrorType>
) => void;

function useTokenMetas<ErrorType>() {
  const [tokenMetas, setTokenMetas] = useState<TokenMeta<ErrorType>[]>([]);

  const setTokenActivated: SetTokenActivated<ErrorType> = useCallback(
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
          `setTokenActivated out of tokenMetas scope; targetIndex ${targetIndex}; tokenMetas.length ${tokenMetas.length}`
        );
      }

      const newTokenMetas = [...tokenMetas];
      newTokenMetas[targetIndex].activated = activated;
      setTokenMetas(newTokenMetas);
    },
    [tokenMetas]
  );

  return {
    tokenMetas,
    setTokenMetas,
    setTokenActivated,
  };
}

export default useTokenMetas;
