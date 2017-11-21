const axios = require('axios');
const constants = require('../constants/constants');

function callServer(server){
	return axios.get(server).then((resp)=>Promise.resolve(resp.data))
}

module.exports.getReservas = function(req, res) {
	console.log(req.body);
	Promise.all(constants.serverUri.map(callServer))
		.then((data) => {
		   //res.json([].concat.apply([], data);
		   res.json(data);
		})
		.catch((err) => console.log(err));
};


module.exports.getReservasPost = function(req, res) {
	console.log(req.body);
	
	Promise.all(constants.serverUri.map(callServer))
		.then((data) => {
		   res.json(data);
		})
		.catch((err) => console.log(err));
};
