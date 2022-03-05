/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */

import React, { useState, useCallback } from 'react';
import TokenInput from '../../src/index.ts';

import CopyAnchor from '../share/CopyAnchor';

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

  // Could return any react node
  return (
    <>
      <span style={{ color: '#ff9900', marginRight: '4px' }}>{emoji}</span>
      {`${tokenValue}`}
    </>
  );
};

// const handleTokenValueValidate = (tokenValue) => {
//   if (!WEATHERS.includes(tokenValue)) {
//     return "I'm not weather";
//   }

//   return undefined;
// };

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
      <h2>
        Customize Token Label
        <CopyAnchor hashTag="example-customize-label" />
      </h2>
      <p>
        Use prop <b>onGetTokenDisplayLabel</b> to customize the look and feel of
        token.
        <br />
        Hint: Input `sunny` and `good` to see what will be.
      </p>

      <TokenInput
        tokenValues={weathers}
        onTokenValuesChange={handleTokenValuesChange}
        onBuildTokenValue={handleBuildTokenValue}
        onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
        // onTokenValueValidate={handleTokenValueValidate}
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

  // Could return any react node
  return (
    <>
      <span style={{ color: '#ff9900', marginRight: '4px' }}>{emoji}</span>
      {\`\${tokenValue}\`}
    </>
  );
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
