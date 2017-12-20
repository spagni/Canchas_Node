import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Pagination } from 'react-materialize';

class ListReservas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			params: this.props.params,
			reservas: [],
			reservasPaginadas: [],
			reservasProximas: [],
			currentPage: 1,
			totalRes: 0
		};
		this.paginate = this.paginate.bind(this);
		this.loadPaginationItems = this.loadPaginationItems.bind(this);
		this.buscarProximasReservas = this.buscarProximasReservas.bind(this);
	}

	componentWillMount() {
		if (this.state.params) {
			axios
				.post('/reservas', this.state.params)
				.then(data => {
					//Guardo las reservas en mi estado
					this.setState({ reservas: data.data, params: {} });
				})
				.catch(err => console.log(err));
		} else {
			axios
				.get('/reservasDisponibles')
				.then(data => {
					console.log(data.data);
					//busco las reservas mas cercanas
					let arrProximas = this.buscarProximasReservas(data.data);
					//Guardo las reservas en mi estado
					this.setState({
						reservas: data.data,
						reservasProximas: arrProximas,
						reservasPaginadas: this.paginate(arrProximas, 5, 1),
						totalRes: arrProximas.length
					});
				})
				.catch(err => console.log(err));
		}
	}

	handleSubmit(res, precio) {
		const newReserva = {
			nombre: res.Nombre,
			tamanio: res.Tamanio,
			fecha: res.Fecha,
			horario: res.Horario,
			precio: precio,
			web: res.Web,
			link: res.Link
		};

		axios
			.post('/reserva', newReserva)
			.then(data => {
				console.log(data);
				window.open(newReserva.link, '_blank');
			})
			.catch(err => console.log(err));
	}

	renderTabla() {
		let arrReservas = [];
		if (this.props.full === 'false') {
			arrReservas = this.state.reservasPaginadas;
		} else {
			arrReservas = this.state.reservas;
		}
		return arrReservas
			.sort(this.compare)
			.map(res => {
			const precio = this.calcularPrecio(res);
			const cancha = this.tipoCancha(res);
			return (
				<tr key={res.Link}>
					<td>{res.Nombre}</td>
					<td>{cancha}</td>
					<td>{res.Fecha}</td>
					<td>{res.Horario}</td>
					<td>${precio}</td>
					<td>{res.Web}</td>
					<td>
						<Button
							waves="light"
							node="a"
							onClick={() => this.handleSubmit(res, precio)}
						>
							Ir
						</Button>
					</td>
				</tr>
			);
		});
	}

	compare(a, b) {
		if(a.Fecha === b.Fecha)
		{
			var x = a.Horario, y = b.Horario;
			
			return x < y ? -1 : x > y ? 1 : 0;
		}
		return a.Fecha - b.Fecha;
	  }

	tipoCancha(reserva) {
		switch (reserva.Tamanio) {
			case 'cancha_5':
				return 'Cancha 5';
				break;
			case 'Cancha de 5':
				return 'Cancha 5';
				break;
			case 'Cancha de 7':
				return 'Cancha 7';
				break;
			case 'Cancha de 9':
				return 'Cancha 9';
				break;
			case 'cancha_7':
				return 'Cancha 7';
				break;
			case 'cancha_9':
				return 'Cancha 9';
				break;
		}
	}

	calcularPrecio(reserva) {
		if (reserva.Horario < 19) {
			return reserva.Precio_Dia;
		} else {
			return reserva.Precio_Noche;
		}
	}

	showPagination() {
		if (this.props.full === 'false') {
			return (
				<Pagination
					items={Math.round(this.state.totalRes/5)}
					activePage={this.state.currentPage}
					maxButtons={3}
					onSelect={this.loadPaginationItems}
				/>
			);
		}
	}

	loadPaginationItems(page) {
		const reservasPage = this.paginate(this.state.reservasProximas, 5, page);
		this.setState({ reservasPaginadas: reservasPage }
		);
	}

	paginate(array, page_size, page_number) {
		--page_number; // hay que empezar desde 0, pero las paginas empiezan desde 1
		return array.slice(page_number * page_size, (page_number + 1) * page_size);
	}

	buscarProximasReservas(array) {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();
		let hour = today.getHours();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		today = yyyy + '-' + mm + '-' + dd;
		return array.filter((item) => {
			return (item.Fecha === today && item.Horario > hour );
		});
	}

	render() {
		return (
			<div>
				<h5>Próximas canchas disponibles</h5>
				<Table>
					<thead>
						<tr>
							<th data-field="nombre">Nombre</th>
							<th data-field="tamanio">Tamaño</th>
							<th data-field="fecha">Fecha</th>
							<th data-field="horario">Horario</th>
							<th data-field="precio">Precio</th>
							<th data-field="web">Web</th>
							<th data-field="reservar">Resevar</th>
						</tr>
					</thead>
					<tbody>{this.renderTabla()}</tbody>
				</Table>
				{this.showPagination()}
			</div>
		);
	}
}

export default ListReservas;
