import { useCallback } from 'react';

function useTokenDelete({
  tokenValues,
  onTokenValuesChange,
  focusTokenCreator,
}) {
  const deleteToken = useCallback(
    (targetIndex) => {
      const newTokenValues = [...tokenValues];
      newTokenValues.splice(targetIndex, 1);
      onTokenValuesChange(newTokenValues);

      /**
       * Keep focus when remove a token.
       * Use scenario: User click the delete button of a token
       */
      focusTokenCreator();
    },
    [tokenValues, onTokenValuesChange, focusTokenCreator]
  );

  const handleTokenDelete = useCallback(
    (targetIndex) => () => {
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
