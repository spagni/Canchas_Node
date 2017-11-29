import React, { Component } from 'react';
import {render} from 'react-dom';
import { BrowserRouter, Route  } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import FooterPage from './components/Footer';
import ListReservas from './components/ListReservas';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
			location : {
				state: {
					sebi: ''
				}
			}
		};
	}
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={LandingPage}/>
            <Route path="/reservas" component={ListReservas}/>
            <FooterPage />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
