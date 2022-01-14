const express = require('express');
const db = require('./bd/db');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');

// db
// 	.authenticate()
// 	.then(() => console.log('Conectado Correctamente al servidor MySql'))
// 	.catch((error) => console.log('Algo ocurrio al conectarse al servidor ' + error));

db
	.sync()
	.then(() => console.log('Conexion establecida a MySql'))
	.catch((error) => console.log('Algo salio mal con la conexion syn ' + error));
const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes());

app.listen(5000, () => {
	console.log('Server Running at 5000 PORT... Press Ctrl + C to finish...');
});
