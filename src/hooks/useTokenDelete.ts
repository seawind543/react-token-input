import { useCallback } from 'react';

import type { Index } from '../types/token';
import type { OnTokenValuesChange } from '../types/interfaces';

interface Params<VT> {
  tokenValues: VT[];
  onTokenValuesChange?: OnTokenValuesChange<VT>;
  focusTokenCreator: HTMLInputElement['focus'];
}

function useTokenDelete<VT>(params: Params<VT>) {
  const { tokenValues, onTokenValuesChange, focusTokenCreator } = params;

  const deleteToken = useCallback(
    (targetIndex: Index) => {
      const newTokenValues = [...tokenValues];
      newTokenValues.splice(targetIndex, 1);
      onTokenValuesChange?.(newTokenValues);

      /**
       * Keep focus when remove a token.
       * Use scenario: User click the delete button of a token
       */
      focusTokenCreator();
    },
    [tokenValues, onTokenValuesChange, focusTokenCreator],
  );

  const handleTokenDelete = useCallback(
    (targetIndex: Index) => () => {
      // console.log('handleTokenDelete', targetIndex);
      deleteToken(targetIndex);
    },
    [deleteToken],
  );

  const handleLastTokenDelete = useCallback(() => {
    deleteToken(-1);
  }, [deleteToken]);

  return {
    handleTokenDelete,
    handleLastTokenDelete,
  };
}

export default useTokenDelete;
