/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput from '../../src';

import CopyAnchor from '../share/CopyAnchor';

const ExampleSpecialKeyDown = () => {
  const [values, setValues] = useState([]);

  const handleTokenValuesChange = useCallback(
    (newTokenValues) => {
      console.log(
        'tokenValues before',
        values,
        'newTokenValues',
        newTokenValues
      );
      setValues(newTokenValues);
    },
    [values]
  );

  return (
    <>
      <h2>
        [Beta] Config special keyDown event handlers
        <CopyAnchor hashTag="example-special-key-down" />
      </h2>

      <p>
        Input anything and press <b>Enter</b> to see what will be.
      </p>
      <TokenInput
        tokenValues={values}
        onTokenValuesChange={handleTokenValuesChange}
        specialKeyDown={{
          onEnter: 0, // Turn off predefined event handler on Enter
        }}
      />
      <pre>
        {`
<TokenInput
  tokenValues={values}
  onTokenValuesChange={handleTokenValuesChange}
  specialKeyDown={{
    onEnter: 0, // Turn off predefined event handler on Enter
  }}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleSpecialKeyDown;
