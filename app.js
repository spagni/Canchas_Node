const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

function callServer(server){
	return axios.get(server).then((resp)=>Promise.resolve(resp.data))
}

const server = ['http://localhost:8000/getCanchas','http://localhost:8000/getCanchas']

app.get('/getCanchas', (req, res) => {
	Promise.all(server.map(callServer))
		.then((data) => {
		   res.json([].concat.apply([], data);
		})
		.catch((err) => console.log(err));
});

app.listen(3000, () => {
	console.log('conectado');
});