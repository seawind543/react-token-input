import { useState, useCallback } from 'react';

type HandleTokenInputFocus = () => void;
type HandleTokenInputBlur = () => void;

function useTokenInputFocus() {
  const [isTokenInputFocused, setIsTokenInputFocused] =
    useState<boolean>(false);

  const handleTokenInputFocus: HandleTokenInputFocus = useCallback(() => {
    // console.log('handleTokenInputFocus');
    setIsTokenInputFocused(true);
  }, []);

  const handleTokenInputBlur: HandleTokenInputBlur = useCallback(() => {
    // console.log('handleTokenInputBlur');
    setIsTokenInputFocused(false);
  }, []);

  return {
    isTokenInputFocused,
    handleTokenInputFocus,
    handleTokenInputBlur,
  };
}

export default useTokenInputFocus;
