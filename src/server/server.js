'use strict'
const path = require("path")
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const baseFolder = path.resolve(__dirname, '../client/')

app.use("/",express.static(baseFolder))
app.use("/reservas",express.static(baseFolder))

app.use(bodyParser.json());

require('./routes/CanchasRoute')(app);

app.listen(3000, () => {
	console.log('conectado');
});
