import { useState, useLayoutEffect } from 'react';
import useTokenMetas from './useTokenMetas.ts';

function useTokensUpdate({ tokenValues, onTokenValueValidate }) {
  const { buildTokenMeta, tokenMetas, setTokenMetas, setTokenActivated } =
    useTokenMetas();
  const [hasInvalidToken, setHasInvalidToken] = useState(false);

  /**
   * Use this internalTokenValues to `render` to avoid
   * not synced between tokenMetas and  tokenValues
   */
  const [internalTokenValues, setInternalTokenValues] = useState([]);

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
