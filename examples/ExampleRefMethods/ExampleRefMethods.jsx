/* eslint no-console: 0 */
import React, { useRef, useState, useCallback } from 'react';
import TokenInput from '../../src/index.ts';

import CopyAnchor from '../share/CopyAnchor';

const handleCreatorFocus = () => {
  console.log('onCreatorFocus');
};

const handleCreatorBlur = () => {
  console.log('onCreatorBlur');
};

const handleCreatorKeyDown = (e) => {
  console.log('onCreatorKeyDown', e.key);
};

const ExampleRefMethods = () => {
  const tokenInputRef = useRef(null);
  const [values, setValues] = useState([]);

  const handleFocusButtonClick = useCallback(() => {
    tokenInputRef.current?.focus();
  }, []);

  return (
    <>
      <h2>
        Methods in ref of TokenInput
        <CopyAnchor hashTag="example-ref-methods" />
      </h2>

      <p>
        This example demonstrates how to use ref to control TokenInput.
        <br />
        Click the button to see the effect.
      </p>
      <ul>
        <li>
          <button onClick={handleFocusButtonClick}>Set focus</button>
        </li>
      </ul>
      <br />

      <TokenInput
        ref={tokenInputRef}
        tokenValues={values}
        onTokenValuesChange={setValues}
        onCreatorFocus={handleCreatorFocus}
        onCreatorBlur={handleCreatorBlur}
        onCreatorKeyDown={handleCreatorKeyDown}
      />
      <pre>
        {`
const tokenInputRef = useRef(null);

const handleFocusButtonClick = () => {
  tokenInputRef.current?.focus();
}

<TokenInput
  ref={tokenInputRef}
  tokenValues={values}
  onTokenValuesChange={setValues}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleRefMethods;
