import React, { Component, StatelessComponent } from 'react';
import { Table, Button, Pagination } from 'react-materialize';
import axios from 'axios';

class StatsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservasStats: []
        };
    }

    componentWillMount() {
        axios.get('/estadisticas')
            .then(data => {
                this.setState({ reservasStats: data.data });
            })
            .catch(err => console.log(err));;
    }

    renderTabla() {
        return this.state.reservasStats
            .sort(this.compare)
            .map(res => {
            const cancha = this.tipoCancha(res._id);
            const { nombreCancha, web, tamanioCancha } = res._id;
			return (
				<tr key={nombreCancha}>
					<td>{nombreCancha}</td>
					<td>{cancha}</td>
					<td>{web}</td>
                    <td>{res.count} Veces reservada</td>
				</tr>
            );
		});
    }
    
    tipoCancha(reserva) {
		switch (reserva.tamanioCancha) {
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

	compare(a, b) {
		const elementA = a.count;
		const elementB = b.count;
	  
		let comparison = 0;
		if (elementA > elementB) {
		  comparison = -1;
		} else if (elementA < elementB) {
		  comparison = 1;
		}
		return comparison;
	  }

    render() {
		return (
			<div>
				<h5>Las más populares!</h5>
				<Table>
					<thead>
						<tr>
							<th data-field="nombre">Nombre</th>
							<th data-field="tamanio">Tamaño</th>
							<th data-field="web">Web</th>
							<th data-field="count">Cantidad Reservas</th>
						</tr>
					</thead>
					<tbody>{this.renderTabla()}</tbody>
				</Table>
			</div>
		);
    }
}

export default StatsComponent;