/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput from '../../src';

/**
 * Customize data structure
 */
const URLS = [
  { url: 'https://www.google.com' },
  { url: 'http://www.google.com' },
  {
    url: 'http://www.google.comABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  },
];

const handlePreprocess = (inputValues) => {
  const values = [];

  inputValues
    .filter((value) => {
      // filter empty
      return value !== '' && value.trim() !== '';
    })
    .forEach((value) => {
      const url = value.trim();
      const protocolPattern = /^(https:\/\/|http:\/\/)/i;
      if (protocolPattern.test(url) === false) {
        values.push(`https://${url}`, `http://${url}`);
      } else {
        values.push(url);
      }
    });

  return values;
};

const handleBuildTokenValue = (inputValue) => {
  return { url: inputValue };
};

const handleGetTokenDisplayLabel = (tokenValue, tokenMeta) => {
  console.log(
    'handleGetTokenDisplayLabel',
    'tokenValue',
    tokenValue,
    'tokenMeta',
    tokenMeta
  );
  return tokenValue.url;
};

const handleGetTokenEditableValue = (tokenValue) => {
  return tokenValue.url;
};

const handleTokenValueValidate = (tokenValue, index, tokenValues) => {
  const url = handleGetTokenEditableValue(tokenValue);

  const protocolPattern = /^(https:\/\/|http:\/\/)/i;
  if (protocolPattern.test(url) === false) {
    return 'Invalid url';
  }

  // Check duplicated
  const matched = tokenValues.filter((value, idx) => {
    return idx !== index && handleGetTokenEditableValue(value) === url;
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
  return error;
};

const ExamplePreprocessor = () => {
  const [urls, setUrls] = useState(URLS);

  const handleTokenValuesChange = useCallback(
    (newTokenValues) => {
      console.log('handleTokenValuesChange; newTokenValues', newTokenValues);

      setUrls(newTokenValues);
    },
    [setUrls]
  );

  return (
    <>
      <h2>Reproduce value by preprocessor</h2>
      <p>
        Type any value without https:// and http:// to see reproduce effect.
      </p>

      <p>Example: google.com</p>
      <TokenInput
        tokenValues={urls}
        onTokenValuesChange={handleTokenValuesChange}
        onPreprocess={handlePreprocess}
        onBuildTokenValue={handleBuildTokenValue}
        onTokenValueValidate={handleTokenValueValidate}
        onGetTokenEditableValue={handleGetTokenEditableValue}
        onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
        onGetTokenErrorMessage={handleGetTokenErrorMessage}
      />

      <pre>
        {`
<TokenInput
  tokenValues={urls}
  onTokenValuesChange={handleTokenValuesChange}
  onPreprocess={handlePreprocess}
  onBuildTokenValue={handleBuildTokenValue}
  onGetTokenEditableValue={handleGetTokenEditableValue}
  onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
  onGetTokenErrorMessage={handleGetTokenErrorMessage}
/>
        `}
      </pre>

      <pre>
        {`
const handlePreprocess = (inputValues) => {
  const values = [];

  inputValues
    .filter((value) => {
      // filter empty
      return value !== '' && value.trim() !== '';
    })
    .forEach((value) => {
      const url = value.trim();
      const protocolPattern = /^(https:\\/\\/|http:\\/\\/)/i;
      if (protocolPattern.test(url) === false) {
        values.push(\`https://\${url}\`, \`http://\${url}\`);
      } else {
        values.push(url);
      }
    });

  return values;
};
        `}
      </pre>
    </>
  );
};

export default ExamplePreprocessor;
