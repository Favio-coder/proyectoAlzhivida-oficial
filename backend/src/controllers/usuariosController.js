const {db} = require('../config/firebase')


const listUsuarios = async (req, res) => {
    try{
        const snapshot = await db.collection("usuarios").get()
        const usuarios = snapshot.docs.map(doc => ({idDocumento: doc.id,...doc.data()}))
        res.json(usuarios)
    } catch(err){
        res.status(500).json({ error: err.message})
    }
}

//Exporta el controlador
module.exports = {listUsuarios}