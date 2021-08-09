/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput from '../../src';

/**
 * Customize data structure
 */
const INIT_VALUES = [
  'abc',
  '12345',
  '01234567890123456789012345678901234567890123456789012345678901234567890123456789',
];

const handleBuildTokenValue = (inputValue) => {
  return inputValue.trim();
};

const handleGetTokenDisplayLabel = (tokenValue) => {
  return `Data: ${tokenValue};`;
};

const handleGetTokenEditableValue = (tokenValue) => {
  return tokenValue;
};

const handleTokenValueValidate = (tokenValue, index, tokenValues) => {
  const value = handleGetTokenEditableValue(tokenValue);

  if (value === 'abc') {
    return 'tokenValue === "abc"';
  }

  // Check duplicated
  const matched = tokenValues.filter((tokenValue, idx) => {
    return idx !== index && handleGetTokenEditableValue(tokenValue) === value;
  });
  if (matched.length > 0) {
    return 'Duplicated';
  }

  if (tokenValues.length > 5) {
    return 'Max entry is 5';
  }

  return null;
};

const handleGetTokenErrorMessage = (error) => {
  console.log('handleGetTokenErrorMessage', error);
  return error;
};

const ExampleTest = () => {
  const [values, setValues] = useState(INIT_VALUES);

  const handleTokenValuesChange = useCallback(
    (newTokenValues) => {
      console.log('tokenValues before', values);

      setValues(newTokenValues);
    },
    [values]
  );

  return (
    <>
      <h2>Test</h2>

      <TokenInput
        tokenValues={values}
        onTokenValuesChange={handleTokenValuesChange}
        onBuildTokenValue={handleBuildTokenValue}
        onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
        onGetTokenEditableValue={handleGetTokenEditableValue}
        onGetTokenErrorMessage={handleGetTokenErrorMessage}
        onTokenValueValidate={handleTokenValueValidate}
      />

      <pre>
        {`
<TokenInput
  defaultTokenValues={values}
  onBuildTokenValue={handleBuildTokenValue}
  onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
  onGetTokenEditableValue={handleGetTokenEditableValue}
  onGetTokenErrorMessage={handleGetTokenErrorMessage}
  onTokenValueValidate={handleTokenValueValidate}
  onTokensUpdate={handleTokensUpdate}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleTest;
