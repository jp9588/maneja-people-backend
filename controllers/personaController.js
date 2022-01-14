const Personas = require('../modelos/Personas');
const { Op } = require('sequelize');
//path /api/persona

exports.obtenerTodasLasPersonas = async (req, res) => {
	try {
		const personas = await Personas.findAll({});
		if (personas.length > 0) {
			return res.status(200).json({ success: true, msg: 'Busqueda exitosa', personas });
		}
		return res.status(400).json({ success: false, msg: 'No hay personas guardadas' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error en el Servidor' });
	}
};

exports.crearPersona = async (req, res) => {
	const { nombre, apellidoM, apellidoP, direccion, telefono } = req.body;
	//console.log(req.body);

	try {
		await Personas.create({ nombre, apellidoM, apellidoP, direccion, telefono });
		res.status(201).json({ success: true, msg: 'Correctamente creado' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error en el Servidor' });
	}
};

exports.editarPersona = async (req, res) => {
	const { nombre, apellidoM, apellidoP, direccion, telefono } = req.body;
	const { id } = req.params;

	try {
		const persona = await Personas.findOne({ where: { id } });
		//console.log(persona);

		if (!persona) {
			return res.status(404).json({ success: false, msg: 'Esta persona no existe en la plataforma' });
		}
		persona.nombre = nombre;
		persona.apellidoP = apellidoP;
		persona.apellidoM = apellidoM;
		persona.direccion = direccion;
		persona.telefono = telefono;

		await persona.save();

		return res.status(200).json({ success: true, msg: 'Se actualizo correctamente' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error en el Servidor' });
	}
};

exports.eliminarPersona = async (req, res) => {
	const { id } = req.params;

	try {
		const persona = await Personas.findOne({ where: { id } });

		if (!persona) {
			return res.status(404).json({ success: false, msg: 'Esta persona no existe en la plataforma' });
		}

		await Personas.destroy({ where: { id: req.params.id } });

		return res.status(200).json({ success: true, msg: ' La Eliminacion ha sido Exitosa' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error en el Servidor' });
	}
};

exports.buscarPersonas = async (req, res) => {
	const { patron } = req.params;
	try {
		const busqueda = await Personas.findAll({
			where: {
				[Op.or]: [ { nombre: patron }, { apellidoP: patron }, { apellidoM: patron } ]
			}
		});

		if (busqueda.length === 0) {
			return res
				.status(200)
				.json({ success: false, msg: `No se han encontrado Personas con este criterio: ${patron}` });
		}
		return res.status(201).json({ success: true, msg: 'Busqueda Exitosa', busqueda });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error en el Servidor' });
	}
};
