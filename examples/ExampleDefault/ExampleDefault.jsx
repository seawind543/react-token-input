/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput from '../../src';

const ExampleDefault = () => {
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
      <h2>Simple example: Take default</h2>
      <p>By default, TokenInput will assume data is array of strings.</p>

      <TokenInput
        className="example--default"
        tokenValues={values}
        onTokenValuesChange={handleTokenValuesChange}
      />

      <pre>
        {`
<TokenInput
  className="example--default"
  tokenValues={values}
  onTokenValuesChange={handleTokenValuesChange}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleDefault;
