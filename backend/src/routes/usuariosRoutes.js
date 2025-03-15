const express = require("express")
const {listUsuarios} = require('../controllers/usuariosController.js')

const router = express.Router()

router.get("/", listUsuarios)

module.exports = router