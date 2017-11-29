import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-materialize';

class ListReservas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			params: this.props.params,
			reservas: []
		};
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
		}
	}

  renderTabla() {
    return (this.state.reservas.map(res => {
      const precio = this.calcularPrecio(res);
      const cancha = this.tipoCancha(res);
      return(
        <tr key={res.Link}>
          <td>{res.Nombre}</td>
          <td>{cancha}</td>
          <td>{res.Fecha}</td>
          <td>{res.Horario}</td>
          <td>${precio}</td>
          <td>{res.Web}</td>
          <td>
            <Button waves="light" node='a' href={res.Link}>
              Reservar
            </Button>
          </td>
        </tr>
      );
    }));
  }

  tipoCancha(reserva) {
    switch (reserva.Tamanio) {
      case 'cancha_5':
        return 'Cancha 5'
        break;
      case 'cancha_7':
        return 'Cancha 7'
        break;
      case 'cancha_9':
        return 'Cancha 9'
        break;
    }
  }

  calcularPrecio(reserva) {
    if (reserva.Horario < 19) {
      return reserva.Precio_Dia;
    }
    else {
      return reserva.Precio_Noche;
    }
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
          <tbody>
            {this.renderTabla()}
          </tbody>
				</Table>
			</div>
		);
	}
}

export default ListReservas;
