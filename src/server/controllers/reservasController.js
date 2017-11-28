const axios = require('axios');
const constants = require('../constants/constants');
let params = '';

function callServer(server){
	server += params;
	return axios.get(server).then((resp)=>Promise.resolve(resp.data)).catch((err) => console.log(err));
}

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
