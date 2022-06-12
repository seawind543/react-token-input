import { useState, useCallback } from 'react';

/**
 * A callback function, which should be `invoked`
 * when end-user `focus` into the TokenInput
 *
 * Note:
 * Call this function to tell TokenInput to set the `focused` CSS effect
 */
export interface HandleTokenInputFocus {
  (): void;
}

/**
 * A callback function, which should be `invoked`
 * when end-user `blur` from the TokenInput
 *
 * Note:
 * Call this function to tell TokenInput to remove the `focused` CSS effect
 */
export interface HandleTokenInputBlur {
  (): void;
}

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
