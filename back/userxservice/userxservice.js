const express = require('express')
const app = express.Router()
const User = require('../user/user.model')
const UserXService = require('./userxservice.model')
const jwt = require('jsonwebtoken')

//Con esta función se valida la existencia del usuario (x2 esta en user)
async function auth(req, res, next ) {
  let token = req.headers['authorization']
  let resultadoToken = jwt.verify(token, '12345')

  /*if(resultadoToken.exp < new Date().getTime()) {
    throw new Error('Token expirado') 
  }*/

  let usuario = await User.findOne({id: resultadoToken.id})
  if(!usuario) {
    throw new Error('Usuario no existe')
  }

  req.user = usuario

  next()
 
}

//const cart = [];

//**************MÉTODO GET*************************
// Ruta para obtener todos los carritos
app.get('/userxservice', auth, async function (req, res) {
  try {
    const userxservice = await UserXService.findAll()
    res.json(userxservice)
  } catch (error) {
    console.error('Error al obtener carrito:', error)
    res.status(500).json({ error: 'Error al obtener carrito' })
  }
  /*const userxservice = [
    { id: 1, name: 'Lavado básico', price: 20000 },
    { id: 2, name: 'Lavado y Encerado', price: 40000 },
    { id: 3, name: 'Lavado Detallado (interior y exterior)', price: 60000 },
    { id: 4, name: 'Lavado Todo en Uno', price: 90000 },
  ]
res.json(userxservice);*/

})

// Ruta para obtener un carrito por su ID
app.get('/userxservice/:id', async function (req, res) {
  const { id } = req.params

  try {
    const userxservice = await UserXService.findByPk(id)
    if (!userxservice) {
      return res.status(404).json({ error: 'Carrito no encontrado' })
    }

    res.send(userxservice)
  } catch (error) {
    console.error('Error al obtener Carrito por ID:', error)
    res.status(500).json({ error: 'Error al obtener carrito' })
  }
})


//**************MÉTODO POST*************************
// Ruta para crear un nuevo carrito
app.post('/userxservice', async function (req, res) {
  const cantidad = req.body.cantidad
  const ServiceId = req.body.serviceId

    try {
      const newUserXService = await UserXService.create({ cantidad, ServiceId })
      res.status(201).json(newUserXService)
    } catch (error) {
      console.error('Error al crear un carrito:', error)
      res.status(500).json({ error: 'Error al crear un carrito' })
    }
})

module.exports = app