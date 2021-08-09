import { useCallback } from 'react';

function useTokenEdit({
  tokenValues,
  onTokenValuesChange,
  setTokenActivated,
  handleTokenInputFocus,
  handleTokenInputBlur,
  focusTokenCreator,
}) {
  const handleTokenEditStart = useCallback(
    (targetIndex) => () => {
      // console.log('handleTokenEditStart; targetIndex', targetIndex);
      setTokenActivated(targetIndex, true);
      handleTokenInputFocus();
    },
    [setTokenActivated, handleTokenInputFocus]
  );

  const handleTokenEditEnd = useCallback(
    (targetIndex) => (newTokenValue) => {
      // console.log(
      //   'handleTokenEditEnd; targetIndex',
      //   targetIndex,
      //   'newTokenValue',
      //   `${newTokenValue}`
      // );

      setTokenActivated(targetIndex, false);
      handleTokenInputBlur();

      // Re-focus on TokenCreator
      focusTokenCreator();

      // TODO: Consider split editEnd and tokenValue update
      if (typeof newTokenValue === 'undefined') {
        // Avoid meaningless update
        return;
      }

      const modifiedTokenValues = [...tokenValues];
      modifiedTokenValues[targetIndex] = newTokenValue;
      onTokenValuesChange(modifiedTokenValues);
    },
    [
      tokenValues,
      onTokenValuesChange,
      setTokenActivated,
      handleTokenInputBlur,
      focusTokenCreator,
    ]
  );

  return {
    handleTokenEditStart,
    handleTokenEditEnd,
  };
}

export default useTokenEdit;
