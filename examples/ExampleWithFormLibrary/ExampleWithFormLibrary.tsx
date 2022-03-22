import React from 'react';

import CopyAnchor from '../share/CopyAnchor';

const ExampleWithFormLibrary = () => {
  return (
    <>
      <h2>
        Integrate with Form Library
        <CopyAnchor hashTag="example-integrate-with-form-library" />
      </h2>

      <p>TokenInput could work within common form libraries.</p>

      <p>
        There are multiple ways we could apply to integrate TokenInput with a
        form library.
        <br />
        Reference the link below for an live example about one of an integrate
        ways.
      </p>

      <a
        target="_blank"
        rel="noreferrer"
        href="https://seawind543.github.io/example-react-token-input-with-formik/"
      >
        Example of integrated with a Form library
      </a>
    </>
  );
};

export default ExampleWithFormLibrary;
