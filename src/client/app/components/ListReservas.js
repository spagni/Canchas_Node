import React, { Component } from 'react';

class ListReservas extends Component {
    //Component reutilizable para la landing y para full reservas
    //Que reciba por props un titulo para la pagina, un bool si es full o no y un list de parametros/ o de reservas
    //componentDidMount busca un top 5 de proximas reservas
    render() {
        return(
            <div>
                <h5>Próximas canchas disponibles</h5>
            </div>
        );
    }
}

export default ListReservas;