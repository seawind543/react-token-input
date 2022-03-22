/* eslint no-console: 0 */

import React, { useState, useCallback } from 'react';
import TokenInput from '../../src';

import CopyAnchor from '../share/CopyAnchor';

import { DEMO_VALUES } from '../demoValues';

const handleIsTokenEditable = (tokenValue: string) => {
  return Number.isNaN(+tokenValue);
};

const ExampleReadOnly = () => {
  const [values, setValues] = useState(DEMO_VALUES);

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
        Control Token Inline Editable
        <CopyAnchor hashTag="example-editable" />
      </h2>
      <p>
        TokenInput allow to control a Token is <b>inline editable</b> or not.
        <br />
        This example demonstrates that only tokens with non-number values are
        editable.
      </p>

      <TokenInput
        tokenValues={values}
        onGetIsTokenEditable={handleIsTokenEditable}
        onTokenValuesChange={handleTokenValuesChange}
      />
      <pre>
        {`
<TokenInput
  tokenValues={values}
  onGetIsTokenEditable={handleIsTokenEditable}
  onTokenValuesChange={handleTokenValuesChange}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleReadOnly;
