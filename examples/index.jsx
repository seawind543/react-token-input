import 'trendmicro-ui/dist/css/trendmicro-ui.css';
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';
import Section from './Section';
import TokenInput from '../src';

import styles from './index.styl';

const name = 'React TokenInput';
const url = 'https://github.com/seawind543/react-token-input';

class App extends PureComponent {
    state = {
    }

    actions = {
    }

    render() {
        return (
            <div>
                <Navbar name={name} url={url} />
                <div className="container-fluid" style={{ padding: '20px 20px 0' }}>
                    <div className="row">
                        <div className="col-md-12">
                            <Section className="row-md-6">
                                <h2>Say Hello World:</h2>
                                <TokenInput className={styles.hello} />
                            </Section>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Section className="row-md-3">
                                <h2>Title #2</h2>
                            </Section>
                        </div>
                        <div className="col-md-6">
                            <Section className="row-md-3">
                                <h2>Title #3</h2>
                            </Section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('container')
);
