const axios = require('axios');
const mongoose = require('mongoose');
const constants = require('../constants/constants');
const Reserva = mongoose.model('reservas');
let params = '';

function callServer(server){
	server += params;
	return axios.get(server).then((resp)=>Promise.resolve(resp.data)).catch((err) => console.log(err));
}

module.exports.getStats = function(req, res) {
	Reserva.aggregate([
		{
			$group: {
				_id: {
					nombreCancha: '$nombreCancha',
					tamanioCancha: '$tamanioCancha',
					web: '$web'
				},
				count: { $sum: 1}
			}
		}
	],
	function (err, result) {
        if (err) {
            next(err);
        } else {
            res.json(result);
        }
    });
};

module.exports.getReservas = function(req, res) {
	Promise.all(constants.serverUri.map(callServer))
		.then((data) => {
		   res.json(concatAll(data));
		})
		.catch((err) => console.log(err));
};


module.exports.getReservasPost = function(req, res) {
	params = buildParametersString(req.body);

	Promise.all(constants.serverUri.map(callServer))
		.then((data) => {
		   res.json(concatAll(data));
		})
		.catch((err) => console.log(err));
};

module.exports.saveReserva = function(req, res) {
	const { nombre, tamanio, fecha, horario, precio, web, link } = req.body;

	const reserva = new Reserva({
		nombreCancha: nombre,
	  tamanioCancha: tamanio,
	  fecha: fecha,
	  horario: horario,
	  precio: precio,
	  web: web,
	  link: link,
	  dateReserva: Date.now()
	});

	reserva.save();
	res.send('OK');
};

function concatAll(arr) {
	let results = [];

	arr.forEach((subArray) => {
		subArray.forEach((item) => {
			results.push(item);
		});
	});

	return results;
}

function buildParametersString(params) {
	let getParameters = '?tipoCancha=' + params.tipoCancha;
	getParameters += params.fechaDesde !== '' ? '&fechaDesde=' + params.fechaDesde : '';
	getParameters += params.fechaHasta !== '' ? '&fechaHasta=' + params.fechaHasta : '';
	getParameters += params.horaDesde !== '' ? '&horaDesde=' + params.horaDesde : '';
	getParameters += params.horaHasta !== '' ? '&horaHasta=' + params.horaHasta : '';

	return getParameters;
}
