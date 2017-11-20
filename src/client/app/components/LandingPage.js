import React, { Component } from 'react';
import { Parallax } from 'react-materialize';
import FormPage from './FormPage';

class LandingPage extends Component {
  render() {
    return(
      <div>
        <Parallax imageSrc="../../images/pelotaCancha.jpg" />
        <FormPage />
      </div>
    );
  }
}

export default LandingPage;
