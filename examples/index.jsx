import React from 'react';

/**
 * Disable the ESLint `import/no-extraneous-dependencies` for import ReactDOM
 * ReactDOM is only use for build the `live demo page` and `dev`,
 * so keep it in devDependencies
 */
import ReactDOM from 'react-dom'; // eslint-disable-line import/no-extraneous-dependencies

import Navbar from './Navbar';
import Section from './Section';

// import ExampleTest from './ExampleTest';
import ExampleDefault from './ExampleDefault';
import ExampleCustomizeDataStructure from './ExampleCustomizeDataStructure';
import ExampleCustomizeTokenLabel from './ExampleCustomizeTokenLabel';
import ExampleCustomizeDeleteButton from './ExampleCustomizeDeleteButton';
import ExamplePreprocessor from './ExamplePreprocessor';
import ExampleCustomizeSeparators from './ExampleCustomizeSeparators';
import ExampleCustomizeToken from './ExampleCustomizeToken';
import ExampleReadOnly from './ExampleReadOnly';

import './index.styl';

const name =
  'React TokenInput (react-customize-token-input). Visit GitHub here';
const url = 'https://github.com/seawind543/react-token-input';

const examples = [
  // <ExampleTest key="ExampleTest" />,
  <ExampleDefault key="ExampleDefault" />,
  <ExampleCustomizeTokenLabel key="ExampleCustomizeTokenLabel" />,
  <ExampleCustomizeDeleteButton key="ExampleCustomizeDeleteButton" />,
  <ExampleCustomizeDataStructure key="ExampleCustomizeDataStructure" />,
  <ExamplePreprocessor key="ExamplePreprocessor" />,
  <ExampleCustomizeSeparators key="ExampleCustomizeSeparators" />,
  <ExampleCustomizeToken key="ExampleCustomizeToken" />,
  <ExampleReadOnly key="ExampleReadOnly" />,
];

const App = () => {
  return (
    <div>
      <Navbar name={name} url={url} />
      <div className="container-fluid" style={{ padding: '20px 20px 0' }}>
        {examples.map((example, index) => (
          <div className="row" key={index}>
            <Section>{example}</Section>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
