/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */

import React, { useState, useCallback } from 'react';
import TokenInput from '../../src';
import MyToken from './MyToken';

import DEMO_VALUES from '../demoValues';

const handleTokenValueValidate = (tokenValue, index, tokenValues) => {
  if (tokenValue === '789') {
    return '789 is not allow';
  }

  return undefined;
};

const ExampleCustomizeToken = () => {
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
      <h2>Customize token render</h2>
      <p>
        This example demonstrate that the whole token could be customized. By
        prop <b>customizeTokenComponent</b>.
      </p>

      <TokenInput
        tokenValues={values}
        onTokenValuesChange={handleTokenValuesChange}
        onTokenValueValidate={handleTokenValueValidate}
        customizeTokenComponent={MyToken}
      />

      <pre>
        {`
<TokenInput
  tokenValues={values}
  onTokenValuesChange={handleTokenValuesChange}
  onTokenValueValidate={handleTokenValueValidate}
  customizeTokenComponent={MyToken}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleCustomizeToken;
