import React, { Component } from 'react';
import {render} from 'react-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import FooterPage from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <LandingPage />
        <FooterPage />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
