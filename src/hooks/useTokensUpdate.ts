import { useState, useLayoutEffect } from 'react';
import useTokenMetas from './useTokenMetas';
import buildTokenMeta from '../utils/buildTokenMeta';

import type {
  OnTokenValueValidate,
  OnGenTokenMetaKey,
} from '../types/interfaces';

interface Params<ValueType, ErrorType> {
  tokenValues: ValueType[];
  onTokenValueValidate: OnTokenValueValidate<ValueType, ErrorType>;
  onGenTokenMetaKey: OnGenTokenMetaKey<ValueType>;
}

function useTokensUpdate<ValueType, ErrorType>({
  tokenValues,
  onTokenValueValidate,
  onGenTokenMetaKey,
}: Params<ValueType, ErrorType>) {
  const { tokenMetas, setTokenMetas, setTokenActivated } =
    useTokenMetas<ErrorType>();
  const [hasInvalidToken, setHasInvalidToken] = useState<boolean>(false);

  // Use this internalTokenValues to `render` to avoid
  // not synced between tokenMetas and  tokenValues
  const [internalTokenValues, setInternalTokenValues] = useState<ValueType[]>(
    []
  );

  useLayoutEffect(() => {
    // console.log('useTokensUpdate > useLayoutEffect');

    let hasInvalid = false;
    // Build tokenMetas based on the latest tokenValues
    const newTokenMetas = tokenValues.map((tokenValue, index) => {
      const tokenMetaKey = onGenTokenMetaKey(tokenValue, index);
      const validateError = onTokenValueValidate(
        tokenValue,
        index,
        tokenValues
      );
      const newTokenMeta = buildTokenMeta({
        tokenMetaKey,
        tokenIndex: index,
        customizeError: validateError,
      });

      if (newTokenMeta.error && !newTokenMeta.activated) {
        hasInvalid = true;
      }

      return newTokenMeta;
    });

    setInternalTokenValues([...tokenValues]);
    setTokenMetas(newTokenMetas);
    setHasInvalidToken(hasInvalid);
  }, [tokenValues, onTokenValueValidate, onGenTokenMetaKey, setTokenMetas]);

  return {
    hasInvalidToken,
    internalTokenValues,
    tokenMetas,
    setTokenActivated,
  };
}

export default useTokensUpdate;
