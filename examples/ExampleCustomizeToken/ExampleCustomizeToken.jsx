/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */

import React, { useState, useCallback } from 'react';
import TokenInput from '../../src/index.ts';
import MyToken from './MyToken';

import CopyAnchor from '../share/CopyAnchor';

import { INVALID_VALUE, DEMO_VALUES_WITH_INVALID } from '../demoValues';

const handleTokenValueValidate = (tokenValue, index, tokenValues) => {
  if (tokenValue === INVALID_VALUE) {
    return "I'm an invalid token";
  }

  return undefined;
};

const ExampleCustomizeToken = () => {
  const [values, setValues] = useState([
    ...DEMO_VALUES_WITH_INVALID,
    'Example: ReadOnly Token',
  ]);

  const handleTokenValuesChange = useCallback(
    (newTokenValues) => {
      console.log('handleTokenValuesChange; newTokenValues', newTokenValues);

      setValues(newTokenValues);
    },
    [setValues]
  );

  return (
    <>
      <h2>
        Customize Token Component
        <CopyAnchor hashTag="example-customize-token-component" />
      </h2>
      <p>
        This example demonstrate that the whole <b>Token Component</b> could be
        customized by prop <b>customizeTokenComponent</b>.
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
