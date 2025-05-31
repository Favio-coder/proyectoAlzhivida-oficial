const express = require('express')
const { crearUsuario } = require('../models/UsuarioFactory')
const { listUsuarios, cambiarContrasena } = require('../repo/AutenticacionRepositorio')
require('dotenv').config();
const jwt = require('jsonwebtoken')

//Importar servicios
const AutenticacionService = require('../services/AutenticacionService')


const AutenticacionController = {
    async buscarId(req, res) {
        try{
            const {idUsuario} = req.body

            const usuario = await AutenticacionService.buscarUsuario(idUsuario)

            return res.status(200).json({
                message: 'Se encontro correctamente al usuario',
                usuario
            })

        } catch(err){
            return res.status(404).json({
                error: err.message
            })
        }
    }, 

    listUsuarios: async (req,res) => {
        try{
            const usuarios = await AutenticacionService.listUsuarios()
            return res.json(usuarios)
        }catch{
            return res.status(500).json({ error: error.message })
        }
    },

    crearUsuario: async (req,res) => {
        try{
        const datosUsuario = req.body 

        const resultado = await AutenticacionService.registrarCuidadorNoProfesional(datosUsuario)

        res.status(201).json({
            success: true, 
            mensaje: resultado.mensaje,
        })
        }catch(error){
            console.error("Error en el endpoint: ", error.message);
            res.status(500).json({
                success: false,
                mensaje: 'Error al registrar el usuario',
                error: error.message,
            })
        }
    },

    editarUsuario: async (req,res) => {
        try{
            const datosUsuario = req.body 

            const resultado = await AutenticacionService.editarCuidadorNoProfesional(datosUsuario)

            res.status(201).json({
                success: true, 
                mensaje: resultado.mensaje,
            })
        }catch(error){
            console.error("Error en el endpoint: ", error.message);
            res.status(500).json({
                success: false,
                mensaje: 'Error al editar el usuario',
                error: error.message,
            })
        }
    },

    cambiarContrasena: async(req,res) => {
        try{
            const datosUsuario = req.body 

            const resultado = await AutenticacionService.cambiarContrasena(datosUsuario)

            res.status(200).json({
                success: true, 
                mensaje: "Se cambio la contraseña con exito"
            })
        }catch(error){
            res.status(500).json({
                success: false, 
                mensaje: error.message
            })
        }
    },

    iniciarSesion: async(req,res) => {
        try{
            const datosUsuario = req.body 

            const resultado = await AutenticacionService.recuperarCredenciales(datosUsuario)

            const payload = {
                id: resultado.c_usua,
                correo: resultado.l_emailUsua,
                rol: resultado.c_rol
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })

            res.status(200).json({
                success: true, 
                mensaje: "Se inicio sesión con éxito",
                token,
                usuarioRecuperado: resultado
            })
        }catch(error){
            res.status(500).json({
                success: false, 
                mensaje: error.message
            })
        }
    },

    recuperarContrasenaOlvidada: async(req,res) => {
        try{
            const datosUsuario = req.body 

            const recuperarContasena = await  AutenticacionService.recuperarContrasenaOlvidada(datosUsuario)

            res.status(200).json({
                success: true, 
                mensaje: "Se recupero la contraseña exitosamente",
            })
        }catch(error){
            res.status(500).json({
                success: false, 
                mensaje: error.message
            })
        }
    },
    
    eliminarCuenta: async(req,res) => {
        try{
            const datosUsuario = req.body

            const eliminacionCuenta = await AutenticacionService.eliminarCuenta(datosUsuario)

            res.status(200).json({
                success: true, 
                mensaje: "Se elimino la cuenta exitosamente",
            })
        }catch(err){
            res.status(500).json({
                success: false, 
                mensaje: err.message
            })
        }
    }

}

module.exports = AutenticacionController