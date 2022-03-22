/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput, { KEY_DOWN_HANDLER_CONFIG_OPTION } from '../../src';

import CopyAnchor from '../share/CopyAnchor';

const ExampleSpecialKeyDown = () => {
  const [values, setValues] = useState<string[]>([]);

  const handleTokenValuesChange = useCallback(
    (newTokenValues: string[]) => {
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
        [Beta] Config special keyDown event handlers
        <CopyAnchor hashTag="example-special-key-down" />
      </h2>

      <p>
        Input anything and press <b>Enter</b> to see what will be.
        <br />
        Input anything and press <b>Tab</b> to see what will be.
      </p>
      <TokenInput
        tokenValues={values}
        onTokenValuesChange={handleTokenValuesChange}
        specialKeyDown={{
          onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF, // Turn off predefined event handler on Enter
          onTab: KEY_DOWN_HANDLER_CONFIG_OPTION.ON, // Turn on predefined event handler on Tab
        }}
      />
      <pre>
        {`
import TokenInput, { KEY_DOWN_HANDLER_CONFIG_OPTION } from 'react-customize-token-input';

// ... omit

<TokenInput
  tokenValues={values}
  onTokenValuesChange={handleTokenValuesChange}
  specialKeyDown={{
    onEnter: KEY_DOWN_HANDLER_CONFIG_OPTION.OFF, // Turn off predefined event handler on Enter
    onTab: KEY_DOWN_HANDLER_CONFIG_OPTION.ON, // Turn on predefined event handler on Tab
  }}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleSpecialKeyDown;
