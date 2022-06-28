import { useCallback } from 'react';

import type { TokenIndex } from '../types/token';
import type { OnTokenValuesChange } from '../types/interfaces';

interface Params<ValueType> {
  tokenValues: ValueType[];
  onTokenValuesChange?: OnTokenValuesChange<ValueType>;
  focusTokenCreator: () => void; // TODO: Update type by shared one
}

function useTokenDelete<ValueType>({
  tokenValues,
  onTokenValuesChange,
  focusTokenCreator,
}: Params<ValueType>) {
  const deleteToken = useCallback(
    (targetIndex: TokenIndex) => {
      const newTokenValues = [...tokenValues];
      newTokenValues.splice(targetIndex, 1);
      onTokenValuesChange?.(newTokenValues);

      /**
       * Keep focus when remove a token.
       * Use scenario: User click the delete button of a token
       */
      focusTokenCreator();
    },
    [tokenValues, onTokenValuesChange, focusTokenCreator]
  );

  const handleTokenDelete = useCallback(
    (targetIndex: TokenIndex) => () => {
      // console.log('handleTokenDelete', targetIndex);
      deleteToken(targetIndex);
    },
    [deleteToken]
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
