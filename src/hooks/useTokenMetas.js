import { useState, useCallback } from 'react';
import buildTokenMeta from '../utils/buildTokenMeta';

function useTokenMetas() {
  const [tokenMetas, setTokenMetas] = useState([]);

  const setTokenActivated = useCallback(
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
    buildTokenMeta,
    tokenMetas,
    setTokenMetas,
    setTokenActivated,
  };
}

export default useTokenMetas;
