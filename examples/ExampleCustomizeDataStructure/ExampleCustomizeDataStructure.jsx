/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput from '../../src';

/**
 * Customize data structure
 */
const CUSTOMIZE_DATA_STRUCTURE = [
  { num: 123 },
  { num: 456 },
  { num: 789 },
  { num: 100 },
];

const handleBuildTokenValue = (inputValue) => {
  const trimmedValue = inputValue.trim ? inputValue.trim() : inputValue;
  const num = Number(trimmedValue) || trimmedValue;
  return { num };
};

const handleGetTokenDisplayLabel = (tokenValue, tokenMeta) => {
  console.log(
    'handleGetTokenDisplayLabel',
    'tokenValue',
    tokenValue,
    'tokenMeta',
    tokenMeta
  );
  return `Number: ${tokenValue.num}`;
};

const handleGetTokenEditableValue = (tokenValue) => {
  return tokenValue.num;
};

const handleTokenValueValidate = (tokenValue, index, tokenValues) => {
  const num = handleGetTokenEditableValue(tokenValue);

  if (typeof num !== 'number' || Number.isNaN(num) === true) {
    return 'Input value is not number';
  }

  // Check duplicated
  const matched = tokenValues.filter((value, idx) => {
    return idx !== index && handleGetTokenEditableValue(value) === num;
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

const ExampleCustomizeDataStructure = () => {
  const [customizeData, setCustomizeData] = useState(CUSTOMIZE_DATA_STRUCTURE);

  const handleTokenValuesChange = useCallback(
    (newTokenValues) => {
      console.log('handleTokenValuesChange; newTokenValues', newTokenValues);

      setCustomizeData(newTokenValues);
    },
    [setCustomizeData]
  );

  return (
    <>
      <h2>Customize data structure and validator</h2>
      <p>In this example, the tokeValue will be customized structure</p>
      <pre>{`{ "num": number }`}</pre>
      <p>
        Note:
        <br />
        TokenInput allow you to inline editing token by mouse click on it.
        <br />
        Try to edit as not number data. To see invalid token.
      </p>

      <TokenInput
        tokenValues={customizeData}
        onTokenValuesChange={handleTokenValuesChange}
        onBuildTokenValue={handleBuildTokenValue}
        onGetTokenEditableValue={handleGetTokenEditableValue}
        onTokenValueValidate={handleTokenValueValidate}
        onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
        onGetTokenErrorMessage={handleGetTokenErrorMessage}
      />

      <pre>
        {`
<TokenInput
  tokenValues={customizeData}
  onTokenValuesChange={handleTokenValuesChange}
  onBuildTokenValue={handleBuildTokenValue}
  onGetTokenEditableValue={handleGetTokenEditableValue}
  onTokenValueValidate={handleTokenValueValidate}
  onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
  onGetTokenErrorMessage={handleGetTokenErrorMessage}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleCustomizeDataStructure;
