/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput from '../../src/index.ts';

import CopyAnchor from '../share/CopyAnchor';

const ExampleDefault = () => {
  const [values, setValues] = useState([]);

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
        Simple example: Take default
        <CopyAnchor hashTag="example-default" />
      </h2>
      <p>
        By default, TokenInput will assume tokenValues is array of strings.
        <br />
        Input anything and press <b>Enter</b> to see what will be.
      </p>
      <div>
        Hint: By default TokenInput will create token when you input
        <ul>
          <li>
            Character <b>Comma</b> (,) or <b>Semicolon</b> (;)
          </li>
          <li>
            Press <b>Enter</b>. Reference{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/seawind543/react-token-input#predefined-keydown-event-handlers"
            >
              Predefined KeyDown Event
            </a>{' '}
            for more detail.
          </li>
          <li>
            <b>Paste</b> values
          </li>
        </ul>
      </div>

      <TokenInput
        tokenValues={values}
        onTokenValuesChange={handleTokenValuesChange}
      />
      <pre>
        {`
<TokenInput
  tokenValues={values}
  onTokenValuesChange={handleTokenValuesChange}
/>
        `}
      </pre>
      <pre>
        <div>{`values = [`}</div>
        {values.map((value, index) => {
          return (
            <div key={index} style={{ marginLeft: '8px' }}>
              {index + 1 !== values.length ? `'${value}'` : `'${value}',`}
            </div>
          );
        })}
        <div>{`];`}</div>
      </pre>
    </>
  );
};

export default ExampleDefault;
