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
				.post('/getReservas', this.state.params)
				.then(data => {
					//Guardo las reservas en mi estado
					this.setState({ reservas: data.data });
				})
				.catch(err => console.log(err));
		} else {
			axios
				.get('/getReservas')
				.then(data => {
					//Guardo las reservas en mi estado
					this.setState({
						reservas: data.data,
						reservasPaginadas: this.paginate(data.data, 5, 1),
						totalRes: data.data.length / 5
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
			.post('/postReserva', newReserva)
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
		return arrReservas.map(res => {
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

	tipoCancha(reserva) {
		switch (reserva.Tamanio) {
			case 'cancha_5':
				return 'Cancha 5';
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
					items={this.state.reservas.lenght/5}
					activePage={this.state.currentPage}
					maxButtons={3}
					onSelect={this.loadPaginationItems}
				/>
			);
		}
	}

	loadPaginationItems(page) {
		const reservasPage = this.paginate(this.state.reservas, 5, page);
		this.setState({ reservasPaginadas: reservasPage }
		);
	}

	paginate(array, page_size, page_number) {
		let newArr = this.buscarProximasReservas(array);
		--page_number; // because pages logically start with 1, but technically with 0
		return newArr.slice(page_number * page_size, (page_number + 1) * page_size);
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
			return (item.Fecha === today && item.Horario > hour && item.Horario < hour+4);
		});
	}
	//Component reutilizable para la landing y para full reservas
	//Que reciba por props un titulo para la pagina, un bool si es full o no y un list de parametros/ o de reservas
	//componentDidMount busca un top 5 de proximas reservas
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
