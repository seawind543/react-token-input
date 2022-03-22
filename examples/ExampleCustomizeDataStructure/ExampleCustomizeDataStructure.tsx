/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput from '../../src';
import type { TokenMeta } from '../../src/types/token';

import CopyAnchor from '../share/CopyAnchor';

type NumberCustomizeDataStructure = {
  num: number;
};

type StringCustomizeDataStructure = {
  num: string;
};

type CustomizeDataStructure = NumberCustomizeDataStructure | StringCustomizeDataStructure;

/**
 * Customize data structure
 */
const CUSTOMIZE_DATA_STRUCTURES: CustomizeDataStructure[] = [
  { num: 123 },
  { num: 456 },
  { num: 789 },
  { num: 100 },
  { num: 'abc' },
];

const handleBuildTokenValue = (inputValue: string): CustomizeDataStructure => {
  const trimmedValue = inputValue.trim ? inputValue.trim() : inputValue;
  const num: number = Number(trimmedValue);

  if (!isNaN(num)) {
    return { num };
  }

  return { num: trimmedValue };
};

const handleGetTokenDisplayLabel = (tokenValue: CustomizeDataStructure, tokenMeta: TokenMeta<string>) => {
  console.log(
    'handleGetTokenDisplayLabel',
    'tokenValue',
    tokenValue,
    'tokenMeta',
    tokenMeta
  );

  if (tokenMeta.error) {
    return tokenValue.num;
  }

  return `Number: ${tokenValue.num}`;
};

const handleGetTokenEditableValue = (tokenValue: CustomizeDataStructure) => {
  return '' + tokenValue.num;
};

const handleTokenValueValidate = (tokenValue: CustomizeDataStructure) => {
  const num = handleGetTokenEditableValue(tokenValue);

  if (typeof num !== 'number' || Number.isNaN(num) === true) {
    return 'Input value is not a number';
  }

  return null;
};

const handleGetTokenErrorMessage = (tokenValue: CustomizeDataStructure, tokenMeta: TokenMeta<string>) => {
  return tokenMeta.error;
};

const ExampleCustomizeDataStructure = () => {
  const [customizeData, setCustomizeData] = useState(CUSTOMIZE_DATA_STRUCTURES);

  const handleTokenValuesChange = useCallback(
    (newTokenValues) => {
      console.log('handleTokenValuesChange; newTokenValues', newTokenValues);

      setCustomizeData(newTokenValues);
    },
    [setCustomizeData]
  );

  return (
    <>
      <h2>
        Customize Data Structure and Validator
        <CopyAnchor hashTag="example-customize-data-structure" />
      </h2>
      <p>
        In this example, the tokeValues will be array of customized structure.
      </p>
      <pre>{`{ "num": number }`}</pre>
      <p>
        Hint: TokenInput allow you to inline editing a token by mouse click on
        it.
        <br />
        Try to edit as not number type to see the invalid token.
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

      <p>
        When use customize data structure, following are <b>required</b> for
        TokenInput to know how to handle tokenValues with the structure.
      </p>
      <ul>
        <li>onBuildTokenValue</li>
        <li>onGetTokenDisplayLabel</li>
        <li>onGetTokenEditableValue</li>
      </ul>

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
