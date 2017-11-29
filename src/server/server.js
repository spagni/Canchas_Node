'use strict'
const path = require("path")
const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const constants = require('./constants/constants');
require('./models/reserva');

mongoose.connect(constants.mongoURI);

const app = express();

const baseFolder = path.resolve(__dirname, '../client/')

app.use("/",express.static(baseFolder))
app.use("/reservas",express.static(baseFolder))

app.use(bodyParser.json());

require('./routes/CanchasRoute')(app);

app.listen(3000, () => {
	console.log('conectado');
});
