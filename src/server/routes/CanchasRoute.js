const reservasCtrl = require('../controllers/reservasController');

module.exports = function(app) {

	app.get('/getReservas', reservasCtrl.getReservas);
}