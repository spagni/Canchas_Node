import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import FormBuscarCancha from './FormBuscarCancha';

class FormPage extends Component {
	render() {
		return (
			<Row>
				<Col s={6}>
          <FormBuscarCancha />
				</Col>
			</Row>
		);
	}
}

export default FormPage;
