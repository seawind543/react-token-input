/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
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

const Token = ({ tokenValue }) => {
  return <div>{tokenValue}</div>;
};
Token.propTypes = {
  tokenValue: PropTypes.string.isRequired,
};

const handleGetTokenDisplayLabel = (tokenValue) => {
  return <Token tokenValue={tokenValue} />;
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

/*
const handleTokenValueValidate = (url, index, urls) => {
  const urlProtocolPattern = /^(https:\/\/|http:\/\/)/i;

  if (urlProtocolPattern.test(url) === false) {
    return 'Invalid url';
  }

  // Check duplicated
  const matched = urls.filter((value, idx) => {
    return idx !== index && value === url;
  });
  if (matched.length > 0) {
    return 'Duplicated';
  }

  if (urls.length > 5) {
    return 'Maximum allow 5 URLs only';
  }

  return null;
};
*/

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
