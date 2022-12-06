import { useState, useCallback } from 'react';

/**
 * @callback TokenInputFocusHandler
 * @description
 * A callback function, which should be `invoked`
 * when end-user `focus/blur` on TokenInput
 *
 * Note:
 * Call this function to tell TokenInput to set the `focused` CSS effect
 *
 * @returns {void}
 */
export interface TokenInputFocusHandler {
  (e?: React.FocusEvent<HTMLInputElement>): void;
}

interface Params {
  onCreatorFocus?: React.FocusEventHandler<HTMLInputElement>;
  onCreatorBlur?: React.FocusEventHandler<HTMLInputElement>;
}

function useTokenInputFocusEffect(params: Params) {
  const { onCreatorFocus, onCreatorBlur } = params;

  const [isTokenInputFocused, setIsTokenInputFocused] =
    useState<boolean>(false);

  /**
   * @callback handleTokenInputFocus
   * @description
   * A callback function, which should be `invoked`
   * when end-user `focus` into TokenInput
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
   * when end-user `blur` from TokenInput
   *
   * Call this function to tell TokenInput to remove the `focused` CSS effect
   *
   * @returns {void}
   */
  const handleTokenInputBlur: TokenInputFocusHandler = useCallback(() => {
    // console.log('handleTokenInputBlur');
    setIsTokenInputFocused(false);
  }, []);

  const handleCreatorFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      handleTokenInputFocus();
      onCreatorFocus?.(e);
    },
    [onCreatorFocus, handleTokenInputFocus]
  );

  const handleCreatorBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      handleTokenInputBlur();
      onCreatorBlur?.(e);
    },
    [onCreatorBlur, handleTokenInputBlur]
  );

  return {
    isTokenInputFocused,
    handleTokenInputFocus,
    handleTokenInputBlur,
    handleCreatorFocus,
    handleCreatorBlur,
  };
}

export default useTokenInputFocusEffect;
