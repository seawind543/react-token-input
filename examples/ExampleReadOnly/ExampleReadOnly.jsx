/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */
import React, { useState } from 'react';
import TokenInput from '../../src';

import DEMO_VALUES from '../demoValues';

const ERROR_VALUE = 'Invalid token in read-only mode';

const handleTokenValueValidate = (tokenValue, index, tokenValues) => {
  if (tokenValue === ERROR_VALUE) {
    return "I'm an error token";
  }

  return null;
};

const ExampleReadOnly = () => {
  const [values, setValues] = useState(DEMO_VALUES);

  return (
    <>
      <h2>Read only</h2>
      <p>
        When under read-only, the tokens will not be able to either <b>edit</b>{' '}
        or <b>delete</b>.
      </p>

      <TokenInput readOnly={true} tokenValues={values} />
      <pre>
        {`
<TokenInput
  readOnly={true}
  tokenValues={values}
/>
        `}
      </pre>

      <TokenInput
        readOnly={true}
        tokenValues={[...values, ERROR_VALUE]}
        onTokenValueValidate={handleTokenValueValidate}
      />

      <pre>
        {`
<TokenInput
  readOnly={true}
  tokenValues={values}
  onTokenValueValidate={handleTokenValueValidate}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleReadOnly;
