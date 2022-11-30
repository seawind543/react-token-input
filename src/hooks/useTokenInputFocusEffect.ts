import { useState, useCallback } from 'react';

export interface TokenInputFocusHandler {
  (e?: React.FocusEvent<HTMLInputElement>): void;
}

/**
 * @description
 * A react hook, which return the handlers to set/unset UI focus effect of TokenInput
 *
 * @returns {object}
 *
 */
function useTokenInputFocus() {
  const [isTokenInputFocused, setIsTokenInputFocused] =
    useState<boolean>(false);

  /**
   * @callback handleTokenInputFocus
   * @description
   * A callback function, which should be `invoked`
   * when end-user `focus` into the TokenInput
   *
   * Call this function to tell TokenInput to set the `focused` CSS effect
   *
   * @returns {void}
   */
  const handleTokenInputFocus: TokenInputFocusHandler = useCallback(() => {
    // console.log('handleTokenInputFocus');
    setIsTokenInputFocused(true);
  }, []);

  /**
   * @callback handleTokenInputBlur
   * @description
   * A callback function, which should be `invoked`
   * when end-user `blur` from the TokenInput
   *
   * Call this function to tell TokenInput to remove the `focused` CSS effect
   *
   * @returns {void}
   */
  const handleTokenInputBlur: TokenInputFocusHandler = useCallback(() => {
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
