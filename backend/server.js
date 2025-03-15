const express = require("express");
const cors = require("cors");
require("dotenv").config();


const { db, bucket } = require("./src/config/firebase");

const app = express();
app.use(cors());
app.use(express.json());

//Rutas 
const usuariosRoutes = require("./src/routes/usuariosRoutes")

app.use("/listUsuarios", usuariosRoutes)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => 
    console.log(`Servidor en http://localhost:${PORT}`
));
