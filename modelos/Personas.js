const Sequelize = require('sequelize');

const db = require('../bd/db');

const Personas = db.define('personas', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},

	nombre: {
		type: Sequelize.STRING
	},
	apellidoP: {
		type: Sequelize.STRING
	},
	apellidoM: {
		type: Sequelize.STRING
	},
	direccion: {
		type: Sequelize.STRING
	},
	telefono: {
		type: Sequelize.STRING
	}
});

module.exports = Personas;
