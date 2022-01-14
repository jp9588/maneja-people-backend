const express = require('express');
const personaController = require('../controllers/personaController');

const router = express.Router();

module.exports = function() {
	router.get('/personas/buscar-todas', personaController.obtenerTodasLasPersonas);
	router.post('/persona/crear', personaController.crearPersona);
	router.put('/persona/editar/:id', personaController.editarPersona);
	router.delete('/persona/eliminar/:id', personaController.eliminarPersona);
	router.get('/persona/buscar/:patron', personaController.buscarPersonas);

	return router;
};
