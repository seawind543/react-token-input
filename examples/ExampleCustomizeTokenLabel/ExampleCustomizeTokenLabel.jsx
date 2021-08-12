/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput from '../../src';

/**
 * Customize data structure
 */
const WEATHERS = ['Sunny', 'Cloudy', 'Rain'];

const handleBuildTokenValue = (inputValue) => {
  const trimmedValue = inputValue.trim();
  const text = trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);
  return text;
};

const handleGetTokenDisplayLabel = (tokenValue, tokenMeta) => {
  console.log(
    'handleGetTokenDisplayLabel',
    'tokenValue',
    tokenValue,
    'tokenMeta',
    tokenMeta
  );

  const emoji =
    {
      Sunny: '☀',
      Cloudy: '☁️',
      Rain: '🌧️',
    }[tokenValue] || '🪙';

  return (
    <>
      <span style={{ color: '#ff9900', marginRight: '4px' }}>{emoji}</span>
      {`${tokenValue}`}
    </>
  );
};

const ExampleCustomizeTokenLabel = () => {
  const [weathers, setWeathers] = useState(WEATHERS);

  const handleTokenValuesChange = useCallback(
    (newTokenValues) => {
      console.log('handleTokenValuesChange; newTokenValues', newTokenValues);

      setWeathers(newTokenValues);
    },
    [setWeathers]
  );

  return (
    <>
      <h2>Customize Token label</h2>
      <p>
        Apply `onGetTokenDisplayLabel` to customize the token look and feel.
        <br />
        Hint: Input `sunny` and `good` to see what will be.
      </p>

      <TokenInput
        tokenValues={weathers}
        onTokenValuesChange={handleTokenValuesChange}
        onBuildTokenValue={handleBuildTokenValue}
        onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
      />

      <pre>
        {`
const handleGetTokenDisplayLabel = (tokenValue, tokenMeta) => {
  const emoji =
    {
      Sunny: '☀',
      Cloudy: '☁️',
      Rain: '🌧️',
    }[tokenValue] || '🪙';

  return \`$\{emoji} $\{tokenValue}\`;
};

// ... omit

<TokenInput
  tokenValues={weathers}
  onTokenValuesChange={handleTokenValuesChange}
  onBuildTokenValue={handleBuildTokenValue}
  onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleCustomizeTokenLabel;
