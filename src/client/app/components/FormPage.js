import React, { Component } from 'react';
import { Row, Col, Tabs, Tab } from 'react-materialize';
import FormBuscarCancha from './FormBuscarCancha';
import ListReservas from './ListReservas';
import StatsComponent from './StatsComponent';

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
						<Tabs>
							<Tab title="Estadísticas" active><StatsComponent /></Tab>
							<Tab title="Próximas"><ListReservas full="false"/></Tab>
						</Tabs>
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
