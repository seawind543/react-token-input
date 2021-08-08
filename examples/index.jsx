import React from 'react';
import ReactDOM from 'react-dom'; // eslint-disable-line import/no-extraneous-dependencies
import Navbar from './Navbar';
import Section from './Section';

// import ExampleTest from './ExampleTest';
import ExampleDefault from './ExampleDefault';
import ExampleCustomizeDataStructure from './ExampleCustomizeDataStructure';
import ExamplePreprocessor from './ExamplePreprocessor';
import ExampleCustomizeSeparators from './ExampleCustomizeSeparators';
import ExampleCustomizeToken from './ExampleCustomizeToken';
import ExampleReadOnly from './ExampleReadOnly';

import './index.styl';

const name = 'React TokenInput (react-customize-token-input)';
const url = 'https://github.com/seawind543/react-token-input';

const App = () => {
  return (
    <div>
      <Navbar name={name} url={url} />
      <div className="container-fluid" style={{ padding: '20px 20px 0' }}>
        {/* <div className="row">
          <Section>
            <ExampleTest />
          </Section>
        </div> */}

        <div className="row">
          <Section>
            <ExampleDefault />
          </Section>
        </div>

        <div className="row">
          <Section>
            <ExampleCustomizeDataStructure />
          </Section>
        </div>

        <div className="row">
          <Section>
            <ExamplePreprocessor />
          </Section>
        </div>

        <div className="row">
          <Section>
            <ExampleCustomizeSeparators />
          </Section>
        </div>

        <div className="row">
          <Section>
            <ExampleCustomizeToken />
          </Section>
        </div>

        <div className="row">
          <Section>
            <ExampleReadOnly />
          </Section>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
