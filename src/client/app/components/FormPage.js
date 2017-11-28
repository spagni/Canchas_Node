import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import FormBuscarCancha from './FormBuscarCancha';
import ListReservas from './ListReservas';

class FormPage extends Component {
	render() {
		return (
			<Row>
				<Col s={6}>
          <FormBuscarCancha />
				</Col>
				<Col s={6}>
					<ListReservas />
				</Col>
			</Row>
		);
	}
}

export default FormPage;
