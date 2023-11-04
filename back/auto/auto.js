const express = require('express')
const app = express.Router()
const Auto = require('./auto.model')


//**************MÉTODO GET************************* 
// Ruta para obtener todos los automóviles
app.get('/auto', async function (req, res) {
    try {
        const auto = await Auto.findAll()
        res.send(auto)
    } catch (error) {
        console.error('Error al obtener automóviles:', error)
        res.status(500).json({ error: 'Error al obtener automóviles' })
    }
})

// Ruta para obtener un automóvil por su ID
app.get('/auto/:id', async function (req, res) {
    const { id } = req.params

    try {
        const auto = await Auto.findByPk(id)
        if (!auto) {
            return res.status(404).json({ error: 'Automóvil no encontrado' })
        }

        res.send(auto)
    } catch (error) {
        console.error('Error al obtener automóvil por ID:', error)
        res.status(500).json({ error: 'Error al obtener automóvil' })
    }
})


//**************MÉTODO POST*************************
// Ruta para crear un nuevo automóvil
app.post('/auto', async function (req, res) {
    const { numeroPlaca, marca, modelo, tipoVehiculo } = req.body
  
    try {
      const nuevoAuto = await Auto.create({
        numeroPlaca,
        marca,
        modelo,
        tipoVehiculo,
      });
      res.status(201).json(nuevoAuto)
    } catch (error) {
      console.error('Error al crear un automóvil:', error)
      res.status(500).json({ error: 'Error al crear un automóvil' })
    }
})


//**************MÉTODO PUT*************************
// Ruta para actualizar un automóvil por su ID
app.put('/auto/:id', async function (req, res) {
    const { id } = req.params
    const { numeroPlaca, marca, modelo, tipoVehiculo } = req.body
  
    try {
      const auto = await Auto.findByPk(id)
      if (!auto) {
        return res.status(404).json({ error: 'Automóvil no encontrado' })
      }
  
      auto.numeroPlaca = numeroPlaca;
      auto.marca = marca;
      auto.modelo = modelo;
      auto.tipoVehiculo = tipoVehiculo;
      await auto.save()
  
      res.send(auto)
    } catch (error) {
      console.error('Error al actualizar el automóvil:', error)
      res.status(500).json({ error: 'Error al actualizar el automóvil' })
    }
})


//**************MÉTODO DELETE*************************
// Ruta para eliminar un automóvil por su ID
app.delete('/auto/:id', async function (req, res) {
    const { id } = req.params
  
    try {
      const auto = await Auto.findByPk(id);
      if (!auto) {
        return res.status(404).json({ error: 'Automóvil no encontrado' })
      }
  
      await auto.destroy()
      res.send({ mensaje: 'Automóvil eliminado con éxito' })
    } catch (error) {
      console.error('Error al eliminar el automóvil:', error)
      res.status(500).json({ error: 'Error al eliminar el automóvil' })
    }
})
  
module.exports = app