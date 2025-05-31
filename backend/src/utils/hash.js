const bcypt = require('bcrypt') //hashear contraseñas 

const hashContrasenia = async(textoPlano) => {
    const saltRounds = 10 
    return await bcypt.hash(textoPlano, saltRounds)
}

module.exports = {
    hashContrasenia
}