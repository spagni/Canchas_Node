import React, { Component } from 'react';
import { Parallax } from 'react-materialize';

class LandingPage extends Component {
  render() {
    return(
      <div>
        <Parallax imageSrc="../../images/pelotaCancha.jpg" />
        <h1>Meta Buscador de Canchas de futbol</h1>
      </div>
    );
  }
}

export default LandingPage;
