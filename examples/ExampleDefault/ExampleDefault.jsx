/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput from '../../src';

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
      <h2>Simple example: Take default</h2>
      <p>By default, TokenInput will assume tokenValues is array of strings.</p>

      <TokenInput
        className="example--default"
        tokenValues={values}
        onTokenValuesChange={handleTokenValuesChange}
      />

      <pre>
        {`
<TokenInput
  className="example--default"
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
