/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput from '../../src/index.ts';

import CopyAnchor from '../share/CopyAnchor';

const ExampleCustomizeSeparators = () => {
  const [values, setValues] = useState([]);

  const handleTokenValuesChange = useCallback(
    (newTokenValues) => {
      console.log('tokenValues before', values);

      setValues(newTokenValues);
    },
    [values]
  );

  return (
    <>
      <h2>
        Customize Separators
        <CopyAnchor hashTag="example-customize-separators" />
      </h2>
      <p>
        In this example, you can use the <b>Plus-symbol</b> (+), the{' '}
        <b>Blank</b> ( ), the <b>Enter</b>, or even an <b>emoji</b> (💩) to
        separate the input string into tokens.
      </p>
      <p>
        Hint: Following input string will be separate into 4 tokens. Copy and
        Paste to see the result.
      </p>
      <pre>aaa+bbbb cc💩ddd</pre>

      <TokenInput
        separators={[
          '\\+', // Plus-symbol
          '\\s', // Blank
          '💩', // emoji
          '\\t',
        ]}
        tokenValues={values}
        onTokenValuesChange={handleTokenValuesChange}
      />

      <pre>
        {`
<TokenInput
  separators={[
    '\\\\+', // Plus-symbol
    '\\\\s', // Blank
    '💩', // emoji
  ]}
  tokenValues={values}
  onTokenValuesChange={handleTokenValuesChange}
/>
        `}
      </pre>

      <p>
        Hint: Could import DEFAULT_SEPARATORS to extending the built-in
        separators.
      </p>
      <pre>
        {`
import TokenInput, { DEFAULT_SEPARATORS } from 'react-customize-token-input';

<TokenInput
  separators={[
    ...DEFAULT_SEPARATORS,
    '\\\\+', // Plus-symbol
  ]}
  tokenValues={values}
  onTokenValuesChange={handleTokenValuesChange}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleCustomizeSeparators;
