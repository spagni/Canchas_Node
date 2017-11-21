const reservasCtrl = require('../controllers/reservasController');

module.exports = function(app) {

	//app.get('/getReservas/:tipoCancha/:fechaDesde/:fechaHasta/:horaDesde/:horaHasta', reservasCtrl.getReservas);

	app.get('/getReservas/:tipoCancha', reservasCtrl.getReservas);

	app.post('/getReservas', reservasCtrl.getReservasPost);
}
