import { useState, useCallback } from 'react';

function useTokenInputFocus() {
  const [isTokenInputFocused, setIsTokenInputFocused] = useState(false);

  const handleTokenInputFocus = useCallback(() => {
    // console.log('handleTokenInputFocus');
    setIsTokenInputFocused(true);
  }, []);

  const handleTokenInputBlur = useCallback(() => {
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
