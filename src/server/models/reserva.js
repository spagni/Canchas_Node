const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservaSchema = new Schema({
  nombreCancha: String,
  tamanioCancha: String,
  fecha: String,
  horario: Number,
  precio: Number,
  web: String,
  link: String,
  dateReserva: Date
});

mongoose.model('reservas', reservaSchema);
