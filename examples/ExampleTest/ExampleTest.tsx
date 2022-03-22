/* eslint no-console: 0 */

import React, { useState, useCallback } from 'react';
// import TokenInput, { JS__TOKEN__DELETE_BUTTON__CLASS_NAME } from '../../src';
import TokenInput, { JS__TOKEN__DELETE_BUTTON__CLASS_NAME } from '../../lib';

import CopyAnchor from '../share/CopyAnchor';

import style from './index.scss';
import '../../dist/react-customize-token-input.css';

/**
 * Customize data structure
 */
const INIT_VALUES = [
  'abc',
  '12345',
  '01234567890123456789012345678901234567890123456789012345678901234567890123456789',
  '123456789',
];

const handleBuildTokenValue = (inputValue: string) => {
  return inputValue.trim();
};

const handleRenderTokenDeleteButtonContent = () => {
  // Google font material-icons
  // https://fonts.google.com/icons
  return <span className="material-icons">delete</span>;
};

const handleGetTokenDisplayLabel = (tokenValue: string) => {
  return (
    <>
      <span
        role="img"
        aria-label="Close on click"
        style={{ marginRight: '4px' }}
        className={JS__TOKEN__DELETE_BUTTON__CLASS_NAME}
      >
        🪙
      </span>
      {`${tokenValue}`}
      {handleRenderTokenDeleteButtonContent()}
    </>
  );
};

const handleGetTokenEditableValue = (tokenValue: string) => {
  return tokenValue;
};

const handleTokenValueValidate = (tokenValue: string, index: number, tokenValues: string[]) => {
  const value = handleGetTokenEditableValue(tokenValue);

  if (value === 'abc') {
    return 'tokenValue === "abc"';
  }

  // Check duplicated
  const duplicates = tokenValues.filter((tokenValue, idx) => {
    return idx !== index && handleGetTokenEditableValue(tokenValue) === value;
  });
  if (duplicates.length > 0) {
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

const handleGetTokenErrorMessage = (error: string) => {
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
      <h2>
        Test
        <CopyAnchor hashTag="example-test" />
      </h2>

      <TokenInput
        className={style['example-test']}
        tokenValues={values}
        onTokenValuesChange={handleTokenValuesChange}
        onBuildTokenValue={handleBuildTokenValue}
        onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
        onRenderTokenDeleteButtonContent={handleRenderTokenDeleteButtonContent}
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
