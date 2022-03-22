import { useRef, useCallback } from 'react';
import AutosizeInput from 'react-input-autosize';

function useTokenCreatorRef() {
  // Cannot set AutosizeInput as ref, because it get error when ref={autosizeInputRef}
  const tokenCreatorRef = useRef(null);

  const focusTokenCreator = useCallback(() => {
    // console.log('handleTokenCreatorFocus');
    const autosizeInput = tokenCreatorRef?.current;
    if (autosizeInput) {
      // cast never type to AutosizeInput
      (autosizeInput as AutosizeInput).getInput().focus();
    }
  }, []);

  return {
    tokenCreatorRef,
    focusTokenCreator,
  };
}

export default useTokenCreatorRef;
