import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import FormBuscarCancha from './FormBuscarCancha';
import ListReservas from './ListReservas';

class FormPage extends Component {
	constructor() {
		super();
		this.state = {
			formSubmitted: false,
			params: {}
		};
	}

	onSubmittedForm(parameters) {
		this.setState({
			formSubmitted: true,
			params: parameters
		});
	}

	render() {
		if (!this.state.formSubmitted) {
			return (
				<Row>
					<Col s={6}>
	          <FormBuscarCancha onSubmitted={this.onSubmittedForm.bind(this)}/>
					</Col>
					<Col s={6}>
						<ListReservas full="false"/>
					</Col>
				</Row>
			);
		}
		else {
			return(
				<ListReservas params={this.state.params} />
			);
		}
	}
}

export default FormPage;
