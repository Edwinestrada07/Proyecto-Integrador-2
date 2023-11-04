const express = require('express')
const app = express.Router()
const User = require('./user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') 

//Con esta función se valida la existencia del usuario
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


//**************MÉTODO POST************************* 
// Ruta para crear un nuevo usuario
//app.post() para crear un dato nuevo //En postman ejecutamos la parte del usuario-servidor
app.post('/user', auth, async function (req, res) {
  let nombre = req.body.nombre
  let direccion = req.body.direccion
  let tel = req.body.tel
  let correo = req.body.correo
  let password = req.body.password
  let states = req.body.states
  let serviceId = req.body.service

  let user = await User.create({ nombre: nombre, direccion: direccion, tel: tel, correo: correo, password: password, states: states, ServiceId: serviceId })

  await user.save()
  res.send('Su usuario ha sido creado con éxito')
})

//Crear usuario
app.post('/user/signup', async function (req, res) {
  let nombre = req.body.nombre
  let direccion = req.body.direccion
  let tel = req.body. tel
  let correo = req.body.correo
  let password = req.body.password

  //Crear una encryptación pasandole la contraseña con ayuda del algoritmo
  /*let iv = bcrypt.genSaltSync(10)
  let passwordCrypt = bcrypt.hashSync(password, iv)*/

  let user = await User.create({nombre, direccion, tel, correo, password})

  await user.save()

  const token = await jwt.sign({id: user.id}, '12345', {expiresIn: '180000s'})

  res.send({token})
})

//Login usuario
app.post('/user/signin', async function (req, res) {
  let nombre = req.body.nombre
  let password = req.body.password

  let user = await User.findOne({nombre, password})
  
  if(!user) {
    throw new Error('Usuario o contraseña no existen')
  }

  const token = await jwt.sign({id: user.id}, '12345', {expiresIn: '180000s'})

  res.send({token})
})


//**************MÉTODO GET*************************  
// Ruta para obtener todos los usuarios
//app.get() es para traer o mostrar información de la base de datos (visualización - Postman)
app.get('/api/user', async function (req, res) {
  try {
      const user = await User.findAll(); // User es tu modelo de usuario definido en Sequelize
      res.json(user);
  } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

module.exports = app