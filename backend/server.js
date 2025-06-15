const express = require("express");
const cors = require("cors");
require("dotenv").config();


// const { db, bucket } = require("./src/config/firebase");

const app = express();
app.use(cors());
app.use(express.json());

//Rutas 
// const pruebaRoute = require("./src/routes/pruebaRoute")
// app.use("/prueba", pruebaRoute)
const autenticacionRoutes = require('../backend/src/routes/AutenticacionRoute')
app.use('/api/autenticacion', autenticacionRoutes) // http://localhost:3001/api/v2/autenticacion/buscarId
const PORT = process.env.PORT || 3001;

//Desarrollo
app.listen(PORT, () => 
    console.log(`Servidor en http://localhost:${PORT}`
));

//Despligue en misma red
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
// });
