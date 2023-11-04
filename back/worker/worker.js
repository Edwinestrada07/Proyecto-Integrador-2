const express = require('express')
const app = express.Router()
const Worker = require('./worker.model')


//**************MÉTODO GET************************* 
// Ruta para obtener todos los empleados
app.get('/worker', async function (req, res) {
    try {
      const worker = await Worker.findAll()
      res.send(worker)
    } catch (error) {
      console.error('Error al obtener empleados:', error)
      res.status(500).json({ error: 'Error al obtener empleados' })
    }
})
  
// Ruta para obtener un empleado por su ID
app.get('/worker/:id', async function (req, res) {
    const { id } = req.params
  
    try {
      const worker = await Worker.findByPk(id)
      if (!worker) {
        return res.status(404).json({ error: 'Empleado no encontrado' })
      }
  
      res.send(worker)
    } catch (error) {
      console.error('Error al obtener empleado por ID:', error)
      res.status(500).json({ error: 'Error al obtener empleado' })
    }
})


//**************MÉTODO POST************************* 
// Ruta para crear un nuevo empleado
app.post('/worker', async function (req, res) {
    const { nombre, tel, } = req.body
  
    try {
      const newWorker = await Worker.create({
        nombre,
        tel,
      });
      res.status(201).json(newWorker)
    } catch (error) {
      console.error('Error al crear un empleado:', error)
      res.status(500).json({ error: 'Error al crear un empleado' })
    }
})


//**************MÉTODO PUT*************************
// Ruta para actualizar un empleado por su ID
app.put('/worker/:id', async function (req, res) {
    const { id } = req.params
    const { nombre, tel, } = req.body
  
    try {
      const worker = await Worker.findByPk(id)
      if (!worker) {
        return res.status(404).json({ error: 'Empleado no encontrado' })
      }
  
      worker.nombre = nombre; 
      worker.tel = tel;
      await worker.save()
  
      res.send(worker)
    } catch (error) {
      console.error('Error al actualizar el empleado:', error)
      res.status(500).json({ error: 'Error al actualizar el empleado' })
    }
})


//**************MÉTODO DELETE*************************
// Ruta para eliminar un empleado por su ID
app.delete('/worker/:id', async function (req, res) {
    const { id } = req.params
  
    try {
      const worker = await Worker.findByPk(id);
      if (!worker) {
        return res.status(404).json({ error: 'Empleado no encontrado' })
      }
  
      await worker.destroy()
      res.send({ mensaje: 'Empleado eliminado con éxito' })
    } catch (error) {
      console.error('Error al eliminar el empleado:', error)
      res.status(500).json({ error: 'Error al eliminar el empleado' })
    }
  });
  
  module.exports = app