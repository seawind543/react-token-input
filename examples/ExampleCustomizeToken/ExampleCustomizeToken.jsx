/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput from '../../src';
import MyToken from './MyToken';

import DEMO_VALUES from '../demoValues';

const handleTokenValueValidate = (tokenValue, index, tokenValues) => {
  if (tokenValue === '456') {
    return '456 is not allow';
  }

  // Check duplicated
  const matched = tokenValues.filter((value, idx) => {
    return idx !== index && value === tokenValue;
  });
  if (matched.length > 0) {
    return 'Duplicated';
  }

  if (tokenValues.length > 5) {
    return 'Max entry is 5';
  }

  return undefined;
};

const ExampleCustomizeToken = () => {
  const [values, setValues] = useState(DEMO_VALUES);

  const handleTokenValuesUpdate = useCallback(
    (newTokenValues) => {
      console.log('handleTokenValuesUpdate; newTokenValues', newTokenValues);

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
        onTokenValuesUpdate={handleTokenValuesUpdate}
        onTokenValueValidate={handleTokenValueValidate}
        customizeTokenComponent={MyToken}
      />

      <pre>
        {`
<TokenInput
  tokenValues={values}
  onTokenValuesUpdate={handleTokenValuesUpdate}
  onTokenValueValidate={handleTokenValueValidate}
  customizeTokenComponent={MyToken}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleCustomizeToken;
