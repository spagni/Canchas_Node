const reservasCtrl = require('../controllers/reservasController');

module.exports = function(app) {

	app.get('/reservasDisponibles', reservasCtrl.getReservas);

	app.post('/reservas', reservasCtrl.getReservasPost);

	app.post('/reserva', reservasCtrl.saveReserva);

	app.get('/estadisticas', reservasCtrl.getStats);
}
