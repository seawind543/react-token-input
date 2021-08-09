/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput from '../../src';

import DEMO_VALUES from '../demoValues';

const handleTokenValueValidate = (tokenValue, index, tokenValues) => {
  if (tokenValue === '789') {
    return '789 is not allow';
  }

  return null;
};

const ExampleReadOnly = () => {
  const [values, setValues] = useState(DEMO_VALUES);

  const handleTokenValuesChange = useCallback(
    (newTokenValues) => {
      console.log('handleTokenValuesChange; newTokenValues', newTokenValues);

      setValues(newTokenValues);
    },
    [setValues]
  );

  return (
    <>
      <h2>Read only, and set init tokens</h2>
      <p>By default, TokenInput will assume data is array of strings.</p>

      <TokenInput
        readOnly={true}
        tokenValues={values}
        onTokenValuesChange={handleTokenValuesChange}
        onTokenValueValidate={handleTokenValueValidate}
      />

      <pre>
        {`
<TokenInput
  readOnly={true}
  tokenValues={values}
  onTokenValuesChange={handleTokenValuesChange}
  onTokenValueValidate={handleTokenValueValidate}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleReadOnly;
