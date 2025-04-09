const {getConnection} = require('../config/db/database')

const devDato = async (req, res) => {
    try{
        const consulta = await getConnection()
        const respuesta = await consulta.request().query('select * from prueba')
        res.json(respuesta.recordset)

    }catch(err){
        console.error('Error en la consulta:', err)
        res.status(500).send('Error del servidor')
    }
}

module.exports = { devDato}
