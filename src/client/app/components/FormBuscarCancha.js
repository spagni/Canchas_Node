import React, { Component } from 'react';
import { Row, Col, Input, Button, NavItem } from 'react-materialize';
import axios from 'axios';

class FormBuscarCancha extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tipoCancha: '5',
			fechaDesde: '',
			fechaHasta: '',
			horaDesde: '',
			horaHasta: ''
		};
		this.handleHoraDesde = this.handleHoraDesde.bind(this);
		this.handleHoraHasta = this.handleHoraHasta.bind(this);
		this.handleFechaDesde = this.handleFechaDesde.bind(this);
		this.handleFechaHasta = this.handleFechaHasta.bind(this);
		this.handleTipoCancha = this.handleTipoCancha.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/*componentDidMount() {
		$('.datepicker').pickadate({
      formatSubmit: 'yyyy/mm/dd',
      hiddenName:true
		});
	}*/

	handleTipoCancha(event) {
		this.setState({ tipoCancha: event.target.value });
	}

	handleHoraDesde(event) {
		this.setState({ horaDesde: event.target.value });
	}

	handleHoraHasta(event) {
		this.setState({ horaHasta: event.target.value });
	}

	handleFechaDesde(event) {
		this.setState({ fechaDesde: event.target.value });
	}

	handleFechaHasta(event) {
		this.setState({ fechaHasta: event.target.value });
	}

	buildParametersString() {
		let getParameters = 'tipoCancha=' + this.state.tipoCancha;
		getParameters += this.state.fechaDesde !== '' ? '&fechaDesde=' + this.state.fechaDesde : '';
		getParameters += this.state.fechaHasta !== '' ? '&fechaHasta=' + this.state.fechaHasta : '';
		getParameters += this.state.horaDesde !== '' ? '&horaDesde=' + this.state.horaDesde : '';
		getParameters += this.state.horaHasta !== '' ? '&horaHasta=' + this.state.horaHasta : '';

		return getParameters;
	}

	handleSubmit(event) {
		const parameters = this.buildParametersString();

		axios.get('/getReservas?' + parameters)
					.then((data) => console.log(data.data))
					.catch((err) => console.log(err));
	}

	render() {
		return (
			<div>
				<h5>¿Para cuando querés una cancha?</h5>
				<Input
					s={12}
					type="select"
					label="Tipo de Cancha"
					value={this.state.tipoCancha}
					onChange={this.handleTipoCancha}
				>
					<option value="5">Cancha 5</option>
					<option value="7">Cancha 7</option>
					<option value="9">Cancha 9</option>
				</Input>
        <Input
					s={6}
					label="Fecha Desde*"
          placeholder="YYYY/MM/DD"
					value={this.state.fechaDesde}
					onChange={this.handleFechaDesde}
				/>
				<Input
					s={6}
					label="Fecha Hasta"
          placeholder="YYYY/MM/DD"
					value={this.state.fechaHasta}
					onChange={this.handleFechaHasta}
				/>
				<Input
					s={6}
					placeholder="08 - 23"
					label="Hora Desde*"
					value={this.state.horaDesde}
					onChange={this.handleHoraDesde}
				/>
				<Input
					s={6}
					placeholder="08 - 23"
					label="Hora Hasta"
					value={this.state.horaHasta}
					onChange={this.handleHoraHasta}
				/>
				<Row>
					<Col s={9} />
					<Col s={3}>
						<Button waves="light" onClick={this.handleSubmit}>
							Buscar
						</Button>
					</Col>
				</Row>
			</div>
		);
	}
}

export default FormBuscarCancha;

/*<Input
  s={6}
  type="date"
  label="Fecha Desde*"
  className="datepicker"
  value={this.state.fechaDesde}
  onChange={this.handleFechaDesde}
/>
<Input
  s={6}
  type="date"
  label="Fecha Hasta"
  value={this.state.fechaHasta}
  onChange={this.handleFechaHasta}
/>*/
