import { useState, useLayoutEffect } from 'react';
import useTokenMetas from './useTokenMetas';

import type { TokenValue, OnTokenValueValidate } from '../types/token';

type ParameterType<ValueType, ErrorType> = {
  tokenValues: TokenValue<ValueType>[];
  onTokenValueValidate: OnTokenValueValidate<ValueType, ErrorType>;
};

function useTokensUpdate<ValueType, ErrorType>({
  tokenValues,
  onTokenValueValidate,
}: ParameterType<ValueType, ErrorType>) {
  const { buildTokenMeta, tokenMetas, setTokenMetas, setTokenActivated } =
    useTokenMetas<ErrorType>();
  const [hasInvalidToken, setHasInvalidToken] = useState<boolean>(false);

  /**
   * Use this internalTokenValues to `render` to avoid
   * not synced between tokenMetas and  tokenValues
   */
  const [internalTokenValues, setInternalTokenValues] = useState<
    TokenValue<ValueType>[]
  >([]);

  useLayoutEffect(() => {
    // console.log('useTokensUpdate > useLayoutEffect');

    let hasInvalid = false;
    // Build tokenMetas based on the latest tokenValues
    const newTokenMetas = tokenValues.map((tokenValue, index) => {
      const error = onTokenValueValidate(tokenValue, index, tokenValues);
      const newTokenMeta = buildTokenMeta(error, tokenValue, index);

      if (newTokenMeta.error && !newTokenMeta.activated) {
        hasInvalid = true;
      }

      return newTokenMeta;
    });

    setInternalTokenValues([...tokenValues]);
    setTokenMetas(newTokenMetas);
    setHasInvalidToken(hasInvalid);
  }, [tokenValues, onTokenValueValidate, setTokenMetas, buildTokenMeta]);

  return {
    hasInvalidToken,
    internalTokenValues,
    tokenMetas,
    setTokenActivated,
  };
}

export default useTokensUpdate;
