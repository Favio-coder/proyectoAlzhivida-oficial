const express = require('express')
const router = express.Router()
const {devDato} = require('../controllers/pruebaController')

router.get('/', devDato)

module.exports = router