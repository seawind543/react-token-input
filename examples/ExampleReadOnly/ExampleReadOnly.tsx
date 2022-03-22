/* eslint no-console: 0 */

import React, { useState } from 'react';
import TokenInput from '../../src';

import CopyAnchor from '../share/CopyAnchor';

import {
  DEMO_VALUES,
  INVALID_VALUE,
  DEMO_VALUES_WITH_INVALID,
} from '../demoValues';

const handleTokenValueValidate = (tokenValue: string) => {
  if (tokenValue === INVALID_VALUE) {
    return "I'm an invalid token";
  }

  return null;
};

const ExampleReadOnly = () => {
  const [values, setValues] = useState<string[]>(DEMO_VALUES);

  return (
    <>
      <h2>
        Read only
        <CopyAnchor hashTag="example-read-only" />
      </h2>
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
        tokenValues={DEMO_VALUES_WITH_INVALID}
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
