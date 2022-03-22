/* eslint no-console: 0 */

import React, { useState, useCallback } from 'react';
import TokenInput, { JS__TOKEN__DELETE_BUTTON__CLASS_NAME } from '../../src';

import CopyAnchor from '../share/CopyAnchor';

import { DEMO_VALUES } from '../demoValues';

import style from './index.scss';

const handleGetTokenDisplayLabel = (tokenValue: string) => {
  // Google font material-icons
  // https://fonts.google.com/icons
  return (
    <>
      {/* <span role="img" aria-label="TokenIcon" style={{ marginRight: '4px' }}>
        🪙
      </span> */}
      <span
        className={[
          JS__TOKEN__DELETE_BUTTON__CLASS_NAME, // A hard code className to tell TokenInput to treat it as delete button
          'material-icons', // A hard code className to use Google icon
          style['material-icons'],
        ].join(' ')}
      >
        delete
      </span>
      {`${tokenValue}`}
    </>
  );
};

const ExampleCustomizeTokenVisualTrick = () => {
  const [values, setValues] = useState(DEMO_VALUES);

  const handleTokenValuesChange = useCallback(
    (newTokenValues: string[]) => {
      console.log('handleTokenValuesChange; newTokenValues', newTokenValues);

      setValues(newTokenValues);
    },
    [setValues]
  );

  return (
    <>
      <h2>
        Customize Token visual (Customize Token Label Trick)
        <CopyAnchor hashTag="example-customize-token-visual" />
      </h2>
      <p>
        You could make a <b>Trick</b> by prop <b>onGetTokenDisplayLabel</b> to
        make the HTML element re-layout.
        <br />
        Could be very helpful, in case the build-in HTML structure of{' '}
        <b>Token</b> is not suited for you to customize visuals through only
        customizing CSS styles and you do NOT want to rebuild the whole{' '}
        <b>Token component</b> functionality.
      </p>

      <TokenInput
        className={style['example-customize-token-visual-trick']}
        tokenValues={values}
        onTokenValuesChange={handleTokenValuesChange}
        onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
      />

      <p>
        Bind the hard code className <b>JS__TOKEN__DELETE_BUTTON__CLASS_NAME</b>{' '}
        on the element, which you want to perform the <b>Token Delete Action</b>{' '}
        when click on it.
      </p>
      <pre>
        {`
import TokenInput, { JS__TOKEN__DELETE_BUTTON__CLASS_NAME } from 'react-customize-token-input';

// ... omit

const handleGetTokenDisplayLabel = (tokenValue, tokenMeta) => {
  // Google font material-icons
  // https://fonts.google.com/icons
  return (
    <>
      <span
        className=\`material-icons \${JS__TOKEN__DELETE_BUTTON__CLASS_NAME}\`
        style={{ color: '#888', marginRight: '4px' }}
      >
        delete
      </span>
      {\`\${tokenValue}\`}
    </>
  );
};

// ... omit

<TokenInput
  className="example-customize-token-visual-trick"
  tokenValues={values}
  onTokenValuesChange={handleTokenValuesChange}
  onGetTokenDisplayLabel={handleGetTokenDisplayLabel}
/>
        `}
      </pre>

      <p>
        To hide the <b>build-in delete button</b>. Use CSS selector with either
        className or <b>{`[data-component-name="DeleteButton"]`}</b>
      </p>
      <pre>
        {`
.example-customize-token-visual-trick [data-component-name="DeleteButton"] {
  // Hide the build-in delete button
  display: none !important;
}
        `}
      </pre>
    </>
  );
};

export default ExampleCustomizeTokenVisualTrick;
