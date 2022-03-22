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
        <b>Blank</b> ( ) or the <b>Enter</b> to separate the input string into
        tokens.
      </p>
      <p>
        Hint: Following input string will be separate into 3 tokens. Copy and
        Paste to see the result.
      </p>
      <pre>aaa+bbbb cc</pre>

      <TokenInput
        separators={[
          '\\+', // Plus-symbol
          ' ', // Blank
        ]}
        tokenValues={values}
        onTokenValuesChange={handleTokenValuesChange}
      />

      <pre>
        {`
<TokenInput
  separators={[
    '\\+', // Plus-symbol
    ' ', // Blank
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
