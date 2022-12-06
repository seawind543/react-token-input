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

  const inputRef = useRef(null);
  const handleSetValueButtonClick = useCallback(() => {
    const value = inputRef.current?.value;
    tokenInputRef.current?.setCreatorValue(value);
  }, []);

  const handleGetValueButtonClick = useCallback(() => {
    console.log(`The value is "${tokenInputRef.current?.getCreatorValue()}"`);
  }, []);

  const createValueInputRef = useRef(null);
  const handleTokensCreate = useCallback(() => {
    const value = createValueInputRef.current?.value;
    tokenInputRef.current?.createTokens(value);
  }, []);

  const handleTokensCreateDefault = useCallback(() => {
    tokenInputRef.current?.createTokens();
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
        Note: Prop <b>disableCreateOnBlur</b> is applied in this example too.
      </p>
      Click the button to see the effect.
      <ul>
        <li>
          <button onClick={handleFocusButtonClick}>Set focus</button>
        </li>
        <li>
          <button onClick={handleSetValueButtonClick}>Set value</button> with{' '}
          <input ref={inputRef} defaultValue="test" />
        </li>
        <li>
          <button onClick={handleGetValueButtonClick}>Get value</button>
        </li>
        <li>
          <button onClick={handleTokensCreate}>Create Token</button> with{' '}
          <input ref={createValueInputRef} defaultValue="abc, def," />
          <br />
          <button onClick={handleTokensCreateDefault}>Create Token</button> with
          value in the creator.
        </li>
      </ul>
      <br />
      <TokenInput
        ref={tokenInputRef}
        disableCreateOnBlur
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
  disableCreateOnBlur
  tokenValues={values}
  onTokenValuesChange={setValues}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleRefMethods;
