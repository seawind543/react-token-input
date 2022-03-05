/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */

import React, { useState, useCallback } from 'react';
import TokenInput from '../../src/index.ts';

import CopyAnchor from '../share/CopyAnchor';
import { DEMO_VALUES } from '../demoValues';

import style from './index.scss';

const handleRenderTokenDeleteButtonContent = () => {
  // Google font material-icons
  // https://fonts.google.com/icons
  return <span className="material-icons">delete</span>;
};

const ExampleCustomizeDeleteButton = () => {
  const [values, setValues] = useState(DEMO_VALUES);

  const handleTokenValuesChange = useCallback(
    (newTokenValues) => {
      console.log('handleTokenValuesChange; newTokenValues', newTokenValues);

      setValues(newTokenValues);
    },
    [setValues]
  );

  return (
    <>
      <h2>
        Customize Token Delete Button Content{' '}
        <CopyAnchor hashTag="example-customize-delete-button" />
      </h2>
      <p>
        Use prop <b>onRenderTokenDeleteButtonContent</b> to customize the
        content of the Delete Button of Token.
        <br />
        For example, replace the <b>Build-in x</b> by{' '}
        <a
          href="https://fonts.google.com/icons"
          target="_blank"
          rel="noreferrer"
        >
          Google font material-icons
          <span className="material-icons" style={{ fontSize: 'initial' }}>
            open_in_new
          </span>
        </a>
      </p>

      <TokenInput
        className={style['example-customize-delete-button']}
        tokenValues={values}
        onTokenValuesChange={handleTokenValuesChange}
        onRenderTokenDeleteButtonContent={handleRenderTokenDeleteButtonContent}
      />

      <pre>
        {`
const handleRenderTokenDeleteButtonContent = () => {
  // Google font material-icons
  // https://fonts.google.com/icons
  return <span className="material-icons">delete</span>;
};

// ... omit

<TokenInput
  className="example-customize-delete-button"
  tokenValues={values}
  onTokenValuesChange={handleTokenValuesChange}
  onRenderTokenDeleteButtonContent={handleRenderTokenDeleteButtonContent}
/>
        `}
      </pre>
    </>
  );
};

export default ExampleCustomizeDeleteButton;
