/* eslint no-console: 0 */
import React, { useState, useCallback } from 'react';
import TokenInput from '../../src';

import CopyAnchor from '../share/CopyAnchor';

/**
 * Customize data structure
 */
const URLS = [
  'https://developer.mozilla.org/',
  'https://www.w3schools.com/',
  'https://github.com/seawind543/react-token-input/',
];

const urlProtocolPattern = /^(https:\/\/|http:\/\/)/i;

const handlePreprocess = (inputValues) => {
  const values = [];

  inputValues
    .filter((value) => {
      // filter empty
      return value !== '' && value.trim() !== '';
    })
    .forEach((value) => {
      const url = value.trim();
      if (urlProtocolPattern.test(url) === false) {
        values.push(`https://${url}`, `http://${url}`);
      } else {
        values.push(url);
      }
    });

  return values;
};

const ExamplePreprocessor = () => {
  const [urls, setUrls] = useState(URLS);

  const handleTokenValuesChange = useCallback(
    (newTokenValues) => {
      console.log('handleTokenValuesChange; newTokenValues', newTokenValues);

      setUrls(newTokenValues);
    },
    [setUrls]
  );

  return (
    <>
      <h2>
        Reproduce value by Preprocessor
        <CopyAnchor hashTag="example-preprocess" />
      </h2>
      <p>
        Use props <b>onPreprocess</b> to make preprocess before become a token.
        <br />
        <br />
        Hint: Type any value without <b>https://</b> and <b>http://</b> to see
        reproduce effect. Following value will become 2 URLs. Copy and Paste to
        see result.
      </p>
      <pre>google.com</pre>
      <TokenInput
        tokenValues={urls}
        onTokenValuesChange={handleTokenValuesChange}
        onPreprocess={handlePreprocess}
      />

      <pre>
        {`
<TokenInput
  tokenValues={urls}
  onTokenValuesChange={handleTokenValuesChange}
  onPreprocess={handlePreprocess}
/>
        `}
      </pre>

      <pre>
        {`
const handlePreprocess = (inputValues) => {
  const values = [];

  inputValues
    .filter((value) => {
      // filter empty
      return value !== '' && value.trim() !== '';
    })
    .forEach((value) => {
      const url = value.trim();
      const protocolPattern = /^(https:\\/\\/|http:\\/\\/)/i;
      if (protocolPattern.test(url) === false) {
        values.push(\`https://\${url}\`, \`http://\${url}\`);
      } else {
        values.push(url);
      }
    });

  return values;
};
        `}
      </pre>
    </>
  );
};

export default ExamplePreprocessor;
