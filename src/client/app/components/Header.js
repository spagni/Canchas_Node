import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize';

class Header extends Component {
  render() {
    return(
      <Navbar brand='TriCancha' right>
      	<NavItem href='#'>Reserva tu Cancha</NavItem>
      	<NavItem href='#'>Nosotros</NavItem>
      </Navbar>
    )
  }
}

export default Header;
